import { IoCloseSharp } from "react-icons/io5";
import image1 from "../../public/1.svg";
import image2 from "../../public/2.svg";
import useGoBack from "../Hooks/useGoBack";
import { useState } from "react";
import { Link } from "react-router-dom";

function SelectOrientation() {
  const goBack = useGoBack();
  const [selectedOrientation, setSelectedOrientation] = useState<
    string | undefined
  >();

  const handleSelection = (orientation: string) => {
    setSelectedOrientation(orientation);
  };

  return (
    <div className="mx-auto flex min-h-[65vh] flex-col p-[20px]">
      <div className="flex w-full items-end justify-end py-[20px]">
        <div onClick={goBack}>
          <IoCloseSharp className="size-[24px] cursor-pointer opacity-70" />
        </div>
      </div>

      <div className="pt-[20px]">
        <h1 className="text-center font-Inter text-[20px] font-bold leading-normal text-headingColor">
          Select Orientation
        </h1>
        <p className="text-center font-Inter text-[12px] font-normal leading-[16px] text-[#6F6464]">
          Choose your driver’s license format to proceed with verification
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center pt-[40px]">
        <label
          className={`mt-[5px] flex w-full items-center justify-between rounded-md border-[1px] px-[16px] py-[12px] ${selectedOrientation === "landscape" ? "border-brandColor" : ""
            }`}
          onClick={() => handleSelection("landscape")}
        >
          <div className="flex items-center">
            <input
              className="form-radio size-[18px] text-blue-600"
              type="radio"
              checked={selectedOrientation === "landscape"}
              onChange={() => handleSelection("landscape")}
              required
            />
            <span className={`ml-2 text-[16px] font-semibold   ${selectedOrientation === "landscape" ? "text-headingColor" : "text-paraColor"
              } `}>
              Landscape
            </span>
          </div>
          <img className="size-[79px]" src={image1} alt="Landscape" />
        </label>

        <label
          className={`mt-[5px] flex w-full items-center justify-between rounded-md border-[1px] px-[16px] py-[12px] ${selectedOrientation === "portrait" ? "border-brandColor" : ""
            }`}
          onClick={() => handleSelection("portrait")}
        >
          <div className="flex items-center">
            <input
              className="form-radio size-[18px] text-brandColor"
              type="radio"
              checked={selectedOrientation === "portrait"}
              onChange={() => handleSelection("portrait")}
              required
            />
            <span className={`ml-2 text-[16px] font-semibold   ${selectedOrientation === "portrait" ? "text-headingColor" : "text-paraColor"
              } `}>
              Portrait
            </span>
          </div>
          <img
            className="size-[79px] cursor-not-allowed"
            src={image2}
            alt="Portrait"
          />
        </label>
      </div>

      {/* */}

      <Link
        to={!selectedOrientation ? "#" : `/open-camera/${selectedOrientation}`}
        className="!w-full"
      >
        <div
          className={` ${!selectedOrientation ? "opacity-50" : ""} mt-[40px] flex h-[38px] !w-full cursor-pointer items-center justify-center gap-[2px] self-stretch rounded-md bg-brandColor px-[14px] py-[8px] font-semibold text-white`}
        >
          Continue
        </div>
      </Link>
    </div>
  );
}

export default SelectOrientation;
