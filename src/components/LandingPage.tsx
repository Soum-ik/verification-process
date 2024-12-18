import Icon from '../../public/Frame 1707478847.svg'
import Logo from '../../public/logo.png'
import Button from './shared/Button';

function LandingPage() {

  return <div className="h-[90vh] pb-[20px]   flex items-center justify-between flex-col mx-auto">
    <div className=" mx-auto  flex items-center justify-center flex-col pt-[120px] ">
      <img src={Icon} alt="profile icon" className=' pb-[20px]' />
      <h1 className=" font-Inter text-headingColor  pb-[10px] font-bold text-[24px] text-center leading-[30px]">Complete <br />
        Driver verification process</h1>
      <p className=" text-center font-Inter text-[#6F6464] text-[14px] font-normal">It only takes <span className=' font-semibold'>5 minutes</span> ⏱ to complete!</p>
      <Button link='/capture-license' style='' text='Start process' />
    </div>
    <div className='flex items-center justify-center gap-[5px]'>
      <h1 className=' text-[#151515] font-Inter  leading-[16px]'>Powered by</h1> <img src={Logo} alt="" />
    </div>
  </div>;
}

export default LandingPage;
