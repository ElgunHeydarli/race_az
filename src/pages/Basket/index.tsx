import BasketDetail from '@/components/Basket/BasketDetail';
import RecommendedProducts from '@/components/Basket/RecommendedProducts';
import { SEO } from '@/components/SEO';

const Basket = () => {
  return (
    <>
      <SEO seoKey="basket" />
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
