import License from '../../../public/gifs/License GIF.gif'
import Button from '../shared/Button';
import CaptureGuidence from '../shared/CaptureGuidence';
import licence from '../../../public/licence.mp4'

const rules = [
    "Make sure you use a clean, good quality camera.",
    "Use a color photo.",
    "Take the photo in a well lit room."
]

const Capturelicense = () => {
    return <div className="min-h-[65vh] pt-[90px] flex items-center justify-between flex-col mx-auto p-[20px]">
        <div className='w-[183px] h-[140px] overflow-hidden  mb-[60px]'>
            <img className='w-[195px] object-fill' src={License} alt="" />
        </div>
        <CaptureGuidence title='Capture your license' rules={rules} />
        <Button link='/Orientation' style='mt-[16px]' text='Start capturing' />
    </div>;
};


export default Capturelicense