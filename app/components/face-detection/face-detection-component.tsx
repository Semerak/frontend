import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';
import { faceLandmarkerService } from 'app/services/face-landmarker-service';

import {
  useFaceDetection,
  type FaceLandmark,
  type FaceDetectionResult,
} from '../../hooks/use-face-detection';

interface FaceDetectionComponentProps {
  onPhotoTaken: (imageData: string, landmarks: FaceLandmark[]) => void;
  onError?: (error: string) => void;
}

export function FaceDetectionComponent({
  onPhotoTaken,
  onError,
}: FaceDetectionComponentProps) {
  const { t } = useTranslation();

  const {
    isInitialized,
    isLoading,
    error,
    countdown,
    isStreamActive,
    lastDetectionResult,
    videoRef,
    canvasRef,
    initializeFaceLandmarker,
    startCamera,
    stopCamera,
    startCountdown,
    cleanup,
    debugHookState,
  } = useFaceDetection({
    onFaceDetected: (result: FaceDetectionResult) => {
      // Optional: Add any additional processing here
      console.log('Face detected:', result);
    },
    onPhotoTaken: (imageData: string, landmarks: FaceLandmark[]) => {
      onPhotoTaken(imageData, landmarks);
    },
    detectionThreshold: 0.97, // Adjust sensitivity as needed
  });

  useEffect(() => {
    initializeFaceLandmarker();

    return () => {
      cleanup();
    };
  }, [initializeFaceLandmarker, cleanup]);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const handleStartDetection = async () => {
    console.log('Starting face detection...');

    // Log initial state
    debugHookState();

    try {
      if (!isInitialized) {
        console.log('Initializing face landmarker...');
        await initializeFaceLandmarker();

        // Log state after initialization
        console.log('After initialization:');
        debugHookState();
      }
      console.log('Starting camera...');
      await startCamera();

      // Log state after camera start
      console.log('After camera start:');
      debugHookState();
    } catch (error) {
      console.error('Failed to start detection:', error);
    }
  };

  const handleTakePhoto = () => {
    if (lastDetectionResult?.isLookingAtCamera) {
      startCountdown();
    }
  };

  const getStatusMessage = () => {
    if (isLoading) return t('faceDetection.initializing');
    if (error) return t('faceDetection.error');
    if (!isInitialized) return t('faceDetection.notInitialized');
    if (countdown !== null) {
      return countdown > 0
        ? t('faceDetection.countdown', { count: countdown })
        : t('faceDetection.takingPhoto');
    }
    if (lastDetectionResult) {
      return lastDetectionResult.isLookingAtCamera
        ? t('faceDetection.lookingAtCamera')
        : t('faceDetection.lookAway');
    }
    return t('faceDetection.positionFace');
  };

  const getStatusColor = () => {
    if (error) return 'error';
    if (countdown !== null) return 'warning';
    if (lastDetectionResult?.isLookingAtCamera) return 'success';
    return 'info';
  };

  return (
    <Box className="flex flex-col items-center justify-center w-full h-full p-4">
      {/* Title */}
      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        align="center"
        className="mb-4"
      >
        {t('faceDetection.title')}
      </Typography>

      {/* Camera Preview */}
      <Box className="relative mb-4">
        <video
          ref={videoRef}
          className="hidden"
          autoPlay
          playsInline
          muted
          style={{ transform: 'scaleX(-1)' }} // Mirror effect
        />
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-300 rounded-lg"
          style={{
            transform: 'scaleX(-1)', // Mirror effect
            maxWidth: '640px',
            maxHeight: '480px',
            width: '100%',
            height: 'auto',
            minWidth: '320px',
            minHeight: '240px',
            backgroundColor: '#f0f0f0', // Show gray background when no video
          }}
        />

        {/* Loading indicator when camera is starting */}
        {isLoading && (
          <Box className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
            <CircularProgress size={40} />
            <Typography variant="body2" className="ml-2">
              Starting camera...
            </Typography>
          </Box>
        )}

        {/* Countdown Overlay */}
        {countdown !== null && countdown > 0 && (
          <Box className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <Typography
              variant="h1"
              color="white"
              fontWeight="bold"
              className="text-8xl"
            >
              {countdown}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Status Message */}
      <Alert
        severity={getStatusColor()}
        className="mb-4 w-full max-w-md"
        icon={isLoading ? <CircularProgress size={20} /> : undefined}
      >
        <Typography variant="body2" align="center">
          {getStatusMessage()}
        </Typography>
        {lastDetectionResult && (
          <Typography variant="caption" display="block" align="center">
            {t('faceDetection.confidence', {
              confidence: (lastDetectionResult.confidence * 100).toFixed(1),
            })}
          </Typography>
        )}
      </Alert>

      {/* Control Buttons */}
      <Box className="flex gap-4 w-full max-w-md">
        {!isStreamActive ? (
          <DefaultButton
            text={t('faceDetection.startCamera')}
            handleClick={handleStartDetection}
            disabled={isLoading}
            fullWidth
          />
        ) : (
          <>
            <DefaultButton
              text={t('faceDetection.takePhoto')}
              handleClick={handleTakePhoto}
              disabled={
                !lastDetectionResult?.isLookingAtCamera || countdown !== null
              }
              style={{ flex: 1 }}
            />
            <DefaultButton
              text={t('faceDetection.stopCamera')}
              handleClick={stopCamera}
              style={{ flex: 1 }}
            />
          </>
        )}
      </Box>

      {/* Debug Button */}
      <Box className="flex gap-2 mt-2 w-full max-w-md">
        <DefaultButton
          text="Debug Hook State"
          handleClick={() => {
            debugHookState();
            faceLandmarkerService.logStatus();
          }}
          style={{ fontSize: '0.75rem', padding: '4px 8px' }}
        />
      </Box>

      {/* Instructions */}
      <Box className="mt-4 text-center max-w-md">
        <Typography variant="body2" color="text.secondary">
          {t('faceDetection.instructions')}
        </Typography>

        {/* Debug Information */}
        <Box className="mt-2 p-2 bg-gray-100 rounded text-left">
          <Typography variant="caption" display="block">
            Initialized: {isInitialized ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="caption" display="block">
            Loading: {isLoading ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="caption" display="block">
            Stream Active: {isStreamActive ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="caption" display="block">
            Video Dimensions: {videoRef.current?.videoWidth || 0} x{' '}
            {videoRef.current?.videoHeight || 0}
          </Typography>
          <Typography variant="caption" display="block">
            Canvas Dimensions: {canvasRef.current?.width || 0} x{' '}
            {canvasRef.current?.height || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default FaceDetectionComponent;
