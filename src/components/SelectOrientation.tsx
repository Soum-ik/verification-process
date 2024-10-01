import { IoCloseSharp } from 'react-icons/io5';
import image1 from '../../public/1.svg';
import image2 from '../../public/2.svg';
import useGoBack from '../Hooks/useGoBack';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SelectOrientation() {
    const goBack = useGoBack();
    const [selectedOrientation, setSelectedOrientation] = useState<string | undefined>();

    const handleSelection = (orientation: string) => {
        setSelectedOrientation(orientation);
    };

    return (
        <div className="min-h-[65vh] flex flex-col mx-auto p-[20px]">
            <div className="w-full flex items-end justify-end py-[20px]">
                <div onClick={goBack}>
                    <IoCloseSharp className="size-[24px] opacity-70 cursor-pointer" />
                </div>
            </div>

            <div className=' pt-[20px]'>
                <h1 className="text-headingColor text-center text-[20px] font-bold font-Inter leading-normal">
                    Select Orientation
                </h1>
                <p className="font-Inter text-[12px] font-normal leading-[16px] text-[#6F6464] text-center">
                    Choose your driver’s license format to proceed with verification
                </p>
            </div>

            <div className="flex items-center justify-center flex-col w-full  pt-[40px]">
                <label
                    className={`mt-[5px] w-full flex items-center justify-between px-[16px] py-[12px]  border-[2px] rounded-md  ${selectedOrientation === 'landscape' ? '   border-brandColor' : ''
                        }`}
                    onClick={() => handleSelection('landscape')}
                >
                    <div className="flex items-center">
                        <input
                            className="form-radio size-[18px] text-blue-600"
                            type="radio"
                            checked={selectedOrientation === 'landscape'}
                            onChange={() => handleSelection('landscape')}
                            required
                        />
                        <span className="ml-2 text-paraColor text-[16px] font-semibold">Landscape</span>
                    </div>
                    <img className="size-[79px]" src={image1} alt="Landscape" />
                </label>

                <label
                    className={`mt-[5px] w-full flex items-center justify-between px-[16px] py-[12px] border-[2px] rounded-md  ${selectedOrientation === 'portrait' ? ' border-blue-500' : ''
                        }`}
                    onClick={() => handleSelection('portrait')}
                >
                    <div className="flex items-center">
                        <input
                            className="form-radio size-[18px] text-blue-600"
                            type="radio"
                            checked={selectedOrientation === 'portrait'}
                            onChange={() => handleSelection('portrait')}
                            required
                        />
                        <span className="ml-2 text-paraColor  text-[16px] font-semibold">Portrait</span>
                    </div>
                    <img className="size-[79px] cursor-not-allowed" src={image2} alt="Portrait" />
                </label>

            </div>

            {/* */}

            <Link to={!selectedOrientation ? '#' : `/open-camera/${selectedOrientation}`} className="!w-full">
                <div className={` ${!selectedOrientation ? 'opacity-50' : ''} h-[38px] mt-[40px] font-semibold bg-brandColor rounded-md cursor-pointer text-white px-[14px] py-[8px] flex !w-full justify-center items-center gap-[2px] self-stretch `}>
                    Continue
                </div>
            </Link>
        </div>
    );
}

export default SelectOrientation;
