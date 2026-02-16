import BasketDetail from '@/components/Basket/BasketDetail';
import RecommendedProducts from '@/components/Basket/RecommendedProducts';
import { SEO } from '@/components/SEO';
import { translateds } from '@/context/TranslateContext';

const Basket = () => {
  return (
    <>
      <SEO seoKey="basket" />
      <div className="pt-[118px]">
        <div className="main-container">
          <h1 className="page-title">{translateds('cart_text')}</h1>
        </div>
        <BasketDetail />
        <RecommendedProducts />
      </div>
    </>
  );
};

export default Basket;
