import ProductMainDetail from '@/components/ProductDetail/ProductMainDetail';
import { SEO } from '@/components/SEO';

const ProductDetail = () => {
  return (
    <>
      <SEO seoKey="productDetail" />
      <div className="pt-[118px]">
        <ProductMainDetail />
      </div>
    </>
  );
};

export default ProductDetail;
