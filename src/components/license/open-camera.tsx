import { useState } from "react";
import useGoBack from '../../Hooks/useGoBack';
import { IoCloseSharp } from "react-icons/io5";
import WebcamCapture from "../webCamp";
import CaptureButton from "../shared/CaptureButton";
// import { useParams } from 'react-router-dom'

const OpenCamera = () => {
    // const { id } = useParams()
    const goBack = useGoBack();
    
    const [currentPage] = useState<Number>(1);
    let currentSide = currentPage === 1 ? 'Front side' : 'Back side';

    return (
        <div className=" relative w-[360px] font-Inter min-h-[65vh] pt-[20px] flex items-center justify-between flex-col mx-auto">
            <div className="w-full  flex items-center justify-between  ">
                <div className=" flex flex-col">
                    {`${currentPage} / 2`}
                    <p className=" font-Inter text-[18px] font-semibold leading-normal">{currentSide}</p>
                </div>
                <div onClick={goBack}>
                    <IoCloseSharp className="size-[24px] opacity-70" />
                </div>
            </div>
            <WebcamCapture />
            <CaptureButton />
        </div>
    )
};

export default OpenCamera;
