import { useRef, useEffect, useState } from 'react'

const WebcamCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startWebcam();
    // Cleanup on component unmount
    return () => {
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    try {
      // Check if `navigator.mediaDevices` is supported
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          preferCurrentTab : true,
          video: true
        });
        console.log(stream, ' get the stram');
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setMediaStream(stream)
          ;
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

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context && videoRef.current?.videoWidth && videoRef.current?.videoHeight) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/jpeg");

        setCapturedImage(imageDataUrl);
        stopWebcam();
      }
    }
  };

  const resetState = () => {
    stopWebcam();
    setCapturedImage(null);
    startWebcam(); // Restart the webcam for a new capture
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {capturedImage ? (
        <>
          <img
            src={capturedImage}
            className="w-full rounded-lg md:h-[calc(100vh-20px)] object-cover"
            alt="Captured"
          />
          <button
            onClick={resetState}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 rounded-full py-2 px-4 text-lg shadow"
          >
            Reset
          </button>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline // Prevents fullscreen on iOS
            className="w-full rounded-lg md:h-[calc(100vh-20px)] object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          {!videoRef.current || !mediaStream ? (
            <button
              onClick={startWebcam}
              className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-full py-2 px-4 text-lg shadow"
            >
              Start Webcam
            </button>
          ) : (
            <button
              onClick={captureImage}
              className="absolute  left-1/2 transform -translate-x-1/2 bg-white text-gray-800 rounded-full py-2 px-4 text-lg shadow"
            >
              {/* Capture Image */}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WebcamCapture;