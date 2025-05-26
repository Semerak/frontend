import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { FormLayout } from '~/components/layouts/form-layout';
import { useMainFormContext } from '~/context/main-form-context';
import { QuestinnairePages } from '~/types/pages-enum';

import SensorAnalysis from '../sensor-analysis/sensor-analysis';

import QuestionScreen from './question-screen';

/**
 * LoadingScreen Component
 * This component serves as a full-screen loading screen, ideal for use as a HydrateFallback.
 */

export function QuestionnaireRouter() {
  const [currentPage, setCurrentPage] = useState<QuestinnairePages>(
    QuestinnairePages.SensorAnalysis,
  );

  const { methods } = useMainFormContext();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // if (valuesAreNotSet)
      //   return setMainFormError('Handle correctly');

      // setMainFormError(null);

      const payload = {
        ...data,
        // here we can add other stuff to our payload than just the form data
      };

      // we can also change rendered page for example setCurrentPage(AResultsPage)

      // await submitMainForm(payload);
      console.log('FORM DATA: ', payload);
    } catch (error) {
      console.error('Failed to submit Form Data', error);
    }
  });

  function switchPage(nextPage: QuestinnairePages) {
    setCurrentPage(nextPage);
  }

  if (currentPage === QuestinnairePages.SensorAnalysis) {
    return (
      <FormProvider {...methods}>
        <FormLayout steps={4} currentStep={2}>
          <SensorAnalysis handleClick={switchPage} />
        </FormLayout>
      </FormProvider>
    );
  }

  if (currentPage === QuestinnairePages.QuestionScreen) {
    return (
      <FormProvider {...methods}>
        <FormLayout steps={4} currentStep={2}>
          <QuestionScreen
            question="How often do you use foundation?"
            options={['A', 'B', 'C', 'D']}
            handleSubmit={onSubmit}
          />
        </FormLayout>
      </FormProvider>
    );
  }
}

export default QuestionnaireRouter;
