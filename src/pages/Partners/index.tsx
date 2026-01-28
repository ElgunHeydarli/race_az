import PartnerForm from '@/components/Forms/PartnerForm';
import { SEO } from '@/components/SEO';
import PartnerHero from './PartnerHero';

const Partners = () => {
  return (
    <>
      <SEO seoKey="partner" />
      <div className='pt-[118px]'>
      <PartnerHero />
      <PartnerForm />
      </div>
    </>
  );
};

export default Partners;
