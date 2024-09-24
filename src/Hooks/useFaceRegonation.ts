import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export const useFaceRecognition = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [verificationStep, setVerificationStep] = useState(0);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {




        return () => {
            stopWebcam();
        };
    }, []);


    const loadModels = async () => {
        try {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ]);
            console.log('All models loaded successfully!');
            // Add additional logic here to run after models are loaded
        } catch (err) {
            console.error('Error loading models:', err);
        }
    };

    const faceDetact = () => {
        setInterval(async () => {
            const detections  = await faceapi.detectAllFaces
        });
    }

        


    const startWebcam = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'user',
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current!.play();
                        setIsWebcamActive(true);
                        setMediaStream(stream);
                        setupFaceDetection();
                    };
                }
            } else {
                setError('Webcam not supported in this browser.');
            }
        } catch (error) {
            console.error('Error accessing webcam', error);
            setError(`Error accessing webcam: ${error.message}`);
        }
    };

    const setupFaceDetection = () => {
        if (!videoRef.current) return;

        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvasRef.current!.appendChild(canvas);

        const displaySize = {
            width: videoRef.current.width,
            height: videoRef.current.height,
        };

        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            if (!videoRef.current) return;

            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

            if (!isVerified) {
                handleVerificationStep(resizedDetections);
            }
        }, 100);
    };

    const stopWebcam = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
                track.stop();
            });
            setMediaStream(null);
            setIsWebcamActive(false);
        }
    };

    // ... (rest of the code remains the same)

    return {
        videoRef,
        canvasRef,
        startWebcam,
        stopWebcam,
        verificationStep,
        verificationMessage,
        isVerified,
        error
    };
};