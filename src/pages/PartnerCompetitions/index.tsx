import { Sorting } from '@/components/Competitions';
import PartnerCompetitionList from '@/components/PartnerCompetitions/PartnerCompetitionList';
import PartnerCard from '@/components/UI/PartnerCard';
import { competitionSortOptions } from '@/data/sorts';
import { useGetPartnerCompetitions, useGetPartners } from '@/services/partners';
import { SEO } from '@/components/SEO';

const PartnerCompetitions = () => {

  const { data: partnerData } = useGetPartners();
  const { data: partnerCompetitionsData } = useGetPartnerCompetitions();

  const compositionLength = partnerCompetitionsData?.competitions.length;
  const partnersCompetitions = partnerData?.data;

  return (
    <>
      <SEO seoKey="partnerCompetitions" />

      {/* <BreadCrumbTitle
        className=" absolute top-0"
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: translateds('partner_competition_text'),
          },
        ]}
      /> */}
      <Sorting
        lengthNumber={compositionLength}
        sortOptions={competitionSortOptions}
      />
      <PartnerCompetitionList />
      <section className="py-[100px]">
        <div className="main-container">
          <div className="bg-[#FFFFFF0D] p-[40px] rounded-[12px]">
            <div className="grid md:grid-cols-4 grid-cols-2  lg:grid-cols-7 gap-[16px]">
              {partnersCompetitions &&
                partnersCompetitions.map((item) => (
                  <PartnerCard
                    key={item.id}
                    image={item.image}
                    imageAlt={item.image_alt}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnerCompetitions;
