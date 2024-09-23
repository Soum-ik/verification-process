import { useEffect, useState } from "react";
// import useGoBack from "../../Hooks/useGoBack";
import { IoCloseSharp } from "react-icons/io5";
import CaptureButton from "../shared/CaptureButton";
import { useNavigate, useParams } from "react-router-dom";
import { useWebcamCapture } from "../../Hooks/useWebCamp";

const OpenCamera = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { canvasRef, videoRef, captureCenterArea, frontImage, backImage, resetAllImages, resetBackImage, resetFrontImage, startWebcam } = useWebcamCapture(id);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const currentSide = currentPage === 1 ? "Front side" : "Back side";
  const [inReviewMode, setinReviewMode] = useState<boolean>(false);


  function goBack() {
    if (currentPage === 1) {
      resetFrontImage()
      resetAllImages()
      return navigate(-1);
    } else {
      resetBackImage()
      setinReviewMode(true)
      return setCurrentPage(1)
    }
  }


  function nextForBackSideImageCapture() {
    setCurrentPage(2)
    startWebcam()
  }

  console.log(frontImage, "frontimage");
  console.log(backImage, "backimage")


  // reset the image to take image again
  function restImage() {
    if (currentPage === 1) {
      setinReviewMode(false)
      resetFrontImage()
    } else {
      setinReviewMode(false)
      resetBackImage()
    }
  }

  useEffect(() => {
    if (frontImage !== null) {
      setinReviewMode(true);
    }
  }, [frontImage]);

  useEffect(() => {
    if (backImage !== null) {
      setinReviewMode(true);
    }
  }, [backImage]);




  useEffect(() => {
    if (currentPage === 2) {
      setinReviewMode(false)
    }
  }, [currentPage]);



  return (
    <div className="relative w-[360px] mx-auto flex min-h-screen  flex-col items-center justify-between  pt-[20px] font-Inter">
      {/* for heading */}
      <div className="absolute top-0 z-50 flex w-full items-center justify-between p-[20px]">
        <div className="flex flex-col">
          {`${currentPage} / 2`}
          <p className="font-Inter text-[18px] font-semibold leading-normal">
            {currentSide}
          </p>
        </div>
        <div onClick={goBack}>
          <IoCloseSharp className="size-[24px] opacity-70" />
        </div>
      </div>


      {!inReviewMode ? <>
        <div className="absolute top-0 h-full w-full overflow-hidden">
          <canvas ref={canvasRef} className="hidden" />
          <div
            className={` ${id === "landscape" ? "h-[200px] w-[335px]" : "h-[402px] w-[240px]"} absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-lg border-2 shadow-lg`}
          >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute  top-0 z-30 h-full w-full object-cover"
          />
          </div>
        </div>

        <div className="absolute bottom-[110px]  w-full flex items-center justify-between ">
          <button className=" cursor-default z-50 mx-[20px] w-full rounded-md bg-[rgba(21,21,21,0.50)] px-[12px] py-[10px] text-center font-Inter text-[14px] font-medium leading-[18px] text-[#fff]">
            Position your ID within the box
          </button>
        </div>

        <div className=" z-[40]  absolute bottom-[40px]">
          <CaptureButton onClick={captureCenterArea} />
        </div>
      </> : <>
        <div className="  absolute top-0 w-full h-full  object-cover flex items-center justify-center flex-col">
          {currentPage === 1 && frontImage && (
            <img className="rounded-lg" src={frontImage} alt="Front" />
          )}
          {currentPage === 2 && backImage && (
            <img className="rounded-lg" src={backImage} alt="Back" />
          )}

          <div className=" mt-[40px] space-x-[10px] w-full flex items-center justify-center mx-auto">
            <button onClick={() => restImage()} className=" text-[#999]  text-[14px] font-semibold w-full px-[14px] py-[8px]"> Retake</button>
            <button onClick={() => nextForBackSideImageCapture()} className=" w-full rounded-md px-[14px]  py-[8px]  bg-brandColor text-white font-semibold text-[14px] font-Inter">Next</button>
          </div>
        </div>
      </>}



    </div>
  );
};

export default OpenCamera;
