import { Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FeedbackForm } from '~/features/feedback/feedback-form';
import { NavLink } from 'react-router';
import { IconCross } from '~/components/ui/icons';
import { useTheme } from '@mui/material/styles';

export const FeedbackScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className="relative flex flex-col flex-grow max-w-2xl h-full max-h-full overflow-hidden pt-20 sm:pt-32 px-4 gap-4 overflow-y-scroll sm:mx-auto">
      <div className="absolute top-6 right-8 z-20 w-auto">
        <div className="flex flex-row gap-2 items-center">
          <NavLink to={isMobile ? '/results' : '/'} end>
            <IconCross width={30} height={30} color="#1E1E1E" />
          </NavLink>
        </div>
      </div>
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
