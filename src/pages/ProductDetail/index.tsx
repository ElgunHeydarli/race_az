import ProductFAQ from '@/components/ProductDetail/ProductFAQ';
import ProductMainDetail from '@/components/ProductDetail/ProductMainDetail';
import { useGetProductDetail } from '@/services/products';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: productDetailData } = useGetProductDetail(id ?? '');

  const productDetail = productDetailData?.data;

  const faqTitles = productDetail?.titles ?? [];

  const { data: productDetailDataSeo } = useGetSeoOfPage('productDetail');
  const seoData = productDetailDataSeo?.data.find(
    (item) => item.key === 'productDetail'
  );

  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      {/* <BreadCrumbTitle
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: translateds('store'),
          },
          {
            title: productDetail?.name,
          },
        ]}
      /> */}
      <div className="pt-[118px]">
        <ProductMainDetail />
        <ProductFAQ titles={faqTitles} />
      </div>
    </>
  );
};

export default ProductDetail;
