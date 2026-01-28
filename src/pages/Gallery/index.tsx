import Galleries from '@/components/Galleries';
import { SEO } from '@/components/SEO';

const Gallery = () => {
  return (
    <>
      <SEO seoKey="gallery" />
      {/* <BreadCrumbTitle
        title={translateds('gallery_text')}
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: translateds('gallery_text'),
          },
        ]}
      /> */}
      <div className="pt-[118px]">
        <Galleries />
      </div>
    </>
  );
};

export default Gallery;
