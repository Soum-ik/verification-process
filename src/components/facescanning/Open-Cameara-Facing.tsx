import { IoCloseSharp } from 'react-icons/io5';
import { useFaceRecognition } from '../../Hooks/useFaceRegonation';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import goBack from '../../Hooks/useGoBack';
// import AWS from 'aws-sdk';

// Import GIFs
import smile from '../../../public/gifs/Smile GIF.gif';
import eyeBlink from '../../../public/gifs/Blink GIF.gif';
import moveHead from '../../../public/gifs/Adjust GIF.gif';
import LoadingDiv from '../shared/LoadingDiv';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { API, Authorization } from '../../config/config';
import axios from 'axios';
import toast from 'react-hot-toast';


const FaceVerification: React.FC = () => {

    const {
        videoRef,
        canvasRef,
        currentStep, isLoading, modelLoaded, hasMovedLeft, hasMovedRight, captureImage
    } = useFaceRecognition();
    // const [loadingFetching, setLoadingFetching] = useState<boolean>(false);
    const session_id = localStorage.getItem('session_id')

    if (captureImage) {
        toast.success('Image captured successfully');
        localStorage.setItem('captureImage', captureImage);
    }

    const [capture, setCapture] = useState<Blob | null>(null);
    const formData = new FormData();
    if (capture) {
        formData.append('capture', capture, 'image.jpg');
    }

    useEffect(() => {
        if (typeof captureImage !== 'string') {
            setCapture(captureImage);
        }
    }, [captureImage])

    const verificationSteps = [
        "Position your face within the circle",
        "Move your face right and left",
        "Smile with your teeth showing",
        "Smile with your teeth showing",
    ];
    const gif = ['', eyeBlink, moveHead, smile, smile]

    const navigate = useNavigate();


    interface VerificationResponse {
        Verified: boolean;
        driving_license_url: string;
        user_image_url: string;
    }

    const [response, setResponse] = useState<VerificationResponse | null>(null);

    console.log(response, 'checking the response that i recive from the server')

    const totalSteps = verificationSteps.length + 1; // +2 for hasMovedRight and hasMovedLeft

    // Calculate completed steps
    let completedSteps = currentStep - 1; // Start with the progress based on the currentStep

    // Add 1 for each additional condition if true
    if (hasMovedRight || hasMovedLeft) completedSteps += 1;

    // Calculate the progress percentage
    const progressPercentage = (completedSteps / (totalSteps - 1)) * 100;

    const apiCall = useCallback(async () => {
        if (captureImage && currentStep === 4) {
            const formData = new FormData();

            // Log session_id
            console.log('Session ID:', session_id || '912748791473892749832747');
            formData.append('session_id', session_id || '912748791473892749832747');

            // Log captureImage type and content
            console.log('CaptureImage type:', typeof captureImage);
            console.log('CaptureImage content:', captureImage);

            if (typeof captureImage === 'string') {
                try {
                    const response = await fetch(captureImage);
                    const blob = await response.blob();
                    formData.append('image', blob, 'image.jpg');
                } catch (error) {
                    console.error('Error converting to blob:', error);
                }
            } else if (captureImage) {
                formData.append('image', captureImage, 'image.jpg');
            }




            const responseData = localStorage.getItem('response');
            try {
                // setLoadingFetching(true);
                const { data } = await axios.post(`${API}identity_verification`, formData, {
                    headers: {
                        Authorization,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                localStorage.setItem('identity_verification', JSON.stringify(data));

                setResponse(data)
                if (!data.Verified) {
                    toast.error('Face verification failed');
                }

                localStorage.setItem('res', JSON.stringify(response))


                if (responseData) {
                    const parsedResponseData = JSON.parse(responseData);
                    const updateData = JSON.stringify({ ...parsedResponseData, ...data });
                    localStorage.setItem('response1', updateData);
                }
            } catch (error) {
                // setLoadingFetching(false);
                console.error('Error uploading image:', error);
            }
        }
    }, [captureImage, currentStep, Authorization]);



    useEffect(() => {
        apiCall(); // Call whenever dependencies change
    }, [apiCall]);


    useEffect(() => {
        if (currentStep === 4) {
            const timer = setTimeout(() => {
                if (response?.Verified) {
                    console.log(response.Verified);

                    navigate('/scan-result'); // Replace with your target route
                    // window.location.reload()
                } else {
                    toast.error('Face verification failed');
                    navigate('/open-face-recogation-camera'); // Replace with your target route
                    // window.location.reload()
                }
            }, 3000); // 1 second delay

            // Cleanup function to clear the timer
            return () => clearTimeout(timer);
        }
    }, [currentStep, navigate]);

    return (
        <div className="flex min-h-[65vh] w-full items-center justify-center flex-col mx-auto p-[20px]">
            {isLoading && <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 mx-auto min-h-screen'>
                <LoadingDiv text='Extracting data' />
            </div>}
            <div onClick={goBack()} className="w-[360px] p-[20px] flex items-end justify-end">
                <div>
                    <IoCloseSharp className="size-[24px] opacity-70 cursor-pointer" />
                </div>
            </div>

            {/* Circular Progress Bar Container */}
            <div className="mt-[60px] flex justify-center items-center flex-col relative">
                <div className="relative size-[270px]">
                    <CircularProgressbar
                        value={progressPercentage}
                        className='  z-[1000]'
                        styles={buildStyles({
                            pathColor: `#2D65F2`,
                            strokeLinecap: 'round',

                        })}
                        strokeWidth={2}
                    />

                    {/* Video and Canvas elements */}
                    <div className=" mt-[5px] absolute inset-0 flex items-center justify-center">
                        <video
                            ref={videoRef}
                            className="face-recogation z-50 flex items-center justify-center absolute top-0 w-full h-full object-cover rounded-full"
                            autoPlay
                            muted
                            playsInline
                        />
                        <canvas
                            className="face-recogation w-full h-full object-cover rounded-md"
                            ref={canvasRef}
                        />
                    </div>

                </div>
            </div>


            <div className='w-full   h-full flex justify-center items-center mt-[60px]'>
                {(modelLoaded && currentStep >= 1) && <img src={gif[currentStep]} className='gif-size' alt="" />}
            </div>
            <div className="fixed mt-[650px] bg-white p-4 flex items-start justify-start mx-auto w-[360px]">
                <button className="w-[360px] cursor-default z-[1000] mx-auto rounded-md bg-[rgba(21,21,21,0.50)] px-[12px] py-[10px] text-center font-Inter text-[14px] font-medium leading-[18px] text-[#fff]">
                    {verificationSteps[currentStep - 1]}
                </button>
            </div>
        </div>
    );
};

export default FaceVerification;
