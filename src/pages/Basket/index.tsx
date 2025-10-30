import BasketDetail from '@/components/Basket/BasketDetail';
import RecommendedProducts from '@/components/Basket/RecommendedProducts';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';

const Basket = () => {
  const { data: basketData } = useGetSeoOfPage('basket');
  const seoData = basketData?.data.find((item) => item.key === 'basket');
 
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      {/* <BreadCrumbTitle
        title={translateds('cart_text')}
        breadcrumbs={breadCrumbs}
      /> */}
      <div className="pt-[118px]">
        <BasketDetail />
        <RecommendedProducts />
      </div>
    </>
  );
};

export default Basket;
