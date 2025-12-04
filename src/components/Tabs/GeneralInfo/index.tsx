import MapPoint from '@/assets/svgs/MapPoint.svg';
import Calendar from '@/assets/svgs/Calendar.svg';
import PrimaryButton from '@/components/UI/PrimaryButton';
import { useNavigate, useParams } from 'react-router';
import { useGetCompetitionDetail } from '@/services/competitions';
import moment from 'moment';
import { translateds } from '@/context/TranslateContext';
import { Distance } from '@/services/competitions/types';
import PartnersLogosCompetitions from '@/PartnersLogosCompetitions';

export interface DistanceInnerFeature {
  id: 4;
  distance: string;
  price: string;
  max_participants: number;
  current_participants: number;
  remainder_participants: number;
}

const GeneralInfo = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const { data: competitionDetailData } =
    useGetCompetitionDetail(slug || '');
  const competitionDetail = competitionDetailData
    ? competitionDetailData.data
    : null;

  const start = moment(
    competitionDetailData?.data?.registration_dates.start,
  ).format('DD.MM.YYYY');
  const end = moment(
    competitionDetailData?.data?.registration_dates.end,
  ).format('DD.MM.YYYY');

  const hasDistances =
    competitionDetailData?.data &&
    competitionDetailData?.data?.distances &&
    competitionDetailData?.data?.distances?.length > 0
      ? competitionDetailData?.data?.distances
      : [];
  console.log(competitionDetailData,'competitionDetailData')
  const registrationIsTrue =
    competitionDetail &&
    typeof competitionDetail?.registration_status ===
      'boolean' &&
    competitionDetail?.registration_status === true
      ? true
      : false;

  return (
    <>
      <section className="py-[40px]">
        <div className="main-container">
          <div className="relative w-full h-[540px] rounded-lg overflow-hidden mb-8">
            <img
              src={competitionDetail?.bottom_image}
              alt={competitionDetail?.bottom_image_alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex lg:flex-row flex-col justify-between mt-[40px] text-white gap-[48px]">
            <div className="max-w-[800px] sm:max-w-[1100px] mx-auto w-full">
              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4">
                  {translateds('race_plan')}:
                </h2>
                <div
                  className="text-[#FFFFFFCC] raceItemDesc"
                  dangerouslySetInnerHTML={{
                    __html:
                      competitionDetail?.description ?? '',
                  }}
                />
              </div>
            </div>
            <div className="w-full max-w-[430px]">
              <div className="w-full py-[28px] px-[28px] rounded-[12px] bg-[#FFFFFF0A] space-y-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-[12px] border-b border-b-[#FFFFFF14] pb-[20px]">
                    <span>
                      <img
                        className="w-[28px] h-[28px]"
                        src={Calendar}
                        alt=""
                      />
                    </span>
                    <p className="text-white">
                      <span className="text-[#FFFFFF99] mr-1">
                        {translateds('date_race')}:
                      </span>
                      {moment(
                        competitionDetail?.competition_start_date,
                      ).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px] border-b border-b-[#FFFFFF14] py-[20px]">
                    <span>
                      <img
                        className="w-[28px] h-[28px]"
                        src={MapPoint}
                        alt=""
                      />
                    </span>
                    <p className="text-white">
                      <span className="text-[#FFFFFF99] mr-1">
                        {translateds('Location')}:
                      </span>
                      {competitionDetail?.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px]  pt-[20px]">
                    <span>
                      <img
                        className="w-[28px] h-[28px]"
                        src={Calendar}
                        alt=""
                      />
                    </span>
                    <p className="text-white">
                      <span className="text-[#FFFFFF99] mr-1">
                        {translateds('Registration_dates')}:
                      </span>
                      {start} - {end}
                    </p>
                  </div>
                </div>
              </div>
              {registrationIsTrue ? (
                <PrimaryButton
                  onClick={() =>
                    navigate('/buy-ticket', {
                      state: { competitionDetail },
                    })
                  }
                  className="mt-6 sm:mt-[24px]"
                >
                  {translateds('join_race')}
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  disabled
                  className="mt-6 sm:mt-[24px] opacity-50 cursor-not-allowed"
                >
                  {translateds('registration_closed')}
                </PrimaryButton>
              )}

              {/* feature */}
              <div className="reg-list">
                <h6>
                  {translateds(
                    'mesafeler_uzre_aciq_qeydiyyat_sayi',
                  )}
                </h6>
                <div className="distances">
                  {hasDistances?.map((data: Distance) => (
                    <div
                      className="item-distance"
                      key={data.id}
                    >
                      <div className="bottom">
                        <div className="left">
                          <img src="/distance.svg" alt="" />
                          <h3>{data?.distance}</h3>
                        </div>
                        {data?.remainder_participants >
                        0 ? (
                          <h6 className="green">
                            {data?.remainder_participants}{' '}
                            {translateds('aciq_yer_title')}
                          </h6>
                        ) : (
                          <h6 className="red">
                            {translateds('yerler_doludur')}
                          </h6>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <PartnersLogosCompetitions
            competitionId={competitionDetail?.id || null}
          />
        </div>
      </section>
      <section className=" py-[100px]">
        <div className="main-container">
          <div className="flex lg:flex-row flex-col bg-[#FFFFFF0D] rounded-[12px] items-center">
            <div className="text-[#FFFFFF] ml-[48px] ">
              <h3 className="c-mp-text">
                {competitionDetail?.name}{' '}
                {translateds('map_text')}
              </h3>
            </div>
            {competitionDetail?.map_link?.startsWith(
              '<iframe',
            ) ? (
              <div className="in-map">
                <div
                  className="in-maplink"
                  dangerouslySetInnerHTML={{
                    __html:
                      competitionDetail?.map_link ?? '',
                  }}
                />
              </div>
            ) : (
              <div className="w-full p-[20px] h-[500px] lg:w-2/3 aspect-video">
                <iframe
                  className="rounded-[12px] w-full h-full"
                  src={competitionDetail?.map_link}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GeneralInfo;
