import H1 from "./shared/H1";
import fleetboxbanner from '../../public/download-image.png'

const DownloadDriver = () => {
    return <div className="   min-h-[65vh] pt-[80px] flex items-center justify-between flex-col mx-auto  ">
        <div className="flex items-center justify-center flex-col  w-[360px] p-[20px] ">
            <H1>Download the Driver’s App</H1>
            <p className="  pt-[10px] text-paraColor text-center font-Inter leading-[18px] text-[14px] ">Your contract is active! Check your email to download the Driver’s app, log in, and await your car’s handover. Use the app to drive and manage your contracts.</p>
        </div>
        <div className=" relative flex items-center justify-center  h-[394px] w-[390px] xxs:w-[450px] xxxs:h-[420px]  overflow-hidden ">
            <img src={fleetboxbanner} alt="" className=" absolute left-[80px] xxs:left-[98px]  w-[88%] h-auto object-cover " />
        </div>
    </div>;
};

export default DownloadDriver;
