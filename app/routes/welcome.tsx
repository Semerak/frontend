import { Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConsentPopup } from '~/components/consent-popup';
import { DefaultButton } from '~/components/ui/default-button';

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
  const theme = useTheme();
  const [showConsentPopup, setShowConsentPopup] = useState(false);

  const handleStartAnalysis = () => {
    // Always show consent popup when starting analysis
    setShowConsentPopup(true);
  };

  const handleConsentAccept = () => {
    setShowConsentPopup(false);
    // Proceed to questionnaire after consent
    window.location.href = '/questionnaire';
  };

  const handleConsentDecline = () => {
    setShowConsentPopup(false);
    // Stay on welcome page after declining
  };

  const handleConsentClose = () => {
    // Just close the popup without proceeding
    setShowConsentPopup(false);
  };

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 portrait:lg:pt-30">
        <img
          src="/welcome-picture.png"
          alt={t('startPage.welcome')}
          className="w-full h-2/3 object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Main Content Area - Button centered */}
        <div className="flex-4 flex items-center justify-center px-6">
          <DefaultButton
            text={t('startPage.startAnalysis')}
            handleClick={handleStartAnalysis}
            size="xlarge"
            style={{
              backgroundColor: theme.palette.secondary.main,
            }}
          />
        </div>

        {/* Bottom Section with Text - Only visible on mobile */}
        <div className="flex-1 m-2 bg-white px-6 py-8 text-center">
          {/* Main Heading */}
          {/* For phones */}
          <div className="block sm:hidden">
            <Typography
              variant="h4"
              component="h1"
              fontWeight={800}
              color="text.primary"
              className="mb-2"
            >
              {t('startPage.welcome')}
            </Typography>
          </div>
          <div className="hidden lg:block">
            <Typography
              variant="h2"
              component="h1"
              fontWeight={800}
              color="text.primary"
              className="mb-2"
            >
              {t('startPage.welcome')}
            </Typography>
          </div>
        </div>
      </div>

      {/* Consent Popup */}
      <ConsentPopup
        isOpen={showConsentPopup}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
        onClose={handleConsentClose}
      />
    </div>
  );
}
