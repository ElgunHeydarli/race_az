import { translateds } from '@/context/TranslateContext';
import BannerSvg from './BannerSvg';

const ApplyToVolunteering = () => {
  return (
    <section className="pt-[48px] pb-[50px] md:pb-[100px]">
      <div className="main-container">
        <div className="bg-[#0B98A1] relative overflow-hidden text-white rounded-[12px] ">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3  lg:py-[34px] py-[25px] px-[30px] lg:px-[40px]">
            <h4 className=" text-[13px] md:text-[20px] lg:text-[24px] md:max-w-[520px] text-center md:text-left">
              {translateds("konullu_olmaq_isteyirsen_text")}
            </h4>
            <button className="bg-white md:text-base text-[12px] text-[#0B98A1]  py-[10px] px-[22px] md:py-[14px] md:px-[28px] rounded-full">
              {translateds("muraciet_et")}
            </button>
          </div>
          <BannerSvg className="absolute bottom-[-20px] left-[10%] w-[50px] h-[50px] md:w-[70px] md:h-[70px] rotate-[35deg]" />
          <BannerSvg className="absolute top-[-10px] right-[60%] w-[50px] h-[50px] md:w-[70px] md:h-[70px] rotate-[5deg]" />
          {/* <BannerSvg className="absolute bottom-[-23px] left-[140px] w-[70px] h-[70px] rotate-[35deg]" /> */}
          {/* <BannerSvg className="absolute top-[0] right-[60%] w-[70px] h-[70px] rotate-[5deg]" /> */}
        </div>
      </div>
    </section>
  );
};

export default ApplyToVolunteering;
