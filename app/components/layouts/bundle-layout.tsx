import { useTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { IconChevronLeft } from '~/components/ui/icons';
import { NavButton } from '~/components/ui/nav-button';

interface BundleLayoutProps {
  children: ReactNode;
}

export function BundleLayout({ children }: BundleLayoutProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <div className="flex flex-col w-full h-full pt-20 sm:overflow-y-scroll">
      <div className="absolute top-6 left-28 z-20 w-auto">
        <NavLink to={'/results'}>
          <IconChevronLeft width={10} />
        </NavLink>
      </div>
      <div className="absolute top-6 right-8 z-20 w-auto">
        <div className="flex flex-row gap-2 items-center justify-between w-full">
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
