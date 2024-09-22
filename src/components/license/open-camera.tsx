import { useState } from "react";
import useGoBack from '../../Hooks/useGoBack';
import { IoCloseSharp } from "react-icons/io5";
import CaptureButton from "../shared/CaptureButton";
import { useParams } from 'react-router-dom'
import { useWebcamCapture } from "../../Hooks/useWebCamp";

const OpenCamera = () => {
    const { id } = useParams()

    console.log(id);


    const goBack = useGoBack();
    const { canvasRef, captureImage, capturedImage, resetState, videoRef } = useWebcamCapture()

    const [image, setimage] = useState('');


    const captureCenterArea = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const context = canvas.getContext("2d");
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            let captureWidth
            let captureHeight

            if (id === 'landscape') {
                console.log('landscape');

                captureWidth = 335;
                captureHeight = 200;
            } else {
                console.log('portrait');

                captureWidth = 240;
                captureHeight = 402;
            }

            const startX = (videoWidth - captureWidth) / 2;
            const startY = (videoHeight - captureHeight) / 2;

            // Set canvas size and draw the image from the video
            canvas.width = captureWidth;
            canvas.height = captureHeight;
            if (context) {
                context.drawImage(video, startX, startY, captureWidth, captureHeight, 0, 0, captureWidth, captureHeight);
                const imageDataUrl = canvas.toDataURL("image/png");
                setimage(imageDataUrl)
                console.log("Captured Image URL:", imageDataUrl);
            }

        }
    };

    const [currentPage] = useState<Number>(1);
    let currentSide = currentPage === 1 ? 'Front side' : 'Back side';


    return (
        <div className="  relative w-full font-Inter min-h-screen pt-[20px] flex items-center justify-between flex-col mx-auto">
            <div className="p-[20px] w-full  flex items-center justify-between  ">
                <div className=" flex flex-col">
                    {`${currentPage} / 2`}
                    <p className=" font-Inter text-[18px] font-semibold leading-normal">{currentSide}</p>
                </div>
                <div onClick={goBack}>
                    <IoCloseSharp className="size-[24px] opacity-70" />
                </div>
            </div>
            <div className="absolute top-0    w-full overflow-hidden">

                <div
                    className={`absolute inset-0 bg-[#D9D9D9] opacity-90 z-10`}
                    style={{
                        clipPath: `path('M 0 0 H ${window.innerWidth} V ${window.innerHeight} H 0 V 0 M 50% 50% m -${id === 'landscape' ? 167.5 : 120}px -${id === 'landscape' ? 100 : 201}px h ${id === 'landscape' ? 335 : 240}px v ${id === 'landscape' ? 200 : 402}px h -${id === 'landscape' ? 335 : 240}px Z')`
                    }}
                ></div>

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Clear center area
                // <div className={` ${id === 'landscape' ? 'w-[335px]  h-[200px]' : 'w-[240px]  h-[402px]'}   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  rounded-lg shadow-lg overflow-hidden `}>
                //     This div allows capturing the central area
                // </div> */}

                {/* Clear center area */}
                <div
                    className={` ${id === 'landscape' ? 'w-[335px]  h-[200px]' : 'w-[240px]  h-[402px]'
                        } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg shadow-lg overflow-hidden`}
                >
                </div>

                <canvas ref={canvasRef} className="hidden" />



                {/* Reset Button */}
                {capturedImage && (
                    <button
                        onClick={resetState}
                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 p-2 bg-white text-black rounded"
                    >
                        Reset
                    </button>
                )}
            </div>


            <img src={image} alt="" />
            <CaptureButton onClick={captureCenterArea} />
        </div>
    )
};

export default OpenCamera;
