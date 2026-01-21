import VolunteerForm from '@/components/Forms/VolunteerForm';
import VolunteerHead from '@/components/Volunteers/BannerImage';
import Requirments from '@/components/Volunteers/Requirments';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';

const Volunteers = () => {
  const { data: volunteersData } =
    useGetSeoOfPage('volunteer');
  const seoData = volunteersData?.data.find(
    item => item.key === 'volunteer',
  );

  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta
          name="description"
          content={seoData?.meta_description}
        />
        <link rel="canonical" href={window.location.href} />
        <meta
          property="og:title"
          content={seoData?.meta_title}
        />
      </Helmet>
      <div className="pt-[118px]">
        <VolunteerHead />
        <Requirments />
        <VolunteerForm />
      </div>
    </>
  );
};

export default Volunteers;
