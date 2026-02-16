import { Sorting } from '@/components/Competitions';
import ProductList from '@/components/Products/ProductList';
import ProductsHeading from '@/components/Products/ProductsHeading';
import { productSortOptions } from '@/data/sorts';
import { useGetProducts } from '@/services/products';
import { SEO } from '@/components/SEO';
import { translateds } from '@/context/TranslateContext';
import { useBasket } from '@/hooks/useBasket';
import { useNavigate } from 'react-router';
import { ShoppingCart } from 'lucide-react';

const Products = () => {
  const { data: productsData } = useGetProducts();
  const products = productsData && productsData?.data;
  const { basket } = useBasket();
  const navigate = useNavigate();

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <SEO seoKey="products" />
      <div className="pt-[118px]">
        <div className="main-container">
          <h1 className="page-title">{translateds('store')}</h1>
        </div>
        <ProductsHeading />
        <Sorting
          lengthNumber={products && products?.length}
          sortOptions={productSortOptions}
          sortType="products"
        />
        <ProductList />
      </div>

      {totalItems > 0 && (
        <button
          onClick={() => navigate('/basket')}
          className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#0B98A1] hover:bg-[#0B98A1]/90 text-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-white text-[#0B98A1] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
    </>
  );
};

export default Products;
