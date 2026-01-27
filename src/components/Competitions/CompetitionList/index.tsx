import RaceCard from '@/components/UI/RaceCard';
import { useGetCompetitions } from '@/services/competitions';

const CompetitionList = () => {
  const { data } = useGetCompetitions();
  // Yalnız is_race_az_event = true olan yarışlar göstərilir
  const competitionsData = data?.data?.filter((item) => item.is_race_az_event === true);
  return (
    <section className="bg-[#FFFFFF0A] mb-[70px] mx-[20px] rounded-[12px]">
      <div className=" px-[40px] py-[20px] lg:px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:py-[60px] gap-[24px]">
          {competitionsData &&
            competitionsData.map((item) => (
              <div key={item.id} className="bg-[#FFFFFF0A] rounded-[16px] p-4 md:bg-transparent md:p-0">
                <RaceCard
                  date={item.competition_start_date}
                  location={item.location}
                  id={item.id}
                  name={item.name}
                  slug={item.slug}
                  text={item.text}
                  image={item.image}
                  imageAlt={item.image_alt}
                  registration_status={item.registration_status}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionList;
