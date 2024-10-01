import face from '../../../public/gifs/Face GIF.gif'

import Button from "../shared/Button";
import CaptureGuidence from "../shared/CaptureGuidence";

const FaceScaning = () => {

    const rules = [
        "Make sure you use a clean, good quality camera.",
        "Don’t wear hats, glasses or masks.",
        "Take the photo in a well lit room."
    ]

    return <div className="min-h-[65vh] pt-[90px] flex items-center justify-between flex-col mx-auto p-[20px]">
        <div className='w-[183px] h-[140px] mb-[60px] overflow-hidden'>
            <img src={face} alt="" className='-ml-[2px] w-[195px] object-fill' />
        </div>
        <CaptureGuidence title='Scan your face' rules={rules} />
        <Button link='/open-face-recogation-camera' style='mt-[16px]' text='Start scanning' />
    </div>;
};

export default FaceScaning;
