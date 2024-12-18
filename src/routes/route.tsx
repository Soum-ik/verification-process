import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Capturelicense from "../components/license/Capturelicense";
import FaceScaning from "../components/facescanning/FaceScaning";
// import Capturepassport from "../components/CapturePassport";
import ScanResult from "../components/ScanResult";
import Qa from "../components/Qa";
import FinalStatus from "../components/FinalStatus";
import OpenCamera from "../components/license/open-camera";
import SelectOrientation from "../components/SelectOrientation";
import DownloadDriver from "../components/DownloadDriver";
// import OpenPassport from "../components/OpenPassport";
import OpenCamearaFacing from "../components/facescanning/Open-Cameara-Facing";


const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* for capture license start */}
      <Route path="/capture-license" element={<Capturelicense />} />
      <Route path="/Orientation" element={<SelectOrientation />} />
      <Route path="/open-camera/:id" element={<OpenCamera />} />
      {/* for capture license end */}


      {/* for face scaning  start */}
      <Route path="/face-scaning" element={<FaceScaning />} />
      <Route path="/open-face-recogation-camera" element={<OpenCamearaFacing />} />
      {/* for face scaning  end */}


      {/* for capture passport start */}
      {/* <Route path="/capture-passport" element={<Capturepassport/>} />
      <Route path="/open-camera-passport" element={<OpenPassport />} /> */}
      {/* for capture passport end  */}


      <Route path="/scan-result" element={<ScanResult />} />
      <Route path="/quick-q&a" element={<Qa />} />
      <Route path="/final-status" element={<FinalStatus />} />
      <Route path="/Download-driver-app" element={<DownloadDriver />} />
    </Routes>
  );
};

export default Router;
