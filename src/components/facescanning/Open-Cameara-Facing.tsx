import { IoCloseSharp } from 'react-icons/io5';
import useGoBack from '../../Hooks/useGoBack';
import { useFaceRecognition } from '../../Hooks/useFaceRegonation';
// import { useEffect } from 'react';

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
        currentStep,
    } = useFaceRecognition();



    const verificationSteps = [
        "Position your face within the circle",
        "Move your face right and left",
        "Smile with your teeth showing",
    ];
    const gif = [smile, eyeBlink, moveHead]


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
    if (currentStep === 4) {
        return <div className=' flex items-center mx-auto justify-center min-h-screen'>
            <LoadingDiv text='Extracting data' />
        </div>

    }


    return (
        <div className="min-h-[65vh] relative flex w-full items-center justify-center flex-col mx-auto p-[20px]">

            <div className="absolute top-0 w-[360px] pt-[20px] flex items-end justify-end">
                <div>
                    <IoCloseSharp className="size-[24px] opacity-70 cursor-pointer" />
                </div>
            </div>


            <div className="relative w-full h-full mt-[100px] flex justify-center items-center">
                <video
                    ref={videoRef}
                    className="  face-recogation absolute top-0 w-full h-full object-cover rounded-md"
                    autoPlay
                    muted
                    playsInline
                />
                <canvas
                    ref={canvasRef}
                />
            </div>



            <div className="absolute mt-[100px] bottom-0 left-0 right-0 bg-white p-4 flex items-center justify-center mx-auto w-[360px]">


                <div className=" absolute bottom-[110px]  w-full flex items-center justify-between ">
                    <button className="w-[360px] cursor-default z-50  mx-auto  rounded-md bg-[rgba(21,21,21,0.50)] px-[12px] py-[10px] text-center font-Inter text-[14px] font-medium leading-[18px] text-[#fff]">
                        {verificationSteps[currentStep - 1]}
                    </button>
                </div>
            </div>
            <div className=' absolute bottom-0'>
                {currentStep > 2 && <img src={gif[currentStep]} className='gif-size' alt="" />}
            </div>
        </div>
    );
};

export default FaceVerification;
