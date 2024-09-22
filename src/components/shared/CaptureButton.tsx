import React from 'react';

type CaptureButtonProps = {
    onClick: () => void;
};


const CaptureButton: React.FC<CaptureButtonProps> = ({ onClick }) => {
    return <button onClick={onClick} className=" cursor-pointer relative  size-[50px] bg-[#FF0000] shadow-md shadow-[#6e3838]  rounded-full z-[10] border-2 border-white">
        <div className=" transform rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white size-[14px] "></div>
    </button>;
};

export default CaptureButton;
