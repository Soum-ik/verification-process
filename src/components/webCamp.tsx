


import { useRef, useEffect, useState } from 'react';


const WebcamCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  // const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startWebcam();
    return () => {
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          preferCurrentTab: true,
          video: {
            facingMode: { ideal: "environment" }
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setMediaStream(stream);
      } else {
        console.error("Webcam not supported in this browser.");
      }
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  // const captureImage = () => {
  //   if (canvasRef.current && videoRef.current) {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");

  //     if (context && videoRef.current?.videoWidth && videoRef.current?.videoHeight) {
  //       canvas.width = videoRef.current.videoWidth;
  //       canvas.height = videoRef.current.videoHeight;

  //       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  //       const imageDataUrl = canvas.toDataURL("image/jpeg");

  //       setCapturedImage(imageDataUrl);
  //       stopWebcam();
  //     }
  //   }
  // };

  // const resetState = () => {
  //   stopWebcam();
  //   setCapturedImage(null);
  //   startWebcam();
  // };

  return (
    <div className=" relative  top-0 h-screen w-screen  overflow-hidden">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 bg-[#D9D9D9] w-full h-full object-cover z-0"
      />

      {/* Clear center area */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-64 h-64 border-4 border-white rounded-lg shadow-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default WebcamCapture;