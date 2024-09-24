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
    </button>
  );
};

export default CaptureButton;
