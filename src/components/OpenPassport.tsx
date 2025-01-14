import useGoBack from "../Hooks/useGoBack";
import { IoCloseSharp } from 'react-icons/io5';
import CaptureButton from "./shared/CaptureButton";
import { useWebcamCapture } from "../Hooks/useWebPass";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OpenPassport = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();
  const { canvasRef, videoRef, captureCenterArea, image, resetImages, startWebcam, } = useWebcamCapture()
  const [inReviewMode, setinReviewMode] = useState<boolean>(false);


  function nextForBackSideImageCapture() {
    navigate('/scan-result')
  }

  // reset the image to take image again
  function restImage() {
    startWebcam()
    resetImages()
    setinReviewMode(false);
  }


  useEffect(() => {
    if (image) {
      setinReviewMode(true);
    }
  }, [image]);



  return <div className="relative w-full mx-auto flex h-[900px]  flex-col items-center justify-between  p-[20px] font-Inter">
    {/* for heading */}
    <div className="absolute top-0  z-[399] flex w-[360px] items-center justify-end  py-[20px]">
      <div onClick={goBack}>
        <IoCloseSharp className="size-[24px] opacity-70" />
      </div>
    </div>

    {!inReviewMode ? <>

      <div className="absolute   top-0 h-full w-full overflow-hidden">
        <canvas ref={canvasRef} className="hidden" />
        <div
          className={` passport-capture z-50  pt-[20px]  absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-2/3  transform overflow-hidden rounded-lg  shadow-lg`}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute top-0 z-[10] h-full w-full object-cover"
          />
        </div>
      </div>
      {/* <div  className=" passport-capture absolute top-1/2 left-1/2  z-[104] transform -translate-x-1/2 -translate-y-3/4 clear-area rounded-md" /> */}

      <div className="absolute bottom-[180px] z-[104]  w-[360px]">
        <button className=" cursor-default z-[104] w-full  rounded-md bg-[rgba(21,21,21,0.50)] px-[12px] py-[10px] text-center font-Inter text-[14px] font-medium leading-[18px] text-[#fff]">
          Position your passport within the box
        </button>
      </div>

      <div className=" z-[200]  absolute bottom-[100px]">
        <CaptureButton onClick={captureCenterArea} />
      </div>


    </> : <>
      <div className="  absolute top-0 w-full h-full  object-cover flex items-center justify-center flex-col">
        {image && (
          <img className="rounded-lg passport-capture object-cover" src={image} alt="Front" />
        )}
        <div className=" z-[104] mt-[40px]  space-x-[10px]  flex items-center justify-center mx-auto w-[360px]">
          <button onClick={() => restImage()} className=" text-[#999]  text-[14px] font-semibold w-full px-[14px] py-[8px]"> Retake</button>
          <button onClick={() => nextForBackSideImageCapture()} className=" w-full rounded-md px-[14px]  py-[8px]  bg-brandColor text-white font-semibold text-[14px] font-Inter">Next</button>
        </div>
      </div>
    </>}

  </div>;
};

export default OpenPassport;
