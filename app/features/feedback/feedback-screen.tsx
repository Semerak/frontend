import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FeedbackForm } from '~/features/feedback/feedback-form';

export const FeedbackScreen = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col flex-grow max-w-2xl h-full max-h-full overflow-hidden pt-20 sm:pt-32 px-4 gap-4 overflow-y-scroll sm:mx-auto">
      <Typography
        variant="h4"
        fontWeight={700}
        color="text.primary"
        align="center"
        className="mb-2"
      >
        {t('feedback.title')}
      </Typography>
      <p className="text-center text-lg sm:text-xl"> {t('feedback.text')}?</p>
      <FeedbackForm />
    </div>
  );
};
