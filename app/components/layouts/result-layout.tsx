import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { NavButton } from '~/components/ui/nav-button';
import { NavLink } from 'react-router';
import { IconCross } from '~/components/ui/icons';

interface ResultLayoutProps {
  children: React.ReactNode;
}

export function ResultLayout({ children }: ResultLayoutProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <div className="flex flex-col flex-grow w-full h-full max-h-full overflow-hidden pt-20">
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
          <NavLink to={'/'} end className="hidden sm:block">
            <IconCross width={30} height={30} color="#1E1E1E" />
          </NavLink>
        </div>
      </div>
      {children}
    </div>
  );
}
