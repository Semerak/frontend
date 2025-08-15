import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import theme from '~/styles/theme';

import { DefaultButton } from './ui/default-button';

interface ConsentData {
  title: string;
  subtitle: string;
  date: string;
  content: string;
  consent: string;
  buttons: {
    accept: string;
    decline: string;
  };
}

interface ConsentPopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}

export function ConsentPopup({
  isOpen,
  onAccept,
  onDecline,
  onClose,
}: ConsentPopupProps) {
  const [consentData, setConsentData] = useState<ConsentData | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load both JSON metadata and text content
      Promise.all([
        fetch('/legal/consent-text.json').then((response) => response.json()),
        fetch('/legal/consent.txt').then((response) => response.text()),
      ])
        .then(([jsonData, textContent]) => {
          setConsentData({
            ...jsonData,
            content: textContent,
          });
        })
        .catch((error) => console.error('Error loading consent data:', error));
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset checkbox and PDF view when popup is opened
    if (isOpen) {
      setIsChecked(false);
      setShowPdf(false);
    }
  }, [isOpen]);

  const togglePdfView = () => {
    setShowPdf(!showPdf);
  };

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
    }
  };

  const handleDecline = () => {
    setIsChecked(false);
    onDecline();
  };

  const handleClose = () => {
    setIsChecked(false);
    onClose();
  };

  if (!isOpen || !consentData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden relative shadow-2xl">
        {/* Close Button */}
        <div className="w-full z-10 flex justify-end">
          <IconButton
            onClick={handleClose}
            className="z-10"
            sx={{
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            <span
              className="text-xl flex items-center justify-center w-6 h-6"
              style={{ minWidth: '1.5rem', minHeight: '1.5rem' }}
            >
              ×
            </span>
          </IconButton>
        </div>

        {/* Content */}
        <div className="p-6 pt-0">
          {/* Header */}
          <div className="text-center mb-6">
            <Typography
              variant="h5"
              component="h1"
              fontWeight={600}
              className="mb-2"
              color="text.primary"
            >
              {consentData.title}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              fontWeight={500}
              className="mb-2"
              color="text.primary"
            >
              {consentData.subtitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              {consentData.date}
            </Typography>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-64 overflow-y-auto mb-4 px-2">
            {!showPdf ? (
              <Typography
                variant="body2"
                className="text-justify leading-relaxed whitespace-pre-line"
                color="text.primary"
              >
                {consentData.content}
              </Typography>
            ) : (
              <iframe
                src="/legal/Datenschutzerklärung.pdf"
                className="w-full h-64 border-0"
                title="Datenschutzerklärung"
              />
            )}
          </div>

          {/* Toggle Button */}
          <div className="text-center mb-4">
            <button
              onClick={togglePdfView}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {!showPdf ? 'Datenschutzerklärung anzeigen' : 'Zurück zum Text'}
            </button>
          </div>

          {/* Checkbox */}
          <div className="mb-6">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  className="text-sm"
                  color="text.primary"
                >
                  {consentData.consent}
                </Typography>
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <DefaultButton
              text={consentData.buttons.accept}
              handleClick={handleAccept}
              disabled={!isChecked}
              fullWidth
              style={{
                backgroundColor: isChecked
                  ? theme.palette.primary.main
                  : theme.palette.border.shadow,
                color: isChecked
                  ? theme.palette.background.default
                  : theme.palette.text.secondary,
              }}
            />
            <DefaultButton
              text={consentData.buttons.decline}
              handleClick={handleDecline}
              fullWidth
              style={{
                backgroundColor: isChecked
                  ? theme.palette.primary.main
                  : theme.palette.border.shadow,
                color: isChecked
                  ? theme.palette.background.default
                  : theme.palette.text.secondary,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
