import {  Sorting } from '@/components/Competitions';
import CompetitionList from '@/components/Competitions/CompetitionList';
import { competitionSortOptions } from '@/data/sorts';
import {
  useGetCompetitions,
} from '@/services/competitions';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';
import { translateds } from '@/context/TranslateContext';

const Competitions = () => {
  // const competitions_held = translateds('competitions_held');

  const { data: competitionsSeoData } = useGetSeoOfPage('competitions');
  const seoData = competitionsSeoData?.data.find(
    (item) => item.key === 'competitions'
  );

  const { data: competitionData } = useGetCompetitions();
  const competitions = competitionData && competitionData.data;

  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      {/* {bannerData && (
        <CompetitionBanner
          title={bannerData[0].title}
          image={bannerData[0].image}
        />
      )} */}
      {/* <BreadCrumbTitle
        className=" absolute top-0"
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: competitions_held,
          },
        ]}
      /> */}
      <div className="pt-[118px]">
        <div className="main-container">
          <h1 className="competitions-page-title">{translateds('competitions_held')}</h1>
        </div>
        <Sorting
          lengthNumber={competitions?.length}
          sortOptions={competitionSortOptions}
          sortType="competition"
        />
        <CompetitionList />
      </div>
    </>
  );
};

export default Competitions;
