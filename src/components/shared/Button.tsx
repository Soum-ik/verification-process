import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    style?: string; // Optional if you want to allow no style
    link: string; // Make this optional to support buttons with onClick only
    onClick?: () => void; // Add onClick as an optional prop
}

const Button: React.FC<ButtonProps> = ({ text, style, link, onClick }) => {
    return (
        <Link to={link} className="!w-full">
            <div
                className={` ${style} h-[38px] mt-[40px] font-semibold bg-brandColor rounded-md cursor-pointer text-white px-[14px] py-[8px] flex !w-full justify-center items-center gap-[2px] self-stretch `}
                onClick={onClick}
            >
                {text}
            </div>
        </Link>
    )
};

export default Button;
