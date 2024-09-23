import image1 from '../../public/Rectangle 34624312.png'
import image2 from '../../public/Rectangle 34624327.png'
import image3 from '../../public/Rectangle 34624328.png'
import image4 from '../../public/Rectangle 34624329.png'
import Button from './shared/Button'

function ScanResult() {

    const images = [image1, image2, image3, image4]

    const licenseInfo = {
        "Name": "Danish Ali",
        "Gender": "Male",
        "Date of birth": "DD MMM YYYY",
        "Address": "Street, City, State/Province",
        "License number": "XXXXXXXXXXX",
        "Class": "XX",
        "Expiration date": "DD MMM YYYY",
        "Issuing state": "State/Province"
    };


    return <div className="min-h-[65vh] pt-[50px] flex  items-center  justify-center  flex-col mx-auto mb-[20px]">
        <h1 className=" font-Inter text-headingColor  pb-[10px] font-bold text-[24px] text-center leading-[30px]">Scan Result</h1>
        <div className=" w-[355px] pt-[32px]">
            <h4 className=" text-[#6F6464]  text-[14px] font-bold font-Inter leading-normal">Driver’s license</h4>
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
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Date of birth:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["Date of birth"]}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Address:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo.Address}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">License number:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["License number"]}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Class:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo.Class}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Expiration date:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["Expiration date"]}</h1>
                </div>
                <div className="grid grid-cols-[140px_auto] flex-grow-0 ">
                    <h1 className="  border flex-grow-0  text-[#6F6464]  text-[12px] font-normal font-Inter flex   leading-[16px] p-[12px]">Issuing state:</h1>
                    <h1 className="font-Inter flex-grow-1  text-headingColor border  font-semibold   text-[12px]  leading-normal  p-[12px]">{licenseInfo["Issuing state"]}</h1>
                </div>
            </div>
        </div>
        <div className=" w-[355px] pt-[32px]">
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
        </div>
        <div className=" w-[355px] pt-[32px] grid grid-cols-3 gap-[10px]">
            {images.map((image, idx) => (
                <div key={idx}>  <img src={image} alt="" /></div>
            ))}
        </div>
        <Button link='/quick-q&a' text='Next' />
    </div>;

}

export default ScanResult;
