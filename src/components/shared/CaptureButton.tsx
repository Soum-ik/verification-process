import React from "react";

type CaptureButtonProps = {
  onClick: () => void;
};

const CaptureButton: React.FC<CaptureButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative z-[10] border-style"
    >
      <div className="absolute left-1/2 top-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
    </button>
  );
};

export default CaptureButton;
