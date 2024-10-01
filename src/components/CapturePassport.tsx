import License from '../../public/gifs/Passport GIF.gif'
import Button from './shared/Button';
import CaptureGuidence from './shared/CaptureGuidence';

const rules = [
    "Make sure you use a clean, good quality camera.",
    "Use a color photo.",
    "Take the photo in a well lit room."
]

const Capturepassport = () => {
    return <div className="min-h-[65vh] pt-[120px] flex items-center justify-between flex-col mx-auto  p-[20px]">
        <div className='w-[183px] h-[140px] mb-[60px] overflow-hidden'>
            <img src={License} alt=""  className='-ml-[4px] w-[195px] object-fill'/>
        </div>
        <CaptureGuidence shortDescription={true} title='Capture your passport' rules={rules} />
        <Button link='/open-camera-passport' style='mt-[16px]' text='Start capturing' />
    </div>;
};


export default Capturepassport