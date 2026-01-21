import { translateds } from '@/context/TranslateContext';
import { useBasket } from '@/hooks/useBasket';
import { Color, Size } from '@/services/products/types';
import { Minus, Plus, Trash2 } from 'lucide-react';
interface IBasketProductCard {
  id: number;
  title: string;
  price: number;
  main_image: string;
  quantity: number;
  size: Size | null;
  currency: string;
  color: Color;
}

const BasketProductCard = ({
  title,
  main_image,
  size,
  color,
  id,
  price,
  quantity,
}: IBasketProductCard) => {
  const { increaseQuantity, removeFromBasket, decreaseQuantity } = useBasket();
  return (
    <>
      <div className="flex flex-col pb-[20px] md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center lg:flex-grow gap-4">
          <div className="w-16 h-16 md:w-18 md:h-18">
            <img
              src={main_image}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-white truncate text-wrap text-base md:text-base">
              {title}
            </h3>
            <span className="text-[#FFFFFF99] flex flex-col text-xs md:text-sm">
              <span> {size ? `${size?.name} ölçü` : ''}</span>
              <span>
                {color.name} {translateds('color')}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center lg:self-center gap-3">
          <button
            onClick={() => decreaseQuantity(id)}
            className="h-8 w-8 inline-flex cursor-pointer justify-center items-center rounded-full bg-[#FFFFFF1F] hover:bg-white/10">
            <Minus className="w-4 h-4 text-white" />
          </button>
          <span className="h-8 w-8 inline-flex text-nowrap xl:text-base text-[14px] cursor-pointer justify-center items-center rounded-full bg-white text-[#04848C]">
            {quantity}
          </span>
          <button
            onClick={() => increaseQuantity(id)}
            className="h-8 w-8 inline-flex cursor-pointer justify-center items-center rounded-full bg-[#FFFFFF1F] hover:bg-white/10">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#04848C] py-2 px-4 rounded-full bg-white text-sm md:text-[14px]">
            {(price * quantity).toFixed(2)} AZN
          </span>
          <button
            onClick={() => removeFromBasket(id)}
            className=" cursor-pointer w-8 h-8 md:w-10 md:h-10 bg-white inline-flex justify-center items-center rounded-full text-[#D60303]">
            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketProductCard;
