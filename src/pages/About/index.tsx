import MoreAbout from '@/components/About/MoreAbout';
import OurTeam from '@/components/About/OurTeam';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';

const About = () => {
  const { data: homeData } = useGetSeoOfPage('about');
  const seoData = homeData?.data.find((item) => item.key === 'about');
  
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      <MoreAbout />
      <OurTeam />
    </>
  );
};

export default About;
