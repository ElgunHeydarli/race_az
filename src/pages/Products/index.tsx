import { Sorting } from '@/components/Competitions';
import ProductList from '@/components/Products/ProductList';
import ProductsHeading from '@/components/Products/ProductsHeading';
import { productSortOptions } from '@/data/sorts';
import { useGetProducts } from '@/services/products';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';

const Products = () => {
  const { data: productsDataSeo } = useGetSeoOfPage('products');
  const seoData = productsDataSeo?.data.find((item) => item.key === 'products');

  const { data: productsData } = useGetProducts();
  const products = productsData && productsData?.data;
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
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
