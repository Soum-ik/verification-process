
import Router from "./routes/route";
import { Toaster } from 'react-hot-toast'
const App: React.FC = () => {
  
  return (
    <div className="flex">
      <Router />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
