import { IoCloseSharp } from 'react-icons/io5';
import { useFaceRecognition } from '../../Hooks/useFaceRegonation';
import 'react-circular-progressbar/dist/styles.css';

// Import GIFs
import smile from '../../../public/gifs/Smile GIF.gif';
import eyeBlink from '../../../public/gifs/Blink GIF.gif';
import moveHead from '../../../public/gifs/Adjust GIF.gif';
import LoadingDiv from '../shared/LoadingDiv';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FaceVerification: React.FC = () => {
    const {
        videoRef,
        canvasRef,
        currentStep, isLoading, modelLoaded
    } = useFaceRecognition();


    const verificationSteps = [
        "Position your face within the circle",
        "Move your face right and left",
        "Smile with your teeth showing",
    ];
    const gif = ['', eyeBlink, moveHead, smile]


    const navigate = useNavigate();


    useEffect(() => {
        if (currentStep === 4) {
            const timer = setTimeout(() => {
                navigate('/scan-result'); // Replace with your target route
            }, 3000); // 1 second delay

            // Cleanup function to clear the timer
            return () => clearTimeout(timer);
        }
    }, [currentStep, navigate]);


    return (
        <div className="  flex w-full items-center justify-center flex-col mx-auto p-[20px]">
            {isLoading && <div className=' fixed inset-0 z-50 flex items-center justify-center bg-black/60 mx-auto  min-h-screen'>
                <LoadingDiv text='Extracting data' />
            </div>}
            <div className="w-[360px] pt-[20px] flex items-end justify-end">
                <div>
                    <IoCloseSharp className="size-[24px] opacity-70 cursor-pointer" />
                </div>
            </div>


            <div className=" mt-[60px] flex justify-center items-center flex-col relative">
                <video
                    ref={videoRef}
                    className="  face-recogation flex items-center justify-center  absolute top-0  w-full h-full object-cover rounded-md"
                    autoPlay
                    muted
                    playsInline
                />
                <canvas
                    className="face-recogation w-full h-full object-cover rounded-md"
                    ref={canvasRef}
                />
            </div>


            {modelLoaded && <div className=' w-full h-full   flex justify-center items-center mt-[60px]'>
                <img src={gif[currentStep]} className='gif-size' alt="" />
            </div>}
            <div className="  mt-[91px] bg-white p-4 flex items-start justify-start mx-auto w-[360px]">
                <button className=" w-[360px] cursor-default z-50  mx-auto  rounded-md bg-[rgba(21,21,21,0.50)] px-[12px] py-[10px] text-center font-Inter text-[14px] font-medium leading-[18px] text-[#fff]">
                    {verificationSteps[currentStep - 1]}
                </button>
            </div>

        </div>
    );
};

export default FaceVerification;
