import { useGetTeams } from '@/services/team';
import TeamMember, { TeamMemberSkeleton } from './TeamMember';
import { translateds } from '@/context/TranslateContext';

const OurTeam = () => {
  const { data, isLoading } = useGetTeams();

  return (
    <section className="py-[100px]">
      <div>
        <h3 className=" text-[24px] md:text-[40px] text-white mb-[48px] text-center">
          {translateds("komanda_heyetimiz")}
        </h3>
      </div>
      <div className="main-container">
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-[24px]">
          {isLoading
            ? Array(8)
                .fill('')
                .map((_, index) => <TeamMemberSkeleton key={index} />)
            : data?.data?.map((item) => (
                <TeamMember
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  position={item.position}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
