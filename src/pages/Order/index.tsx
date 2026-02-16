import OrderDetail from '@/components/Order/OrderDetail';
import { SEO } from '@/components/SEO';
import { translateds } from '@/context/TranslateContext';

const Order = () => {
  return (
    <>
      <SEO seoKey="order" />
      <div className="pt-[118px]">
        <div className="main-container">
          <h1 className="page-title">{translateds('Order')}</h1>
        </div>
        <OrderDetail />
      </div>
    </>
  );
};

export default Order;
