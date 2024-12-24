import Button from './shared/Button'

function ScanResult() {
    const images = [localStorage.getItem('backImage'), localStorage.getItem('frontImage')]

    interface ResponseData {
        Date_Error?: string;
        session_id?: string;
        driving_license_url?: string;
        [key: string]: string | undefined;
    }
    const { Date_Error, driving_license_url, session_id, ...responses }: ResponseData = JSON.parse(localStorage.getItem('response1') || '{}')

    console.log(Date_Error, driving_license_url, session_id);



    return <div className="min-h-[65vh] pt-[50px] flex  items-center  justify-center  flex-col mx-auto mb-[20px]">
        <h1 className=" font-Inter text-headingColor  pb-[10px] font-bold text-[24px] text-center leading-[30px]">Scan Result</h1>
        <div className=" flex-wrap w-[355px] pt-[32px]">
            <h4 className=" text-[#6F6464]  text-[14px] font-bold font-Inter leading-normal">Driver’s license</h4>
            <div className="flex-wrap  pt-[10px]">

                {
                    Object.keys(responses).map((key, idx) => (
                        <div key={idx} className="flex-wrap grid grid-cols-[140px_auto] flex-grow-0 ">
                            <h1 className="border flex-grow-0 text-[#6F6464] text-[12px] font-normal font-Inter flex leading-[16px] p-[12px]">{key}:</h1>
                            <h1 className=" flex-wrap  font-Inter flex-grow-1 text-headingColor border font-semibold text-[12px] leading-normal p-[12px]">{responses[key]}</h1>
                        </div>
                    ))
                }


            </div>
        </div>
        {/* <div className=" hidden w-[355px] pt-[32px]">
            <h4 className=" text-[#6F6464]  text-[14px] font-bold font-Inter leading-normal">Passport</h4>
            <div className="  pt-[10px]">
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Name:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo.Name}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Gender:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo.Gender}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Nationality:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["Date of birth"]}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Date of birth:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["Date of birth"]}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Address:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo.Address}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Passport number:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["License number"]}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Expiration date:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo.Class}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Type:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["Expiration date"]}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Issuing state:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["Issuing state"]}</h1>
                </div>
            </div>
        </div> */}
        <div className=" w-[355px] pt-[32px] grid grid-cols-3 gap-[10px]">
            {images.map((image, idx) => (
                <div key={idx}>  {image && <img src={image} alt="" />}</div>
            ))}
        </div>
        <Button link='/quick-q&a' text='Next' />
    </div>;

}

export default ScanResult;
