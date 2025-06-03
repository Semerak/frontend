import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { FormLayout } from '~/components/layouts/form-layout';
import { Form } from '~/components/react-hook-form';
import { useConfig } from '~/context/config-context';
import { useMainFormContext } from '~/context/main-form-context';
import { useSnackbar } from '~/context/snackbar-context';
import LoadingScreen from '~/features/loading-screen/loading-screen';
import { useGetResults } from '~/features/results/hooks/use-results-hook';
import { QuestinnaireTypes } from '~/types/questionnaires-enum';

import CameraAnalysis from '../camera-analysis/camera-analysis';
import SensorAnalysis from '../sensor-analysis/sensor-analysis';

import { useQuestionsQuery } from './hooks/use-questions-query';
import QuestionScreen from './question-screen';
import QuestionnaireSummary from './questionnaire-summary';
import { mergeQuestionsAndAnswers } from './utils/get-results-translation';

export function QuestionnaireRouter() {
  const [questionIndex, setQuestionIndex] = useState(0);

  const { methods } = useMainFormContext();
  const { data: questions, isPending } = useQuestionsQuery();
  const { i18n } = useTranslation();
  const { config } = useConfig();
  const getResults = useGetResults();
  const navigate = useNavigate();
  const { showError } = useSnackbar();

  function questionnaireSwitcher(currentQuestion: any, handleNext: () => void) {
    switch (currentQuestion?.question_type) {
      case QuestinnaireTypes.Scan:
        return (
          <SensorAnalysis
            questionnaireIndex={questionIndex}
            handleClick={handleNext}
          />
        );
      case QuestinnaireTypes.Camera:
        handleNext();
        return <CameraAnalysis handleSubmit={handleNext} />;
      case QuestinnaireTypes.Question:
        return (
          <QuestionScreen
            questionnaireIndex={questionIndex}
            question={currentQuestion.question_text}
            options={currentQuestion.answer_options}
            handleSubmit={handleNext}
          />
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    if (questions && questions[i18n.language]) {
      const prevAnswers = methods.getValues('answers') || [];
      const newQuestions = questions[i18n.language];
      const answers = newQuestions.map(
        (_: any, idx: number) => prevAnswers[idx] ?? { value: null },
      );

      methods.reset({ ...methods.getValues(), answers });
    }
  }, [questions, i18n.language, methods]);

  if (isPending) {
    return <LoadingScreen />;
  }

  function handleNext() {
    setQuestionIndex((prev) => prev + 1);
  }

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const mergedAnswers = mergeQuestionsAndAnswers(
        questions,
        data.answers ?? [],
        i18n.language,
      );
      const payload = {
        config: config,
        answers: mergedAnswers,
      };
      getResults.mutate(payload, {
        onError: (error) => {
          showError(
            `Failed to submit Form Data: ${error.message || 'Unknown error'}`,
          );
        },
        onSuccess: (resultData) => {
          console.log('Results:', resultData);
          navigate('/results', { state: { results: resultData } });
        },
      });
    } catch (error) {
      console.error('Failed to submit Form Data', error);
    }
  });

  if (getResults.isPending) {
    return <LoadingScreen />;
  }

  const currentQuestions = questions?.[i18n.language] || [];
  const currentQuestion = currentQuestions[questionIndex];

  return (
    <Form onSubmit={onSubmit} methods={methods}>
      <FormLayout
        steps={currentQuestions.length}
        currentStep={questionIndex + 1}
      >
        {questionIndex === currentQuestions.length ? (
          <QuestionnaireSummary onSubmit={onSubmit} />
        ) : currentQuestion ? (
          questionnaireSwitcher(currentQuestion, handleNext)
        ) : null}
      </FormLayout>
    </Form>
  );
}

export default QuestionnaireRouter;
