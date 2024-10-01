import { ReactNode } from 'react';

interface VidoeProps {
    children: ReactNode;
    progress: number
}

const CircularProgressBar = ({ children, progress }: VidoeProps) => {


    return (
        <div className=" flex flex-col items-center   justify-center w-full h-full">
            {/* SVG Circle */}
            <div className=' relative'>
                <svg className=" size-[100px] lg:size-[150px]    transform rotate-180" viewBox="0 0 36 36">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#3534C0', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#06FFDF', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path
                        className="text-gray-200 z-20"
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3"
                    ></path>
                    <path
                        className="stroke-[url(#gradient)] z-20"
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="2"
                        strokeDasharray={`${progress}, 100`} // Dynamic stroke-dasharray
                    >

                    </path>
                </svg>
                {children}
            </div>

        </div>
    );
};

export default CircularProgressBar;