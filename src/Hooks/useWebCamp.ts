import { useEffect, useRef, useState } from 'react';

export const useWebcamCapture = (currentPage?: number | undefined) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [isFrontCaptured, setIsFrontCaptured] = useState(false);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [isReviewVisible, setIsReviewVisible] = useState(false); // State to control the visibility of the review

    const bgVideoRef = useRef<HTMLVideoElement>(null);


    useEffect(() => {
        if (!isWebcamActive) {
            startWebcam();
        }
        return () => {
            stopWebcam();
        };
    }, [currentPage, isWebcamActive]);



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
        }
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

    const captureCenterArea = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const context = canvas.getContext("2d");
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Set canvas size to match video size
            canvas.width = videoWidth;
            canvas.height = videoHeight;

            if (context) {
                context.drawImage(video, 0, 0, videoWidth, videoHeight);
                const imageDataUrl = canvas.toDataURL("image/png");
                if (!isFrontCaptured) {
                    setFrontImage(imageDataUrl);
                    setIsFrontCaptured(true);
                    setIsReviewVisible(true); // Show the review modal
                } else {
                    setBackImage(imageDataUrl);
                    setIsReviewVisible(true); // Show the review modal
                }
            }
        }
    };

    const resetFrontImage = () => {
        setFrontImage(null);
        setIsFrontCaptured(false);
        setIsReviewVisible(false); // Hide the review modal immediately
        startWebcam()
    };

    const resetBackImage = () => {
        setBackImage(null);
        setIsReviewVisible(false); // Hide the review modal immediately
        startWebcam(); // Restart webcam when resetting front image
    };

    const resetAllImages = () => {
        resetFrontImage();
        resetBackImage();
        setIsReviewVisible(false); // Hide the review modal
        startWebcam(); // Restart webcam when resetting front image
    };;

    return {
        videoRef,
        canvasRef,
        captureCenterArea,
        resetAllImages,
        resetBackImage,
        resetFrontImage,
        frontImage,
        backImage,
        startWebcam,
        bgVideoRef,
        isReviewVisible
    };
};
