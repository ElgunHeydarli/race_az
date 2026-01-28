import {  Sorting } from '@/components/Competitions';
import CompetitionList from '@/components/Competitions/CompetitionList';
import { competitionSortOptions } from '@/data/sorts';
import {
  useGetCompetitions,
} from '@/services/competitions';
import { SEO } from '@/components/SEO';
import { translateds } from '@/context/TranslateContext';

const Competitions = () => {
  // const competitions_held = translateds('competitions_held');

  const { data: competitionData } = useGetCompetitions();
  const competitions = competitionData && competitionData.data;

  return (
    <>
      <SEO seoKey="competitions" />
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
