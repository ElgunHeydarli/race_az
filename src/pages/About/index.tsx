import MoreAbout from '@/components/About/MoreAbout';
import OurTeam from '@/components/About/OurTeam';
import { SEO } from '@/components/SEO';

const About = () => {
  return (
    <>
      <SEO seoKey="about" />
      <MoreAbout />
      <OurTeam />
    </>
  );
};

export default About;
