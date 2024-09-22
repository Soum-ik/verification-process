import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Capturelicense from "../components/license/Capturelicense";
import FaceScaning from "../components/FaceScaning";
import Capturepassport from "../components/CapturePassport";
import ScanResult from "../components/ScanResult";
import Qa from "../components/Qa";
import FinalStatus from "../components/FinalStatus";
import OpenCamera from "../components/license/open-camera";
import SelectOrientation from "../components/SelectOrientation";


const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />


      {/* for capture license start */}

      <Route path="/capture-license" element={<Capturelicense />} />
      <Route path="/Orientation" element={<SelectOrientation />} />
      <Route path="/open-camera/:id" element={<OpenCamera />} />

      {/* for capture license end */}
      <Route path="/face-scaning" element={<FaceScaning />} />


      <Route path="/capture-passport" element={<Capturepassport />} />
      <Route path="/scan-result" element={<ScanResult />} />
      <Route path="/quick-q&a" element={<Qa />} />
      <Route path="/final-status" element={<FinalStatus />} />
    </Routes>
  );
};

export default Router;
