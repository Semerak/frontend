import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useEffect, useCallback } from 'react';
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
    autoCountdownEnabled,
    videoRef,
    canvasRef,
    startDetection,
    stopDetection,
    startCountdown,
    stopCountdown,
    setAutoCountdownEnabled,
    getDebugInfo,
  } = useFaceDetection({
    onFaceDetected: (result: FaceDetectionResult) => {
      // Optional: Add any additional processing here
      console.log('Face detected:', result);
    },
    onPhotoTaken: (imageData: string, landmarks: FaceLandmark[]) => {
      onPhotoTaken(imageData, landmarks);
    },
    detectionThreshold: 0.96, // Adjust sensitivity as needed
  });

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const handleStartDetection = useCallback(async () => {
    console.log('Starting face detection...');

    // Log initial state
    console.log('Debug info:', getDebugInfo());

    try {
      console.log('Starting detection...');
      await startDetection();

      // Log state after detection start
      console.log('After detection start:', getDebugInfo());
    } catch (error) {
      console.error('Failed to start detection:', error);
    }
  }, [getDebugInfo, startDetection]);

  // Auto-start camera when initialized
  useEffect(() => {
    if (isInitialized && !isStreamActive && !isLoading) {
      console.log('Auto-starting camera detection...');
      handleStartDetection();
    }
  }, [isInitialized, isStreamActive, isLoading, handleStartDetection]);

  const handleTakePhoto = () => {
    if (lastDetectionResult?.isLookingAtCamera) {
      // Stop any existing countdown and take photo immediately
      if (countdown !== null) {
        stopCountdown();
      }
      startCountdown(1); // Very short countdown for immediate capture
    }
  };

  const getStatusMessage = () => {
    if (isLoading) return t('faceDetection.initializing');
    if (error) return t('faceDetection.error');
    if (!isInitialized) return t('faceDetection.notInitialized');
    if (countdown !== null) {
      if (countdown > 0) {
        return `Taking photo in ${countdown}...`;
      } else {
        return 'Taking photo now!';
      }
    }
    if (lastDetectionResult) {
      if (lastDetectionResult.isLookingAtCamera) {
        return autoCountdownEnabled
          ? 'Looking at camera - Keep looking to start countdown!'
          : 'Looking at camera - Auto capture disabled';
      } else {
        return 'Please look directly at the camera';
      }
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
          className="border-2 border-gray-300 rounded-lg"
          autoPlay
          playsInline
          muted
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
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            transform: 'scaleX(-1)', // Mirror effect for consistency
            maxWidth: '640px',
            maxHeight: '480px',
            width: '100%',
            height: 'auto',
            minWidth: '320px',
            minHeight: '240px',
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
        {countdown !== null && (
          <Box className="absolute inset-0 flex items-center justify-center rounded-lg">
            {/* Dark overlay that allows camera footage to show through */}
            <Box
              className="absolute inset-0 bg-black rounded-lg"
              sx={{ opacity: 0.6 }}
            />

            {/* Countdown number */}
            <Typography
              variant="h1"
              color="white"
              fontWeight="bold"
              className="relative z-10"
              sx={{
                textShadow:
                  '0 0 30px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.5)',
                fontSize: { xs: '5rem', sm: '7rem', md: '9rem' },
                animation: countdown > 0 ? 'pulse 1s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', opacity: 1 },
                  '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                },
              }}
            >
              {countdown > 0 ? countdown : '📸'}
            </Typography>

            {/* Additional text for context */}
            {countdown > 0 && (
              <Typography
                variant="h6"
                color="white"
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
                sx={{
                  textShadow: '0 0 10px rgba(0,0,0,0.8)',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                Keep looking at camera
              </Typography>
            )}
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
          <Box className="flex items-center justify-center w-full">
            <CircularProgress size={24} />
            <Typography variant="body2" className="ml-2">
              {isLoading ? 'Starting camera...' : 'Initializing...'}
            </Typography>
          </Box>
        ) : (
          <>
            <DefaultButton
              text={
                autoCountdownEnabled
                  ? 'Disable Auto Capture'
                  : 'Enable Auto Capture'
              }
              handleClick={() => setAutoCountdownEnabled(!autoCountdownEnabled)}
              style={{ flex: 1 }}
            />
            {countdown !== null ? (
              <DefaultButton
                text="Cancel Countdown"
                handleClick={stopCountdown}
                style={{ flex: 1 }}
              />
            ) : (
              <DefaultButton
                text="Manual Capture"
                handleClick={handleTakePhoto}
                disabled={
                  !lastDetectionResult?.isLookingAtCamera || countdown !== null
                }
                style={{ flex: 1 }}
              />
            )}
            <DefaultButton
              text={t('faceDetection.stopCamera')}
              handleClick={stopDetection}
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
            console.log('Hook debug info:', getDebugInfo());
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
            Auto Countdown: {autoCountdownEnabled ? 'Enabled' : 'Disabled'}
          </Typography>
          <Typography variant="caption" display="block">
            Looking at Camera:{' '}
            {lastDetectionResult?.isLookingAtCamera ? 'Yes' : 'No'}
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
