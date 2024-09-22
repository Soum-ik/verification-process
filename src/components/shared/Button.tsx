import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    style?: string; // Optional if you want to allow no style
    link: string
}

const Button: React.FC<ButtonProps> = ({ text, style, link }) => {
    return (
        <Link to={link} className="!w-full">
            <div className={`h-[38px] mt-[40px] font-semibold bg-brandColor rounded-md cursor-pointer text-white px-[14px] py-[8px] flex !w-full justify-center items-center gap-[2px] self-stretch ${style}`}>
                {text}
            </div>
        </Link>
    );
};

export default Button;
