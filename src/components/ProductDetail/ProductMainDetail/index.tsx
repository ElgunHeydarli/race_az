import React from 'react';

import { useGetProductDetail } from '@/services/products';
import type { Color, Size } from '@/services/products/types';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ShoppingCart,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import StockIndicator from '../StockIndicator';
import { BasketItem, useBasket } from '@/hooks/useBasket';
import { cn } from '@/lib/utils';
import { translateds } from '@/context/TranslateContext';
import toast from 'react-hot-toast';

const ProductMainDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productDetailData } = useGetProductDetail(id ?? '');
  const { basket, removeFromBasket, addItem } = useBasket();
  const productDetail = productDetailData?.data;
  const isInBasket = basket.some((item) => item.id === Number(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    productDetail?.colors?.[0] ?? null
  );
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    productDetail?.sizes?.[0] ?? null
  );

  const images = productDetail?.images ?? [];
  const selectedStock = selectedColor?.stock ?? 0;

  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    if (images.length > 4) {
      setShowScrollButtons(true);
      checkScrollability();
    } else {
      setShowScrollButtons(false);
    }
  }, [images.length]);

  const checkScrollability = () => {
    if (!thumbnailsRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = thumbnailsRef.current;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop < scrollHeight - clientHeight);
  };

  const scrollThumbnails = (direction: 'up' | 'down') => {
    if (!thumbnailsRef.current) return;

    const scrollAmount = 100;
    const currentScroll = thumbnailsRef.current.scrollTop;

    thumbnailsRef.current.scrollTo({
      top:
        direction === 'up'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(checkScrollability, 300);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!selectedColor) {
      toast.error(translateds("reng_secilmeyib"));
      return;
    }

    if (productDetail?.sizes?.length && !selectedSize) {
      toast.error(translateds("olcu_secilmelidir"));
      return;
    }

    if (isInBasket) {
      removeFromBasket(Number(id));
    } else {
      if (productDetail && selectedColor) {
        const basketItem: BasketItem = {
          id: productDetail.id,
          title: productDetail.name,
          price: productDetail.price,
          image: productDetail.main_image,
          currency: 'AZN',
          quantity: 1,
          color: selectedColor,
          size: selectedSize ? selectedSize : null,
        };
        addItem(basketItem);
      }
    }
  };

  return (
    <>
      <section className="pb-[96px]">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mt-[50px] w-full">
            <div className="relative">
              <div className="flex md:flex-row flex-col gap-4 w-full">
                <div className="relative md:w-24 md:min-w-24 order-2 md:order-1">
                  {showScrollButtons && (
                    <button
                      onClick={() => scrollThumbnails('up')}
                      className={cn(
                        'absolute top-0 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center transition-opacity',
                        canScrollUp
                          ? 'opacity-100 hover:bg-white/20'
                          : 'opacity-0 pointer-events-none'
                      )}>
                      <ChevronUp className="w-5 h-5 text-white" />
                    </button>
                  )}

                  {/* Thumbnails Container */}
                  <div
                    ref={thumbnailsRef}
                    onScroll={checkScrollability}
                    className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:max-h-[440px] w-full md:w-auto pb-2  scrollbar-hide">
                    {productDetail?.images.map((src, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`min-w-[80px] w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex justify-center items-center rounded-xl overflow-hidden bg-[#FFFFFF0D] transition-all duration-200 ${currentImageIndex === index
                          ? 'ring-2 ring-[#04848C] scale-105'
                          : 'hover:ring-1 hover:ring-[#04848C]/50'
                          }`}>
                        <img
                          src={src.path || '/placeholder.svg'}
                          alt={`Product view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Scroll Down Button */}
                  {showScrollButtons && (
                    <button
                      onClick={() => scrollThumbnails('down')}
                      className={cn(
                        'absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center transition-opacity',
                        canScrollDown
                          ? 'opacity-100 hover:bg-white/20'
                          : 'opacity-0 pointer-events-none'
                      )}>
                      <ChevronDown className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>

                {/* Main Image */}
                <div className="relative flex-1 order-1 md:order-2 rounded-2xl overflow-hidden bg-[#FFFFFF0D] w-full">
                  <div className="w-full aspect-square md:h-[440px] min-h-[280px]">
                    <img
                      src={
                        images[currentImageIndex]?.path || '/placeholder.svg'
                      }
                      alt="Product main view"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image Navigation Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={goToPrev}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl text-white font-medium mb-2">
                  {productDetail?.name}
                </h1>
                <p className="text-2xl text-white">
                  {productDetail?.price} AZN
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm mb-[12px] text-white/60">
                  {/* first letter is uppercase */}
                  {translateds('color')[0].toUpperCase() +
                    translateds('color').slice(1)}
                  : {selectedColor?.name}
                </label>
                <div className="flex gap-2">
                  {productDetail?.colors?.map((color) => {
                    const hex = color.hex_code.replace('#', '');
                    const r = parseInt(hex.substring(0, 2), 16);
                    const g = parseInt(hex.substring(2, 4), 16);
                    const b = parseInt(hex.substring(4, 6), 16);

                    const brightness = (r + g + b) / 3;
                    const isDark = brightness < 50;

                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor?.id === color.id ? 'border-[#04848C]' : 'border-white/10'
                          }`}
                        style={{
                          backgroundColor: color.hex_code,
                          borderColor: isDark && selectedColor?.id !== color.id ? '#cecece99' : undefined,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                {productDetail && productDetail?.sizes?.length > 0 && (
                  <label className="text-sm mb-[12px] text-white/60">
                    Ölçü: {selectedSize?.name}
                  </label>
                )}
                <div className="flex flex-wrap gap-2">
                  {productDetail?.sizes?.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm transition-colors ${selectedSize?.id === size.id
                        ? 'bg-[#04848C] text-white'
                        : 'bg-[#FFFFFF0D] text-white/60 hover:bg-[#FFFFFF1A]'
                        }`}>
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* <StockIndicator stock={productDetail ? productDetail.stock : 0} /> */}
              {selectedColor && (
                <StockIndicator stock={selectedStock} />
              )}
              <button
                onClick={(e) => handleAddToCart(e)}
                className={`w-full cursor-pointer flex items-center justify-center gap-2 ${isInBasket
                  ? 'bg-white text-[#0B98A1]'
                  : ' hover:bg-[#04848C]/90 text-white bg-[#04848C]'
                  }   py-3 px-4 rounded-lg  transition-colors`}>
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {isInBasket
                    ? translateds('remove_cart')
                    : translateds('add_to_cart')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductMainDetail;
