interface props {
    text: string
}
const PositionButton = ({ text }: props) => {
    return <button className=" rounded-md text-white bg-[#15151580] py-[10px] px-[12px]">
        {text}
    </button>;
};

export default PositionButton;
