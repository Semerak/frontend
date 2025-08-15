import { Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FaceDetectionComponent } from 'app/components/face-detection/face-detection-component';
import { DefaultButton } from 'app/components/ui/default-button';

import type { FaceLandmark } from '../../hooks/use-face-detection';

interface CameraAnalysisProps {
  handleSubmit: () => void;
}

export function CameraAnalysis({ handleSubmit }: CameraAnalysisProps) {
  const { t } = useTranslation();
  const [photoData, setPhotoData] = useState<{
    imageData: string;
    landmarks: FaceLandmark[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoTaken = (imageData: string, landmarks: FaceLandmark[]) => {
    setPhotoData({ imageData, landmarks });
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (photoData) {
    return (
      <main className="flex flex-col items-center justify-center bg-white w-full h-full p-6">
        {/* Page Title */}
        <div className="mb-6">
          <Typography
            variant="h4"
            fontWeight={600}
            color="text.primary"
            align="center"
            className="mb-2"
          >
            {t('cameraAnalysis.resultsTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {t('cameraAnalysis.resultsSubtitle')}
          </Typography>
        </div>

        {/* Display captured photo */}
        <div className="mb-6">
          <img
            src={photoData.imageData}
            alt={t('cameraAnalysis.capturedPhotoAlt')}
            className="max-w-lg max-h-96 border-2 border-gray-300 rounded-lg shadow-lg"
            style={{ transform: 'scaleX(-1)' }} // Mirror to match camera view
          />
        </div>

        {/* Success message */}
        <Typography
          variant="body1"
          color="success.main"
          className="mb-6 text-center"
          sx={{ fontWeight: 500 }}
        >
          {t('cameraAnalysis.analysisComplete')}
        </Typography>

        {/* Error display if any */}
        {error && (
          <Typography
            color="error"
            className="mb-6 text-center"
            variant="body2"
          >
            {error}
          </Typography>
        )}

        {/* Continue button */}
        <DefaultButton
          text={t('cameraAnalysis.continueButton')}
          handleClick={() => {
            handleSubmit();
          }}
          style={{
            minWidth: '200px',
            padding: '12px 24px',
          }}
        />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center bg-white w-full h-full">
      <FaceDetectionComponent
        onPhotoTaken={handlePhotoTaken}
        onError={handleError}
      />
    </main>
  );
}

export default CameraAnalysis;
