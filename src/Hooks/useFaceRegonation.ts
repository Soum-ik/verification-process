import { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs-backend-webgl';

export const useFaceRecognition = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);

    // Step states
    const [currentStep, setCurrentStep] = useState(1);
    const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([false, false, false, false]);

    useEffect(() => {
        if (!isWebcamActive) {
            startWebcam();
        }
    }, [isWebcamActive]);

    useEffect(() => {
        if (currentStep <= 4) {
            runFaceDetection();
        }
    }, [currentStep]); // Run detection whenever the current step changes

    const runFaceDetection = async () => {
        const model = await blazeface.load();
        console.log('FaceDetection Model loaded', model);

        if (videoRef.current) {
            setInterval(() => {
                detect(model);
            }, 100); // Adjust the interval as needed
        }
    };

    const detect = async (model: blazeface.BlazeFaceModel) => {
        if (videoRef.current && videoRef.current.readyState === 4) {
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;

            if (canvasRef.current) {
                canvasRef.current.width = videoRef.current.width;
                canvasRef.current.height = videoHeight;
            }

            const predictions = await model.estimateFaces(videoRef.current, false);

            if (predictions.length > 0) {
                const ctx = canvasRef.current?.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, videoWidth, videoHeight);
                    predictions.forEach((prediction) => {
                        // ctx.strokeStyle = "blue";
                        // ctx.beginPath();
                        // ctx.rect(
                        //     prediction.topLeft[0],
                        //     prediction.topLeft[1],
                        //     prediction.bottomRight[0] - prediction.topLeft[0],
                        //     prediction.bottomRight[1] - prediction.topLeft[1]
                        // );
                        // ctx.stroke();

                        // ctx.strokeStyle = "red";
                        // prediction.landmarks?.forEach(landmark => {
                        //     ctx.fillRect(landmark[0], landmark[1], 5, 5);
                        // });

                        const [leftEye, rightEye, nose, mouthLeft, mouthRight] = prediction.landmarks;
                        // console.log(leftEye, rightEye, 'verification ');


                        const landmarks = prediction.landmarks;

                        // Assuming landmarks[2] is the upper lip and landmarks[3] is the lower lip
                        const upperLip = landmarks[2];
                        const lowerLip = landmarks[3];


                        if (currentStep === 1) verifyCenter(nose, videoWidth);
                        if (currentStep === 2) verifyTurnFace(leftEye, rightEye);
                        if (currentStep === 3) verifyMouthOpen(upperLip, lowerLip);
                        if (currentStep === 4) verifyFaceComplete(prediction);
                    });
                }
            }
        }
    };

    // Verification steps
    const verifyCenter = (nose, videoWidth) => {
        console.log('test 1');

        const centerX = videoWidth / 2;
        const noseX = nose[0];
        if (Math.abs(noseX - centerX) < 50) {
            console.log('test 1 completed');
            console.log("Step 1: Face is centered.");
            completeStep(1);
            console.log(currentStep, 'step checking');
        }
    };

    const verifyTurnFace = (leftEye, rightEye) => {
        console.log('test 2');

        const eyeDistance = Math.abs(leftEye[0] - rightEye[0]);
        if (eyeDistance < 50 || eyeDistance > 150) {
            console.log("Step 2: Face turned left/right.");
            completeStep(2);
        }
    };

    const verifyMouthOpen = (upperLip, lowerLip) => {
        console.log('Upper Lip:', upperLip);
        console.log('Lower Lip:', lowerLip);

        // Calculate the vertical distance between the upper and lower lips
        const mouthHeight = Math.abs(lowerLip[1] - upperLip[1]);
        console.log('Mouth Height:', mouthHeight);

        let faceHeightThreshold
        // Adjust threshold based on face size (e.g., 20% of the face height)
        if (videoRef.current) {
            faceHeightThreshold = videoRef.current.videoHeight * 0.1; // Adjust this value as needed
            console.log('Threshold:', faceHeightThreshold);
        }

        if (!faceHeightThreshold) {
            console.log('not opening');

            return
        }

        if (mouthHeight > faceHeightThreshold) {
            console.log("Step 3: Mouth is open.");
            completeStep(3);
        }
    };


    const verifyFaceComplete = (prediction) => {
        if (prediction.probability[0] > 0.40) { // Check face confidence
            console.log("Step 4: Verification completed.");
            completeStep(4);
        }
    };

    const completeStep = (stepNumber: number) => {
        if (stepsCompleted[stepNumber - 1]) return; // Prevent re-running

        setStepsCompleted((prev) => {
            const updatedSteps = [...prev];
            updatedSteps[stepNumber - 1] = true;
            return updatedSteps;
        });

        if (currentStep === stepNumber) {
            setCurrentStep(stepNumber + 1); // Proceed to the next step
        }
    };


    const startWebcam = async () => {
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
                console.log('Webcam not supported in this browser.');
            }
        } catch (error) {
            console.error('Error accessing webcam', error);
        }
    };

    const stopWebcam = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
            setMediaStream(null);
        }
        setIsWebcamActive(false);
    };

    return {
        videoRef,
        canvasRef,
        startWebcam,
        stopWebcam,
        isWebcamActive,
        currentStep,
        stepsCompleted
    };
};
