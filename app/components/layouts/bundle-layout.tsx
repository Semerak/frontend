import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { IconChevronLeft } from '~/components/ui/icons';
import { FeedbackModal } from '~/features/feedback/feedback-modal';

interface BundleLayoutProps {
  children: ReactNode;
}

export function BundleLayout({ children }: BundleLayoutProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleOpenFeedback = () => setIsFeedbackOpen(true);
  const handleCloseFeedback = () => setIsFeedbackOpen(false);

  return (
    <div className="flex flex-col w-full h-full pt-20 sm:overflow-y-scroll">
      <div className="absolute top-6 left-28 z-20 w-auto">
        <NavLink to={'/results'}>
          <IconChevronLeft width={10} />
        </NavLink>
      </div>
      <div className="absolute top-6 right-8 z-20 w-auto">
        <div className="flex flex-row gap-2 items-center justify-between w-full">
          <Button
            size="small"
            onClick={handleOpenFeedback}
            style={{
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              boxShadow: 'none',
              outline: `1px solid ${theme.palette.primary.light}`,
            }}
          >
            {t('results.feedback')}
          </Button>
        </div>
      </div>
      {children}
      <FeedbackModal open={isFeedbackOpen} onClose={handleCloseFeedback} />
    </div>
  );
}
