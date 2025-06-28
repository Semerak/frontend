import { useCallback, useRef, useState } from 'react';

import { faceLandmarkerService } from '../services/face-landmarker-service';

export interface FaceLandmark {
  x: number;
  y: number;
  z: number;
}

export interface FaceDetectionResult {
  landmarks: FaceLandmark[];
  isLookingAtCamera: boolean;
  confidence: number;
}

export interface UseFaceDetectionOptions {
  onFaceDetected?: (result: FaceDetectionResult) => void;
  onPhotoTaken?: (imageData: string, landmarks: FaceLandmark[]) => void;
  detectionThreshold?: number;
}

export function useFaceDetection({
  onFaceDetected,
  onPhotoTaken,
  detectionThreshold = 0.97,
}: UseFaceDetectionOptions = {}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [lastDetectionResult, setLastDetectionResult] =
    useState<FaceDetectionResult | null>(null);

  const faceLandmarkerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const initializeFaceLandmarker = useCallback(async () => {
    if (isInitialized) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use the singleton service instead of creating a new instance
      faceLandmarkerRef.current =
        await faceLandmarkerService.getFaceLandmarker();
      setIsInitialized(true);
      console.log(
        'Face landmarker initialized successfully via singleton service',
      );
    } catch (err) {
      const errorMessage = `Failed to initialize face landmarker: ${err}`;
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const calculateHeadPose = useCallback(
    (landmarks: FaceLandmark[]) => {
      if (landmarks.length < 468) {
        return { isLookingAtCamera: false, confidence: 0 };
      }

      // Key facial landmarks for head pose estimation
      const noseTip = landmarks[1]; // Nose tip
      const leftEye = landmarks[33]; // Left eye outer corner
      const rightEye = landmarks[263]; // Right eye outer corner
      const leftMouth = landmarks[61]; // Left mouth corner
      const rightMouth = landmarks[291]; // Right mouth corner

      // Calculate distances for symmetry check
      const leftDistance = Math.sqrt(
        Math.pow(noseTip.x - leftEye.x, 2) +
          Math.pow(noseTip.y - leftEye.y, 2) +
          Math.pow(noseTip.z - leftEye.z, 2),
      );

      const rightDistance = Math.sqrt(
        Math.pow(noseTip.x - rightEye.x, 2) +
          Math.pow(noseTip.y - rightEye.y, 2) +
          Math.pow(noseTip.z - rightEye.z, 2),
      );

      // Calculate symmetry ratio (closer to 1 means more frontal)
      const symmetryRatio =
        Math.min(leftDistance, rightDistance) /
        Math.max(leftDistance, rightDistance);

      // Check if nose is centered between eyes
      const eyeCenterX = (leftEye.x + rightEye.x) / 2;
      const noseOffset = Math.abs(noseTip.x - eyeCenterX);
      const eyeDistance = Math.abs(rightEye.x - leftEye.x);
      const noseOffsetRatio = noseOffset / eyeDistance;

      // Check mouth symmetry
      const mouthCenterX = (leftMouth.x + rightMouth.x) / 2;
      const mouthOffset = Math.abs(mouthCenterX - eyeCenterX);
      const mouthOffsetRatio = mouthOffset / eyeDistance;

      // Calculate confidence based on symmetry and alignment
      const confidence =
        symmetryRatio * 0.4 +
        (1 - noseOffsetRatio) * 0.3 +
        (1 - mouthOffsetRatio) * 0.3;

      const isLookingAtCamera = confidence > detectionThreshold;

      return { isLookingAtCamera, confidence };
    },
    [detectionThreshold],
  );

  const processVideoFrame = useCallback(async () => {
    if (!faceLandmarkerRef.current || !videoRef.current || !canvasRef.current) {
      // Continue trying if face landmarker is not ready yet
      if (isInitialized && isStreamActive) {
        animationFrameRef.current = requestAnimationFrame(processVideoFrame);
      }
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) {
      animationFrameRef.current = requestAnimationFrame(processVideoFrame);
      return;
    }

    // Set canvas size to match video dimensions
    if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight
    ) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
    }

    try {
      // Clear canvas and draw video frame first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const startTimeMs = performance.now();
      const results = faceLandmarkerRef.current.detectForVideo(
        video,
        startTimeMs,
      );

      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        const landmarks = results.faceLandmarks[0];
        const { isLookingAtCamera, confidence } = calculateHeadPose(landmarks);

        const detectionResult: FaceDetectionResult = {
          landmarks,
          isLookingAtCamera,
          confidence,
        };

        setLastDetectionResult(detectionResult);
        onFaceDetected?.(detectionResult);

        // Draw landmarks on canvas
        ctx.fillStyle = isLookingAtCamera ? '#00ff00' : '#ff0000';
        landmarks.forEach((landmark: FaceLandmark) => {
          ctx.beginPath();
          ctx.arc(
            landmark.x * canvas.width,
            landmark.y * canvas.height,
            1,
            0,
            2 * Math.PI,
          );
          ctx.fill();
        });

        // Draw status indicators
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.font = 'bold 16px Arial';

        // const confidenceText = `Confidence: ${(confidence * 100).toFixed(1)}%`;
        // const statusText = `Looking at camera: ${isLookingAtCamera ? 'Yes' : 'No'}`;

        // Draw text with background for better visibility
        // ctx.strokeText(confidenceText, 10, 30);
        // ctx.fillText(confidenceText, 10, 30);

        // ctx.strokeText(statusText, 10, 50);
        // ctx.fillText(statusText, 10, 50);

        // Draw detection indicator circle
        const indicatorSize = 20;
        const indicatorX = canvas.width - indicatorSize - 10;
        const indicatorY = indicatorSize + 10;

        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, indicatorSize, 0, 2 * Math.PI);
        ctx.fillStyle = isLookingAtCamera ? '#00ff00' : '#ff0000';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // No face detected
        setLastDetectionResult(null);

        // Draw "No face detected" message
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.font = 'bold 18px Arial';
        const noFaceText = 'No face detected';
        const textWidth = ctx.measureText(noFaceText).width;
        const x = (canvas.width - textWidth) / 2;
        const y = canvas.height / 2;

        ctx.strokeText(noFaceText, x, y);
        ctx.fillText(noFaceText, x, y);
      }
    } catch (err) {
      console.error('Error processing video frame:', err);
    }

    animationFrameRef.current = requestAnimationFrame(processVideoFrame);
  }, [calculateHeadPose, onFaceDetected, isInitialized, isStreamActive]);

  const startCamera = useCallback(async () => {
    setError(null);

    try {
      console.log('Starting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;
      setIsStreamActive(true);
      console.log('Camera stream obtained');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        const handleVideoLoad = () => {
          console.log('Video loaded, starting processing');
          console.log(
            'Video dimensions:',
            videoRef.current?.videoWidth,
            'x',
            videoRef.current?.videoHeight,
          );
          console.log('Is initialized:', isInitialized);
          console.log('Face landmarker ref:', !!faceLandmarkerRef.current);

          if (videoRef.current && isInitialized && faceLandmarkerRef.current) {
            videoRef.current.play();
            // Start processing after a small delay to ensure video is ready
            setTimeout(() => {
              console.log('Starting video frame processing');
              processVideoFrame();
            }, 100);
          } else {
            console.log('Cannot start processing - missing requirements');
          }
        };

        videoRef.current.addEventListener('loadedmetadata', handleVideoLoad);
        videoRef.current.addEventListener('canplay', () => {
          console.log('Video can play');
        });
      }
    } catch (err) {
      const errorMessage = `Failed to access camera: ${err}`;
      console.error(errorMessage);
      setError(errorMessage);
    }
  }, [processVideoFrame, isInitialized]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsStreamActive(false);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setCountdown(null);
  }, []);

  const startCountdown = useCallback(() => {
    if (countdown !== null) return; // Already counting down

    let count = 3;
    setCountdown(count);

    countdownIntervalRef.current = setInterval(() => {
      count--;
      setCountdown(count);

      if (count === 0) {
        // Take photo
        if (canvasRef.current && lastDetectionResult) {
          const canvas = canvasRef.current;
          const imageData = canvas.toDataURL('image/jpeg', 0.8);
          onPhotoTaken?.(imageData, lastDetectionResult.landmarks);
        }

        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
        setCountdown(null);
      }
    }, 1000);
  }, [countdown, lastDetectionResult, onPhotoTaken]);

  const cleanup = useCallback(() => {
    stopCamera();

    if (faceLandmarkerRef.current) {
      // Release the face landmarker via the singleton service
      faceLandmarkerService.releaseFaceLandmarker();
      faceLandmarkerRef.current = null;
    }

    setIsInitialized(false);
    setIsStreamActive(false);
  }, [stopCamera]);

  // Add debugging method to the hook
  const debugHookState = useCallback(() => {
    console.log('=== Hook State Debug ===');
    console.log('isInitialized:', isInitialized);
    console.log('isLoading:', isLoading);
    console.log('isStreamActive:', isStreamActive);
    console.log('error:', error);
    console.log('faceLandmarkerRef.current:', !!faceLandmarkerRef.current);
    console.log('videoRef.current:', !!videoRef.current);
    console.log('canvasRef.current:', !!canvasRef.current);
    console.log('=======================');
  }, [isInitialized, isLoading, isStreamActive, error]);

  return {
    // State
    isInitialized,
    isLoading,
    error,
    countdown,
    isStreamActive,
    lastDetectionResult,

    // Refs
    videoRef,
    canvasRef,

    // Methods
    initializeFaceLandmarker,
    startCamera,
    stopCamera,
    startCountdown,
    cleanup,
    debugHookState, // Expose the debug method
  };
}
