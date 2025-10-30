import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@/components/UI/ProductCard';
import { useGetProducts } from '@/services/products';
import { translateds } from '@/context/TranslateContext';

const RecommendedProducts = () => {
  const prevRef = useRef(null);
  const { data: productsData } = useGetProducts();
  const products = productsData && productsData?.data;
  const nextRef = useRef(null);
  return (
    <>
      <section className="pb-[100px]">
        <div className="main-container">
          <div className="flex items-center justify-between pb-[48px]">
            <div>
              <h3 className=" md:text-[30px] text-[22px] lg:text-[40px] text-white">
                {translateds('Recommended')}
              </h3>
            </div>
            <div className="flex items-center gap-[20px]">
              <button
                ref={prevRef}
                className=" w-[36px] lg:w-[48px] cursor-pointer inline-flex justify-center items-center rounded-full bg-[#25262A] text-[#FFFFFF1F] h-[36px] lg:h-[48px] text-[14px]">
                <ChevronLeft className="text-white" />
              </button>
              <button
                ref={nextRef}
                className=" w-[36px] lg:w-[48px] cursor-pointer inline-flex justify-center items-center rounded-full bg-[#25262A] text-[#FFFFFF1F] h-[36px] lg:h-[48px] text-[14px]">
                <ChevronRight className="text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden sm:pl-[40px] lg:pl-[80px]">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            slidesPerView={'auto'}
            spaceBetween={14}
            className="!overflow-visible">
            {products &&
              products.map((product) => (
                <SwiperSlide className="!w-fit" key={product.id}>
                  <ProductCard
                    className="max-w-[300px]"
                    id={product.id}
                    productDetail={product}
                    slug={product.slug}
                    image={product.main_image}
                    title={product.name}
                    sizes={product.sizes}
                    price={product.price}
                    colors={product.colors}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default RecommendedProducts;
