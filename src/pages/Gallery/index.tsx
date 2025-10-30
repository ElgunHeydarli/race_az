import Galleries from '@/components/Galleries';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';

const Gallery = () => {
  const { data: galleryData } = useGetSeoOfPage('gallery');
  const seoData = galleryData?.data.find((item) => item.key === 'gallery');
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
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
