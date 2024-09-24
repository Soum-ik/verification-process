import { IoCloseSharp } from 'react-icons/io5';
import useGoBack from '../../Hooks/useGoBack';
import { useFaceRecognition } from '../../Hooks/useFaceRegonation';
// import { useEffect } from 'react';

// Import GIFs
// import smile from '../../../public/gifs/Smile GIF.gif';
// import eyeBlink from '../../../public/gifs/Blink GIF.gif';
// import moveHead from '../../../public/gifs/Adjust GIF.gif';

const FaceVerification: React.FC = () => {
    const {
        videoRef,
        canvasRef,
        verificationStep,
        verificationMessage,
        isVerified,
        error
    } = useFaceRecognition();

    if (error) {
        return <div>Error: {error}</div>;
    }
    // const goBack = useGoBack(); // Store the goBack function once


    return (
        <div className="min-h-[65vh] relative flex items-center justify-center flex-col mx-auto p-[20px]">
            {/* Close button */}
            {/* <div className="absolute top-0 w-[360px] pt-[20px] flex items-end justify-end">
                <div onClick={goBack}>
                    <IoCloseSharp className="size-[24px] opacity-70 cursor-pointer" />
                </div>
            </div> */}

            <video ref={videoRef} width="640" height="480" autoPlay muted />
            <canvas ref={canvasRef} />
            <p>Step: {verificationStep + 1}/5</p>
            <p>{verificationMessage}</p>
            {isVerified && <p>Verification Complete!</p>}

        </div >
    );
};

export default FaceVerification;
