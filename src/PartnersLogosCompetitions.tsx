import axios from 'axios';
import React from 'react';
import { useChangeLang } from './hooks/useChangeLang';
import { translateds } from './context/TranslateContext';

interface Props {
  customStyle?: React.CSSProperties;
  competitionId: number | null;
}

interface PartnersTypeCompetition {
  id: number;
  name: string;
  image: string;
  image_alt: string;
  url: string;
}

const PartnersLogosCompetitions: React.FC<Props> = ({
  customStyle,
  competitionId,
}) => {
  const { lang } = useChangeLang();
  const [data, setPartnData] = React.useState<PartnersTypeCompetition[]>([]);

  React.useEffect(() => {
    if (!competitionId) return;
    const controller = new AbortController();

    const fetchPartnersForCompetition = async () => {
      try {
        const res = await axios.get(
          `https://admin.race.az/api/competitions/${competitionId}/partners`,
          {
            headers: { 'Accept-Language': lang },
            signal: controller.signal,
          },
        );
        if (res.data?.partners && Array.isArray(res.data.partners)) {
          setPartnData(res.data.partners);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error);
      }
    };

    fetchPartnersForCompetition();

    return () => controller.abort();
  }, [competitionId, lang]);

  return (
    <div
      style={{
        ...customStyle,
        display: data && data?.length > 0 ? '' : 'none',
      }}
      className="bg-[#FFFFFF0D] mt-5 rounded-[12px] p-[20px] lg:p-[40px]"
    >
      <h2 className="pb-5 text-white align-center flex justify-center mb-4 sm:mb-5 lg:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
        {translateds('terefdashlar')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data && data?.length > 0
          ? data?.map((item: PartnersTypeCompetition) => (
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
            ))
          : null}
      </div>
    </div>
  );
};

export default PartnersLogosCompetitions;
