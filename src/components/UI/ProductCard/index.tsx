// import { ShoppingCart } from 'lucide-react';
// import ColorSelector from '../ColorSelector';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { useBasket } from '@/hooks/useBasket';
// import { Color, Product } from '@/services/products/types';

// interface ProductCardProps {
//   id: number;
//   slug: string;
//   title: string;
//   productDetail?: Product;
//   price: string;
//   image: string;
//   colors?: Color[] | string[];
//   currency?: string;
//   onAddToCart?: () => void;
//   className?: string;
// }

// export default function ProductCard({
//   id,
//   title,
//   // slug,
//   productDetail,
//   price,
//   image,
//   colors = ['#000000', '#666666', '#FFFFFF'],
//   currency = 'AZN',
//   onAddToCart,
//   className = '',
// }: ProductCardProps) {
//   const initColor =
//     typeof colors[0] === 'string' ? colors[0] : colors[0].hex_code;
//   const [selectedColor, setSelectedColor] = useState<string>(initColor);
//   const navigate = useNavigate();
//   const { basket, removeFromBasket, addItem } = useBasket();

//   const isInBasket = basket.some((item) => item.id === id);

//   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     if (isInBasket) {
//       removeFromBasket(id);
//     } else {
//       if (productDetail) {
//         addItem(productDetail);
//       }
//       onAddToCart?.();
//     }
//   };

//   return (
//     <div
//       onClick={() => navigate(`/product/${id}`)}
//       className={`p-3 rounded-xl cursor-pointer ${className}`}>
//       <div className="relative rounded-lg overflow-hidden bg-[#FFFFFF0D] mb-3">
//         <ColorSelector
//           colors={colors}
//           selectedColor={selectedColor}
//           onColorSelect={(color) =>
//             setSelectedColor(typeof color === 'string' ? color : color.hex_code)
//           }
//           className="absolute left-3 top-3 z-10"
//         />

//         <div className=" w-full  aspect-square rounded-[12px] bg-[#FFFFFF0D] p-[12px] relative">
//           <img
//             src={image}
//             alt={title}
//             className="object-cover h-full w-full rounded-[12px]"
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-white text-lg font-medium truncate">{title}</h3>
//         <p className="text-white/60">
//           {price} {currency}
//         </p>

//         <button
//           onClick={(e) => handleAddToCart(e)}
//           className={`w-full cursor-pointer flex items-center justify-center gap-2 ${
//             isInBasket
//               ? 'bg-white text-[#0B98A1]'
//               : ' hover:bg-[#04848C]/90 text-white bg-[#04848C]'
//           }   py-3 px-4 rounded-lg  transition-colors`}>
//           <ShoppingCart className="w-5 h-5" />
//           <span>{isInBasket ? 'Səbətdən sil' : 'Səbətə əlavə et'}</span>
//         </button>
//       </div>
//     </div>
//   );
// }

import type React from 'react';
import { ShoppingCart } from 'lucide-react';
import ColorSelector from '../ColorSelector';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { BasketItem, useBasket } from '@/hooks/useBasket';
import type { Color, Product, Size } from '@/services/products/types';
import { AnimatedImage } from '@/animations/framer/components/AnimatedProductCardProps';
import { addToCartAnimation } from '@/animations/gsap/utils/animations';
import { translateds } from '@/context/TranslateContext';
import SizeDialog from '../SectionTitle/SizeDialog';

interface ProductCardProps {
  id: number;
  slug: string;
  title: string;
  productDetail?: Product;
  price: string;
  image: string;
  colors?: Color[];
  sizes: Size[];
  currency?: string;
  // onAddToCart?: () => void;
  className?: string;
}

export default function ProductCard({
  id,
  title,
  // slug,
  productDetail,
  price,
  image,
  colors,
  sizes,
  currency = 'AZN',
  // onAddToCart,
  className = '',
}: ProductCardProps) {


  console.log(productDetail)
  const initColor = (colors?.[0] ?? null) as Color | null;

  const [selectedColor, setSelectedColor] = useState<Color | null>(initColor);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { basket, removeFromBasket, addItem } = useBasket();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isInBasket = basket.some((item) => item.id === id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (
      selectedColor &&
      productDetail &&
      (productDetail?.sizes?.length ?? 0) > 0
    ) {
      setIsOpen(true);
      return;
    }

    if (buttonRef.current) {
      addToCartAnimation(buttonRef.current);
    }

    if (productDetail && selectedColor) {
      const basketItem: BasketItem = {
        id: productDetail.id,
        title: productDetail.name,
        price: productDetail.price,
        image: productDetail.main_image,
        currency: 'AZN',
        quantity: 1,
        color: selectedColor,
        size: null,
      };
      addItem(basketItem);
    }
  };

  const handleSizeConfirmed = (size: Size) => {
    if (productDetail && selectedColor) {
      const basketItem: BasketItem = {
        id: productDetail.id,
        title: productDetail.name,
        price: productDetail.price,
        image: productDetail.main_image,
        currency: 'AZN',
        quantity: 1,
        color: selectedColor,
        size: size,
      };

      if (buttonRef.current) {
        addToCartAnimation(buttonRef.current);
      }

      addItem(basketItem);
    }
  };

  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFromBasket(id);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isOpen) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={(e) => handleCardClick(e)}
      className={`p-3 rounded-xl cursor-pointer ${className}`}>
      <div className="relative rounded-lg overflow-hidden bg-[#FFFFFF0D] mb-3">
        <ColorSelector
          colors={colors || []}
          selectedColor={selectedColor}
          onColorSelect={(color) => setSelectedColor(color)}
          className="absolute left-3 top-3 z-10"
        />

        <AnimatedImage className="w-full aspect-square rounded-[12px] bg-[#FFFFFF0D] p-[12px] relative">
          <img
            src={image || '/placeholder.svg'}
            alt={title}
            className="object-cover h-full w-full rounded-[12px]"
          />
        </AnimatedImage>
      </div>

      <div className="space-y-2">
        <h3 className="text-white text-lg font-medium truncate">{title}</h3>
        <p className="text-white/60">
          {price} {currency}
        </p>
        <div>
          <SizeDialog
            onSetSize={handleSizeConfirmed}
            open={isOpen}
            setOpen={setIsOpen}
            sizes={sizes}
          />
        </div>
        <button
          ref={buttonRef}
          onClick={(e) => {
            isInBasket ? handleRemoveFromCart(e) : handleAddToCart(e);
          }}
          className={`w-full cursor-pointer flex items-center justify-center gap-2 ${
            isInBasket
              ? 'bg-white text-[#0B98A1]'
              : ' hover:bg-[#04848C]/90 text-white bg-[#04848C]'
          }   py-3 px-4 rounded-lg  transition-colors`}>
          <ShoppingCart className="w-5 h-5" />
          <span>
            {translateds(isInBasket ? 'remove_cart' : 'add_to_cart')}
          </span>
        </button>
      </div>
    </div>
  );
}
