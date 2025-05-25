import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';
import { Page } from 'app/types/pages-enum';

interface QuestionaryProps {
  question: string;
  options: string[];
  handleClick: (nextPage: Page) => void;
}

export function Questionary({
  question,
  options,
  handleClick,
}: QuestionaryProps) {
  const { t } = useTranslation();

  const maxButtonWidth =
    Math.max(...options.map((option) => option.length)) * 10; // Approximate width based on character count

  return (
    <main className="flex flex-col items-center justify-center bg-white  w-full h-full">
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
          {options.map((option, index) => (
            <div
              key={index}
              className={
                options.length % 2 !== 0 && index === options.length - 1
                  ? 'col-span-2 text-center'
                  : ''
              }
            >
              <DefaultButton
                text={option}
                handleClick={() => console.log(`Selected: ${option}`)}
                style={{ width: `${maxButtonWidth}px` }}
              />
            </div>
          ))}
        </div>
      </div>

      <DefaultButton
        text={t('common.nextPage')}
        handleClick={() => handleClick(Page.Welcome)}
      />
    </main>
  );
}

export default Questionary;
