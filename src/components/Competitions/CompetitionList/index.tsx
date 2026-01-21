import RaceCard from '@/components/UI/RaceCard';
import { useGetCompetitions } from '@/services/competitions';

const CompetitionList = () => {
  const { data } = useGetCompetitions();
  const competitionsData = data && data.data;
  return (
    <section className="bg-[#FFFFFF0A] mb-[70px] mx-[20px] rounded-[12px]">
      <div className=" px-[40px] py-[20px] lg:px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:py-[60px] gap-[24px]">
          {competitionsData &&
            competitionsData.map((item) => (
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
                key={item.id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionList;
