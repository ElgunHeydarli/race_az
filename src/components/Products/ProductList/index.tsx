import ProductCard from '@/components/UI/ProductCard';
import { ProductCategory } from '@/data/filters';
// import { BasketItem, useBasket } from '@/hooks/useBasket';
import { useFilterProduct } from '@/hooks/useFilterProduct';
import { useGetProducts } from '@/services/products';
// import type { Product } from '@/services/products/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useGsapStaggerAnimation } from '@/animations/gsap/hooks/useGsapAnimation';
import { AnimatedProductCard } from '@/animations/framer/components/AnimatedProductCardProps';
import { useEffect, useRef } from 'react';

const ProductList = () => {
  // const { addItem } = useBasket();
  const { category, sortOption } = useFilterProduct();

  const prevCategoryRef = useRef(category);
  const prevSortOptionRef = useRef(sortOption.value);
  const shouldAnimateRef = useRef(true);

  const { data } = useGetProducts();
  const products = data && data.data;

  const filteredProducts =
    category === ProductCategory.ALL
      ? products
      : products?.filter((item) => item.type === category);

  const dataProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortOption.value) {
      case 'price_asc':
        return Number(a.price) - Number(b.price);
      case 'price_desc':
        return Number(b.price) - Number(a.price);
      default:
        return a.id - b.id;
    }
  });

  useEffect(() => {
    if (
      prevCategoryRef.current !== category ||
      prevSortOptionRef.current !== sortOption.value
    ) {
      shouldAnimateRef.current = true;
    } else {
      shouldAnimateRef.current = false;
    }

    prevCategoryRef.current = category;
    prevSortOptionRef.current = sortOption.value;
  }, [category, sortOption]);


  const productsContainerRef = useGsapStaggerAnimation(
    '.product-card',
    0.05,
    [category, sortOption.value],
    !shouldAnimateRef.current
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="pb-[50px]">
      <div className="main-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={
              shouldAnimateRef.current ? category + sortOption.value : 'static'
            }
            initial={shouldAnimateRef.current ? { opacity: 0 } : false}
            animate={shouldAnimateRef.current ? { opacity: 1 } : false}
            exit={shouldAnimateRef.current ? { opacity: 0 } : undefined}
            transition={{ duration: 0.3 }}
            ref={productsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dataProducts &&
              dataProducts.map((item, index) => (
                <AnimatedProductCard
                  key={item.id}
                  index={index}
                  className="product-card"
                  skipAnimation={!shouldAnimateRef.current}>
                  <ProductCard
                    slug={item.slug}
                    colors={item.colors}
                    id={item.id}
                    title={item.name}
                    price={item.price}
                    image={item.main_image}
                    sizes={item.sizes}
                    productDetail={item}
                    // onAddToCart={() => handleAddToCart(item)}
                  />
                </AnimatedProductCard>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default ProductList;
