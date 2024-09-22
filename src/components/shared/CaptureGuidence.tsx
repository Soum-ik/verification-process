import { GoDotFill } from "react-icons/go";

interface GuidenceDetails {
    title: string,
    rules: string[],
    shortDescription?: Boolean
}


const CaptureGuidence = ({ title, rules, shortDescription }: GuidenceDetails) => {
    return (
        <div className=" space-y-[16px]">
            <div>
                <h1 className="  text-headingColor text-center text-[20px] font-bold font-Inter leading-normal">{title}</h1>
                {shortDescription && <p className=" font-Inter text-[12px] font-normal leading-[16px] text-[#6F6464] text-center">It seems you have a foreign driver’s license. To continue, verify your passport.</p>}
            </div>
            <div className=" rounded-lg border-2 border-[#F6F6F6] p-[20px] space-y-[10px]">
                <h5 className="text-[#6F6464]  text-[14px] font-bold font-Inter leading-normal ">Note</h5>
                {rules.map((item, idx: any) => (
                    <h1 key={idx} className=" flex items-center space-x-[10px]"><GoDotFill className="  text-[#999]" /><span className=" font-Inter text-[12px] leading-[16px] font-normal text-headingColor"> {item}</span></h1>
                ))}
            </div>
        </div>
    );
};
export default CaptureGuidence;
