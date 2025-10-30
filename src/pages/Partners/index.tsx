import PartnerForm from '@/components/Forms/PartnerForm';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';
import PartnerHero from './PartnerHero';

const Partners = () => {
  const { data: partnerData } = useGetSeoOfPage('partner');
  const seoData = partnerData?.data.find((item) => item.key === 'partner');
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      <div className='pt-[118px]'>
      <PartnerHero />
      <PartnerForm />
      </div>
    </>
  );
};

export default Partners;
