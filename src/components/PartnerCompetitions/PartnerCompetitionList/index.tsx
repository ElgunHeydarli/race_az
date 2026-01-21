import RaceCard from '@/components/UI/RaceCard';
import { useGetPartnerCompetitions } from '@/services/partners';
import moment from 'moment';

const PartnerCompetitionList = () => {
  const { data: partnerCompetitionsData } =
    useGetPartnerCompetitions();
  return (
    <section className="py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FFFFFF0A] backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {partnerCompetitionsData &&
              partnerCompetitionsData.competitions.map(
                (item, index) => (
                  <div key={index} className="w-full">
                    <RaceCard
                      date={moment(
                        item.registration_dates.start,
                      ).format('DD.MM.YYYY')}
                      imageAlt={item.image_alt}
                      {...item}
                      variant="partner"
                    />
                  </div>
                ),
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCompetitionList;
