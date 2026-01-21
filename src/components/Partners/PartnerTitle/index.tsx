import { useFetch } from '@/utils/reactQuery';
import PartnersLogos from '../PartnersLogos';
import { BaseResponseType } from '@/types';

type PartnerBanner = {
  title: string;
  image: string;
  description: string;
};

const PartnerTitle = () => {
  const { data: partnerData } =
    useFetch<BaseResponseType<PartnerBanner[]>>('/partner-banners');
  const partnerBanner = partnerData && partnerData.data[0];
  return (
    <section>
      <div className="main-container">
        <div className="flex flex-col gap-[20px] mt-[40px] text-white">
          <h2 className="text-[20px] md:text-[24px] lg:text-[40px]">
            {partnerBanner?.title}
          </h2>
          <p
            className=" text-[12px] md:text-[14px] text-[#FFFFFFCC]"
            dangerouslySetInnerHTML={{
              __html: partnerBanner?.description || '',
            }}
          />
        </div>
        <div className="py-[48px]">
          <PartnersLogos />
        </div>
      </div>
    </section>
  );
};

export default PartnerTitle;
