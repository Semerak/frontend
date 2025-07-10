import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { NavButton } from '~/components/ui/nav-button';

import type { Route } from './+types/welcome';

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Makeup Match' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Welcome() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/welcome-picture.png"
          alt={t('startPage.welcome')}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Main Content Area - Button centered */}
        <div className="flex-1 flex items-center justify-center px-6">
          <NavButton
            text={t('startPage.startAnalysis')}
            url="/questionnaire"
            size="xlarge"
          />
        </div>

        {/* Bottom Section with Text */}
        <div className="bg-white px-6 py-8 text-center">
          {/* Main Heading */}
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color="text.primary"
            className="mb-2"
          >
            Find your perfect
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color="text.primary"
            className="mb-6"
          >
            Make-up Match
          </Typography>
        </div>
      </div>
    </div>
  );
}
