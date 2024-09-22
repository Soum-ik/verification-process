import { useEffect, useRef, useState } from 'react';

export const useWebcamCapture = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        startWebcam();
        return () => {
            stopWebcam();
        };
    }, []);

    const startWebcam = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    preferCurrentTab: true,
                    video: {
                        facingMode: { ideal: 'environment' },
                    },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
                setMediaStream(stream);
            } else {
                console.error('Webcam not supported in this browser.');
            }
        } catch (error) {
            console.error('Error accessing webcam', error);
        }
    };

    const stopWebcam = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
                track.stop();
            });
            setMediaStream(null);
        }
    };

    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context && videoRef.current?.videoWidth && videoRef.current?.videoHeight) {
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;

                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageDataUrl = canvas.toDataURL('image/jpeg');

                setCapturedImage(imageDataUrl);
                stopWebcam();
            }
        }
    };

    const resetState = () => {
        stopWebcam();
        setCapturedImage(null);
        startWebcam();
    };

    return {
        videoRef,
        canvasRef,
        capturedImage,
        captureImage,
        resetState,
    };
};
