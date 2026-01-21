// import { translateds } from '@/context/TranslateContext';
import { useGetPartners } from '@/services/partners';
import { Partner } from '@/services/partners/types';
import React from 'react';

interface Props {
  customStyle?: React.CSSProperties;
}

const PartnersLogos: React.FC<Props> = ({ customStyle }) => {
  const { data } = useGetPartners();

  return (
    <div style={customStyle} className="bg-[#FFFFFF0D] mt-5 rounded-[12px] p-[20px] lg:p-[40px]">
      {/* <h2 className="pb-5 text-white align-center flex justify-center mb-4 sm:mb-5 lg:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
        {translateds("terefdashlar")}
      </h2> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data &&
          data.data.map((item: Partner) => (
            <div
              onClick={() => {
                window.open(item?.url || '', '_blank');
              }}
              key={item.id}
              className="flex cursor-pointer justify-center md:max-w-[158px] md:h-[106px] items-center bg-white rounded-[12px]"
            >
              <img
                src={item.image}
                alt={item.image_alt}
                className="w-full h-[106px] rounded-[12px] object-contain"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PartnersLogos;
