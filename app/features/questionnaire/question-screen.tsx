import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';
import { Field } from '~/components/react-hook-form';

interface QuestionnaireProps {
  questionnaireIndex: number;
  question: string;
  options: string[];
  handleSubmit: () => void;
}

export function QuestionScreen({
  questionnaireIndex,
  question,
  options,
  handleSubmit,
}: QuestionnaireProps) {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center bg-white w-full h-full">
      {/* Title */}
      <div className="p-4">
        <Typography
          variant="h4"
          fontWeight={600}
          color="text.primary"
          align="center"
        >
          Question
        </Typography>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="p-4">
          <Typography
            variant="h5"
            fontWeight={600}
            color="text.primary"
            align="center"
          >
            {question}
          </Typography>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 mb-8 justify-items-center">
          <Field.ChipSelect
            name={`answers[${questionnaireIndex}].value`}
            chips={options}
          />
        </div>
      </div>

      <DefaultButton
        text={t('common.nextPage')}
        handleClick={() => handleSubmit()}
      />
    </main>
  );
}

export default QuestionScreen;
