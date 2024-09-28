import pass from '../../public/status-pass.svg'
import fail from '../../public/status-fail.svg'

import passAction from '../../public/pass.svg'
import failAction from '../../public/fail.svg'




import H1 from './shared/H1';
import { ReactNode } from 'react';
// import { Key } from 'react';
const FinalStatus = () => {
    const status = false
    const statusData = [
        {
            title: 'Face',
            status: true,
        },
        {
            title: 'Age',
            details: [{ "Minimum-age": 24 }, { "Driver's-age": 22 }],
            status: true,
        },
        {
            title: 'Driver’s license',
            details: [{ "Exp. date": '12 Jan 2024' }, { "Days left": "67 days" }],
            status: true,
        },
        {
            title: 'Compatibility',
            details: [{ "Required to pass": "50%" }, { "Earned score": "40%" }],
            status: false,
        },
    ];

    return <div className="min-h-[65vh] pt-[60px] flex items-center justify-between flex-col mx-auto ">
        <div className=''>
            {status ? <div className=' space-y-[10px] flex items-center justify-center flex-col'>
                <img src={pass} alt="status pass" />
                <H1>Verified!</H1>
                <p className=' font-Inter leading-[18px] text-paraColor text-center text-[14px]'>Driver’s license verified! Stay tuned for subscription confirmation from the admin.</p>
            </div> : <div className=' space-y-[10px] flex items-center justify-center flex-col'>
                <img src={fail} alt="status fail" />
                <H1>Not compatible!</H1>
                <p className='  font-Inter leading-[18px] font-normal text-paraColor text-center text-[14px]'>Sorry! Based on verification and provided answers we cannot continue with you. Contact for more.</p>
            </div>}
        </div>

        <div className=' mt-[32px] w-[360px]'>
            {statusData.map((item, index) => (
                <StatusCard
                    key={index}
                    title={item.title}
                    details={item.details}
                    status={item.status}
                />
            ))}
        </div>
    </div>;
};

export default FinalStatus;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatusCard = ({ title, details, status }: any) => {
    return (
        <div
            className="mt-[5px] w- flex items-center justify-between w-full px-[16px] py-[12px] border-2 rounded-md border-borderColor"

        >
            <div>
                <h3 className="font-Inter text-headingColor    font-bold text-[14px]  leading-normal">{title}</h3>
                {details && (
                    <div className="mt-1 text-sm text-gray-500">
                        {details.map((detail: any, index: number) => (
                            <div key={index} className="flex">
                                {Object.entries(detail).map(([key, value]) => (
                                    <div key={key} className=''>
                                        <span className=' text-[10px] text-[#999999] font-medium'>{key}: </span><span className='text-[10px] text-headingColor  font-semibold'>{value as ReactNode}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="">
                {status ? (
                    <img src={passAction} alt="" />
                ) : (
                    <img src={failAction} alt="" />
                )}
            </div>
        </div>
    );
};
