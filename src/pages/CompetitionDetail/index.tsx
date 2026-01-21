import CompetitionDetailTabs from "@/components/CompetitionDetail/CompetitionDetailTabs";
import GeneralInfo from "@/components/Tabs/GeneralInfo";
import { useTab } from "@/hooks/useTab";
import TermsConditions from "@/components/Tabs/TermsConditions";
import Participants from "@/components/Tabs/Participants";
import Application from "@/components/Tabs/Application";
import { Helmet } from "react-helmet-async";
import { useGetSeoOfPage } from "@/services/seo";

const CompetitionDetail = () => {
  const { data: competitionsSeoData } = useGetSeoOfPage("competitionDetail");
  const seoData = competitionsSeoData?.data.find(
    (item) => item.key === "competitionDetail",
  );

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
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
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
