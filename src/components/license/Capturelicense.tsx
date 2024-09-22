import License from '../../../public/gifs/License GIF.gif'
import Button from '../shared/Button';
import CaptureGuidence from '../shared/CaptureGuidence';

const rules = [
    "Make sure you use a clean, good quality camera.",
    "Use a color photo.",
    "Take the photo in a well lit room."
]

const Capturelicense = () => {
    return <div className="min-h-[65vh] pt-[120px] flex items-center justify-between flex-col mx-auto ">
        <div className='w-[183px] h-[140px] mb-[60px]'>
            <img src={License} alt="" />
        </div>
        <CaptureGuidence title='Capture your license' rules={rules} />
        <Button link='/Orientation' style='mt-[16px]'  text='Start capturing'/>
    </div>;
};


export default Capturelicense