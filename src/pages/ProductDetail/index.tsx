import ProductFAQ from '@/components/ProductDetail/ProductFAQ';
import ProductMainDetail from '@/components/ProductDetail/ProductMainDetail';
import { useGetProductDetail } from '@/services/products';
import { SEO } from '@/components/SEO';
import { useParams } from 'react-router';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: productDetailData } = useGetProductDetail(id ?? '');

  const productDetail = productDetailData?.data;

  const faqTitles = productDetail?.titles ?? [];

  return (
    <>
      <SEO seoKey="productDetail" />
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
