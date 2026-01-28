import {
  FAQSection,
  HeaderSection,
  RaceScenes,
  SendMail,
  Statistics,
  UpcomingRaces,
} from "@/components/Home";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { getHomeBanner } from "@/services/homeBanners";
import { useChangeLang } from "@/hooks/useChangeLang";
import HomeBanner from "@/components/Home/HomeBanner";

const Home = () => {
  // ✅ Zustand hook
  const { lang } = useChangeLang();

  // ✅ Banner data (lang dəyişəndə avtomatik refetch edəcək)
  const { data: bannerData } = useQuery({
    queryKey: ["home-banner", lang],
    queryFn: () => getHomeBanner(lang),
  });

  return (
    <>
      <SEO seoKey="home" />

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
