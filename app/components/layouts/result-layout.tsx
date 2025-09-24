import { useTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { NavButton } from '~/components/ui/nav-button';

interface ResultLayoutProps {
  children: ReactNode;
}

export function ResultLayout({ children }: ResultLayoutProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <div className="flex flex-col flex-grow pt-20 w-full h-full overflow-y-scroll">
      <div className="absolute top-6 right-8 z-20 w-auto">
        <div className="flex flex-row gap-2 items-center">
          <NavButton
            text={t('results.feedback')}
            url={'/feedback'}
            size="small"
            style={{
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              boxShadow: 'none',
              outline: `1px solid ${theme.palette.primary.light}`,
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
