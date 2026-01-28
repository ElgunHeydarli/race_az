import CompetitionDetailTabs from "@/components/CompetitionDetail/CompetitionDetailTabs";
import GeneralInfo from "@/components/Tabs/GeneralInfo";
import { useTab } from "@/hooks/useTab";
import TermsConditions from "@/components/Tabs/TermsConditions";
import Participants from "@/components/Tabs/Participants";
import Application from "@/components/Tabs/Application";
import { SEO } from "@/components/SEO";

const CompetitionDetail = () => {
  // const competitions_held = translateds('competitions_held');
  const { activeTab } = useTab();
  // const { slug } = useParams<{ slug: string }>();
  // const { data: competitionDetailData } = useGetCompetitionDetail(slug ?? '');

  // const competitionDetail = competitionDetailData
  //   ? competitionDetailData.data
  //   : null;

  const tabComponents: { [key: string]: JSX.Element } = {
    general: <GeneralInfo />,
    participant: <Participants />,
    registration: <TermsConditions />,
    contact: <Application />,
  };

  return (
    <>
      <SEO seoKey="competitionDetail" />
      {/* <BreadCrumbTitle
        title={competitionDetail?.name}
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: competitions_held,
            link: '/competitions',
          },
          {
            title: competitionDetail?.name,
          },
        ]}
      /> */}
      <div className="pt-[118px]">
        <CompetitionDetailTabs />
        {tabComponents[activeTab]}
      </div>
    </>
  );
};

export default CompetitionDetail;
