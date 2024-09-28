import Loading from '../../../public/Loader.png'

const LoadingDiv = ({ text }: { text: string }) => {
    return <div className="loadingDiv">
        <img className=' animate-spin' src={Loading} alt="" />
        <p className='loadingTextsize'>{text}</p>
    </div>;
};

export default LoadingDiv;
