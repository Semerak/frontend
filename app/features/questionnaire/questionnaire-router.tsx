import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { FormLayout } from '~/components/layouts/form-layout';
import { DefaultButton } from '~/components/ui/default-button';
import { useConfig } from '~/context/config-context';
import { useMainFormContext } from '~/context/main-form-context';
import LoadingScreen from '~/features/loading-screen/loading-screen';
import { useGetResults } from '~/features/results/hooks/use-results-hook';
import { QuestinnaireTypes } from '~/types/questionnaires-enum';

import CameraAnalysis from '../camera-analysis/camera-analysis';
import SensorAnalysis from '../sensor-analysis/sensor-analysis';

import QuestionScreen from './question-screen';
import { useQuestionsQuery } from './questionnaire-api';
import { mergeQuestionsAndAnswers } from './utils/get-results-translation';

export function QuestionnaireRouter() {
  const [questionIndex, setQuestionIndex] = useState(0);

  const { methods } = useMainFormContext();
  const { data: questions, error } = useQuestionsQuery();
  const { i18n } = useTranslation();
  const { config } = useConfig();
  const getResults = useGetResults();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (questions) {
      console.log('Fetched questions:', questions);
      console.log('Current language:', i18n.language);
      console.log('Steps:', questions[i18n.language]);
    }
    if (error) {
      console.error('Failed to fetch questions:', error);
    }
  }, [questions, error, i18n.language]);

  function handleNext() {
    setQuestionIndex((prev) => prev + 1);
  }

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const answers = mergeQuestionsAndAnswers(
        questions,
        data.answers ?? [],
        i18n.language,
      );
      const payload = {
        config: config,
        answers: answers,
      };
      getResults.mutate(payload, {
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

  if (currentQuestion?.question_type === QuestinnaireTypes.Scan) {
    return (
      <FormProvider {...methods}>
        <FormLayout
          steps={currentQuestions.length}
          currentStep={questionIndex + 1}
        >
          <SensorAnalysis
            questionnaireIndex={questionIndex}
            handleClick={handleNext}
          />
        </FormLayout>
      </FormProvider>
    );
  }
  if (currentQuestion?.question_type === QuestinnaireTypes.Camera) {
    handleNext(); //TODO: Remove this line if you want to show the camera analysis screen
    return (
      <FormProvider {...methods}>
        <FormLayout
          steps={currentQuestions.length}
          currentStep={questionIndex + 1}
        >
          <CameraAnalysis handleSubmit={handleNext} />
        </FormLayout>
      </FormProvider>
    );
  }
  if (currentQuestion?.question_type === QuestinnaireTypes.Question) {
    return (
      <FormProvider {...methods}>
        <FormLayout
          steps={currentQuestions.length}
          currentStep={questionIndex + 1}
        >
          <QuestionScreen
            questionnaireIndex={questionIndex}
            question={currentQuestion.question_text}
            options={currentQuestion.answer_options}
            handleSubmit={handleNext}
          />
        </FormLayout>
      </FormProvider>
    );
  }
  if (questionIndex === currentQuestions.length) {
    return (
      <FormProvider {...methods}>
        <FormLayout steps={currentQuestions.length} currentStep={questionIndex}>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-2xl font-bold mb-4">
              Thank you for completing the questionnaire!
            </h2>

            <DefaultButton text="Submit" handleClick={onSubmit} />
          </div>
        </FormLayout>
      </FormProvider>
    );
  }
  return null;
}

export default QuestionnaireRouter;
