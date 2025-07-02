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
    console.log('Photo taken with landmarks:', {
      imageData: imageData.substring(0, 50) + '...', // Log first 50 chars
      landmarksCount: landmarks.length,
      landmarks: landmarks.slice(0, 10), // Log first 10 landmarks as sample
    });
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    console.error('Face detection error:', errorMessage);
  };

  if (photoData) {
    return (
      <main className="flex flex-col items-center justify-center bg-white w-full h-full p-4">
        <div className="p-4">
          <Typography
            variant="h4"
            fontWeight={600}
            color="text.primary"
            align="center"
          >
            {t('faceDetection.title')} - Results
          </Typography>
        </div>

        {/* Display captured photo */}
        <div className="mb-4">
          <img
            src={photoData.imageData}
            alt="Captured face"
            className="max-w-md max-h-96 border-2 border-gray-300 rounded-lg"
            style={{ transform: 'scaleX(-1)' }} // Mirror to match camera view
          />
        </div>

        {/* Display landmark count */}
        <Typography variant="body1" className="mb-4">
          Detected {photoData.landmarks.length} facial landmarks
        </Typography>

        {error && (
          <Typography color="error" className="mb-4">
            {error}
          </Typography>
        )}

        <DefaultButton
          text={t('common.nextPage')}
          handleClick={() => {
            // You can pass the photo data and landmarks to the next step
            console.log('Proceeding with face analysis data:', photoData);
            handleSubmit();
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
