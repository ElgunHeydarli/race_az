import { Sorting } from '@/components/Competitions';
import ProductList from '@/components/Products/ProductList';
import ProductsHeading from '@/components/Products/ProductsHeading';
import { productSortOptions } from '@/data/sorts';
import { useGetProducts } from '@/services/products';
import { SEO } from '@/components/SEO';

const Products = () => {

  const { data: productsData } = useGetProducts();
  const products = productsData && productsData?.data;
  return (
    <>
      <SEO seoKey="products" />
      {/* <BreadCrumbTitle
        title={translateds('racing_products')}
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: translateds('store'),
          },
        ]}
      /> */}
      <div className="pt-[118px]">
        <ProductsHeading />
        <Sorting
          lengthNumber={products && products?.length}
          sortOptions={productSortOptions}
          sortType="products"
        />
        <ProductList />
      </div>
    </>
  );
};

export default Products;
