import { Typography } from '@mui/material';

import { DefaultButton } from 'app/components/ui/default-button';

interface QuestionnaireSummaryProps {
  onSubmit: () => void;
}

export function QuestionnaireSummary({ onSubmit }: QuestionnaireSummaryProps) {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <div className="p-4">
        <Typography
          variant="h4"
          fontWeight={600}
          color="text.primary"
          align="center"
        >
          Thank you for completing the questionnaire!
        </Typography>
      </div>
      <DefaultButton text="Submit" handleClick={onSubmit} />
    </main>
  );
}

export default QuestionnaireSummary;
