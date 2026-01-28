import OrderDetail from '@/components/Order/OrderDetail';
import { SEO } from '@/components/SEO';

const Order = () => {
  return (
    <>
      <SEO seoKey="order" />
      {/* <BreadCrumbTitle
        title={translateds('Order')}
        breadcrumbs={breadCrumbs}
      /> */}
      <div className="pt-[118px]">
        <OrderDetail />
      </div>
    </>
  );
};

export default Order;
