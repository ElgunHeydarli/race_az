import OrderDetail from '@/components/Order/OrderDetail';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const { data: orderData } = useGetSeoOfPage('order');
  const seoData = orderData?.data.find((item) => item.key === 'order');
  
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
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
