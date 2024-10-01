import { useEffect, useRef, useState } from 'react';

export const useWebcamCapture = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [isReviewVisible, setIsReviewVisible] = useState(false);
    const [image, setImage] = useState<string>('');

    const bgVideoRef = useRef<HTMLVideoElement>(null);


    useEffect(() => {
        if (!isWebcamActive) {
            startWebcam();
        }
        return () => {
            stopWebcam();
        };
    }, [isWebcamActive]);

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
                if (bgVideoRef.current) {
                    bgVideoRef.current.srcObject = stream
                    bgVideoRef.current.play()
                }
                setMediaStream(stream);
                setIsWebcamActive(true);
            } else {
                console.error('Webcam not supported in this browser.');
            }
        } catch (error) {
            console.error('Error accessing webcam', error);
            // Consider adding user feedback here
        }
    };

    const stopWebcam = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
                track.stop();
            });
            setMediaStream(null);
            setIsWebcamActive(false);
            if (videoRef.current) {
                videoRef.current.pause(); // Stop video playback
            }
        }
    };

    const captureCenterArea = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const context = canvas.getContext("2d");
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            canvas.width = videoWidth;
            canvas.height = videoHeight;

            if (context) {
                context.drawImage(video, 0, 0, videoWidth, videoHeight);
                const imageDataUrl = canvas.toDataURL("image/png");
                console.log(imageDataUrl);

                setImage(imageDataUrl);

            }
        }
    };

    const resetImages = () => {
        setIsReviewVisible(false);
        startWebcam();
    };

    return {
        bgVideoRef,
        videoRef,
        canvasRef,
        captureCenterArea,
        resetImages,
        image,
        startWebcam,
        isReviewVisible
    };
};
