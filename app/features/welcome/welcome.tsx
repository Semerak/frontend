import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';
import { Page } from 'app/types/pages-enum';
import { Field, Form } from '~/components/react-hook-form';
import { useMainFormContext } from '~/context/main-form-context';

interface SensorAnalysisProps {
  handleClick: (nextPage: Page) => void;
}
export function Welcome({ handleClick }: SensorAnalysisProps) {
  const { t } = useTranslation();

  const { methods } = useMainFormContext();
  const { handleSubmit } = methods;
  // const aFieldValue = watch('fieldKey'); // with the watch method we can get what is in the form now

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

  return (
    <div>
      <div className="absolute scale-140 top-24">
        <img
          src="/welcome-picture.png"
          alt={t('startPage.welcome')}
          className="h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <DefaultButton
          text={t('startPage.startAnalysis')}
          handleClick={() => handleClick(Page.FormScreen)}
        />
      </div>
      <div className="flex w-full h-full justify-center place-content-end">
        <div className="flex items-end mb-60">
          <Form methods={methods} onSubmit={onSubmit}>
            <Field.Dropdown
              name="eyeColor"
              options={['brown', 'red', 'blue']}
            />
          </Form>
          <Form methods={methods} onSubmit={onSubmit}>
            <Field.Dropdown
              name="hairColor"
              options={['brown', 'red', 'blue']}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
