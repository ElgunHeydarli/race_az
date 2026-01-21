import { Sorting } from '@/components/Competitions';
import PartnerCompetitionList from '@/components/PartnerCompetitions/PartnerCompetitionList';
import PartnerCard from '@/components/UI/PartnerCard';
import { competitionSortOptions } from '@/data/sorts';
import { useGetPartnerCompetitions, useGetPartners } from '@/services/partners';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';

const PartnerCompetitions = () => {
  const { data: partnerDataSeo } = useGetSeoOfPage('partnerCompetitions');
  const seoData = partnerDataSeo?.data.find(
    (item) => item.key === 'partnerCompetitions'
  );

  const { data: partnerData } = useGetPartners();
  const { data: partnerCompetitionsData } = useGetPartnerCompetitions();

  const compositionLength = partnerCompetitionsData?.competitions.length;
  const partnersCompetitions = partnerData?.data;

  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>

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
