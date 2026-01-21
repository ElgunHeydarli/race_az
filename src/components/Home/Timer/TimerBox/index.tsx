import { translateds } from '@/context/TranslateContext';

interface TimerBoxProps {
  value: number;
  label: string;
}

const TimerBox = ({ value, label }: TimerBoxProps) => {
  return (
    <div className="rounded-[12px] bg-[#00000029] h-[68px] md:h-[98px] cursor-pointer w-[60px] md:w-[90px] backdrop-blur-md  text-white ">
      <div className="flex flex-col p-[12px] md:p-[24px] gap-[8px] ">
        <span className="text-[12px] md:text-[20px] font-unbounded">{value}</span>
        <span className=" text-[9px] md:text-xs">
          {label === 'Gün'
            ? translateds('gun')
            : label === 'Saat'
            ? translateds('saat')
            : label === 'Dakika'
            ? translateds('deqiqe')
            : label === 'Saniye'
            ? translateds('saniye')
            : label}
        </span>
      </div>
    </div>
  );
};

export default TimerBox;
