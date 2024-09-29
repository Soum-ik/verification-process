import H1 from "./shared/H1";
import fleetboxbanner from '../../public/Midnight 1.png'

const DownloadDriver = () => {
    return <div className=" relative min-h-[65vh] pt-[80px] flex items-center justify-between flex-col mx-auto p-[20px]  w-[360px]">
        <div className="flex items-center justify-center flex-col">
            <H1>Download the Driver’s App</H1>
            <p className="  pt-[10px] text-paraColor text-center font-Inter leading-[18px] text-[14px] ">Your contract is active! Check your email to download the Driver’s app, log in, and await your car’s handover. Use the app to drive and manage your contracts.</p>
            <img src={fleetboxbanner} alt="" className="mix-blend-luminosity absolute right-0 top-[200px] mt-[40px]" />
        </div>
    </div>;
};

export default DownloadDriver;
