import VolunteerForm from '@/components/Forms/VolunteerForm';
import VolunteerHead from '@/components/Volunteers/BannerImage';
import Requirments from '@/components/Volunteers/Requirments';
import { SEO } from '@/components/SEO';

const Volunteers = () => {
  return (
    <>
      <SEO seoKey="volunteer" />
      <div className="pt-[118px]">
        <VolunteerHead />
        <Requirments />
        <VolunteerForm />
      </div>
    </>
  );
};

export default Volunteers;
