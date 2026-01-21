import {
  FAQSection,
  HeaderSection,
  RaceScenes,
  SendMail,
  Statistics,
  UpcomingRaces,
} from "@/components/Home";
import { useGetSeoOfPage } from "@/services/seo";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { getHomeBanner } from "@/services/homeBanners";
import { useChangeLang } from "@/hooks/useChangeLang";
import HomeBanner from "@/components/Home/HomeBanner";

const Home = () => {
  // ✅ Zustand hook
  const { lang } = useChangeLang();

  // ✅ SEO data
  const { data: homeData } = useGetSeoOfPage("home");
  const seoData = homeData?.data.find((item) => item.key === "home");

  // ✅ Banner data (lang dəyişəndə avtomatik refetch edəcək)
  const { data: bannerData } = useQuery({
    queryKey: ["home-banner", lang],
    queryFn: () => getHomeBanner(lang),
  });

  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>

      {/* Banner aktiv olduqda göstər, yoxsa HeaderSection */}
      {bannerData?.has_banner && bannerData.banner ? (
        <HomeBanner banner={bannerData.banner} />
      ) : (
        <HeaderSection />
      )}

      <Statistics />
      <UpcomingRaces />
      <FAQSection />
      <RaceScenes />
      <SendMail />
    </>
  );
};

export default Home;
