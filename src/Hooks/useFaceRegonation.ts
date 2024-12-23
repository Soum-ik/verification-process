import { useCallback, useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import'@tensorflow/tfjs-backend-webgl';
import toast from 'react-hot-toast';

export const useFaceRecognition = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const bgVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);

    // to count the steps
    const [currentStep, setCurrentStep] = useState(1);
    // console.log('get the current step', currentStep);


    const [videoWidth, setVideoWidth] = useState<number | null>(null);
    const [isTeethShowing, setIsTeethShowing] = useState(false);
    const [eyePositions, setEyePositions] = useState<{
        leftEye: number[],
        rightEye: number[],
        nose: number[],
    }>({ leftEye: [], rightEye: [], nose: [] });
    const [hasMovedLeft, setHasMovedLeft] = useState(false);
    const [hasMovedRight, setHasMovedRight] = useState(false);
    const [hasVerifiedCenter, setHasVerifiedCenter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [captureImage, setCaptureImage] = useState('');






    // eslint-disable-next-line react-hooks/exhaustive-deps
    const runFaceDetection = async () => {
        const model = await blazeface.load();
        setModelLoaded(true)
        if (videoRef.current) {
            const detectionInterval = setInterval(() => {
                if (currentStep === 1 && !hasVerifiedCenter) {
                    detect(model);
                } else if (currentStep === 2) {
                    clearInterval(detectionInterval); // Stop when step advances
                }
            }, 20); // Adjust interval as needed
            // Cleanup interval on unmount
            return () => clearInterval(detectionInterval);
        }
    }




    const startWebcam = useCallback(async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: 'user' },
                    },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play();
                        runFaceDetection();
                    };

                    setIsWebcamActive(true);
                    setMediaStream(stream);
                }
            } else {
                toast.error(`Webcam not supported in this browser.`)
            }
        } catch (error) {
            toast.error(`Error accessing webcam`)
            console.error('Error accessing webcam', error);
        }
    }, [runFaceDetection]);

    const stopWebcam = useCallback(() => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
            setMediaStream(null);
        }
        setIsWebcamActive(false);
    }, [mediaStream]);

    useEffect(() => {
        if (!isWebcamActive) {
            startWebcam();
        }
    }, [isWebcamActive, startWebcam]);


    const detect = async (model: blazeface.BlazeFaceModel) => {
        if (videoRef.current && videoRef.current.readyState === 4) {
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;

            // Make sure to fetch predictions
            const predictions = await model.estimateFaces(videoRef.current, false);

            // Check if any faces were detected
            if (predictions.length > 0) {
                const ctx = canvasRef.current?.getContext('2d');

                if (ctx) {
                    ctx.clearRect(0, 0, videoWidth, videoHeight);

                    // Ensure landmarks are of the expected type (number[][])
                    const landmarks = predictions[0].landmarks;
                    if (Array.isArray(landmarks) && landmarks.every(point => Array.isArray(point))) {
                        const [leftEye, rightEye, nose, mouthLeft, mouthRight] = landmarks as number[][];


                        // Store mouth positions in the state
                        setEyePositions({
                            leftEye,
                            rightEye,
                            nose,
                        });
                        setVideoWidth(videoWidth);


                        const mouthHeight = Math.abs(mouthLeft[1] - mouthRight[1]);
                        setIsTeethShowing(mouthHeight > 10); // Adjust threshold


                    } else {
                        console.error("Unexpected format for landmarks", landmarks);
                    }
                } else {
                    console.error("Failed to get canvas context");
                }
            } else {
                // console.log("No faces detected");
            }
        } else {
            console.log("Video not ready for detection");
        }
    }

    const capturePicture = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageDataUrl = canvas.toDataURL('image/png');
                setCaptureImage(imageDataUrl)
                // console.log("Captured Image Data URL:", imageDataUrl);
                // Further process the image data as needed
            }
        }
    }, []);


    const handleCaptureProcess = useCallback(() => {
        capturePicture();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            stopWebcam()
        }, 8000); // 3-second delay
    }, [capturePicture, stopWebcam]);




    const verifyTurnFace = useCallback(() => {
        const centerX = (videoWidth as number) / 2;
        const leftEyeX = eyePositions.leftEye[0];
        const rightEyeX = eyePositions.rightEye[0];

        // Check if the face has moved to the left of the center
        if (!hasMovedLeft && (leftEyeX < centerX && rightEyeX < centerX)) {
            // console.log("Face moved to the left");
            setHasMovedLeft(true);
        }

        // Check if the face has moved to the right of the center
        if (!hasMovedRight && (leftEyeX > centerX && rightEyeX > centerX)) {
            // console.log("Face moved to the right");
            setHasMovedRight(true);
        }

        if (hasMovedLeft && hasMovedRight) {
            // console.log("Step 2: Face movement from left to right verified");
            setCurrentStep(3); // Move to the next step
        }
    }, [eyePositions, videoWidth, hasMovedLeft, hasMovedRight]);

    const verifyCenter = useCallback(() => {
        if (currentStep !== 1 || hasVerifiedCenter) return; // Only run if step is 1 and hasn't been verified yet
        const nose = eyePositions.nose
        const noseX = eyePositions.nose[0]
        // Validate inputs
        if (!Array.isArray(nose) || nose.length < 1) {
            console.error('Invalid nose data:', nose);
            return;
        }
        if (typeof videoWidth !== 'number' || videoWidth <= 0) {
            console.error('Invalid videoWidth:', videoWidth);
            return;
        }

        // Calculate center
        const centerX = videoWidth / 2;


        // Check if nose is centered within a 50-pixel range
        if (Math.abs(noseX - centerX) < 40) {
            // console.log('Step 1: Nose is centered.');
            setCurrentStep(2);
            setHasVerifiedCenter(true)
        } else {
            // console.log('Nose is not centered.');
        }
    }, [currentStep, eyePositions.nose, hasVerifiedCenter, videoWidth]);

    const verifyTeethShowing = useCallback(() => {
        if (currentStep === 3 && isTeethShowing) {
            // console.log("Teeth are showing");
            setTimeout(() => {
                setCurrentStep(4); // Move to the next step
            }, 5000);
        } else if (currentStep === 3) {
            // console.log("Teeth are not showing");
        }
    }, [currentStep, isTeethShowing]);

    useEffect(() => {
        if (currentStep === 2) {
            setHasVerifiedCenter(true);
            verifyTurnFace();  // Call the function when step is 2
        }
    }, [currentStep, verifyTurnFace]);
    useEffect(() => {
        if (currentStep === 1) {
            // setHasVerifiedCenter(false);
            verifyCenter();  // Call the function when step is 2
        }
    }, [currentStep, verifyCenter]);
    useEffect(() => {
        if (currentStep === 3) {
            verifyTeethShowing();
        }
    }, [currentStep, verifyTeethShowing]);
    useEffect(() => {
        if (currentStep === 4) {
            handleCaptureProcess();
            setTimeout(() => {
                stopWebcam()
            }, 2000);
        }
    }, [currentStep, handleCaptureProcess, stopWebcam]);
    return {
        videoRef,
        canvasRef,
        startWebcam,
        stopWebcam,
        isWebcamActive,
        currentStep,
        hasMovedRight,
        hasMovedLeft,
        captureImage,
        isLoading,
        modelLoaded,
        bgVideoRef
    };
};
