import { translateds } from '@/context/TranslateContext';
import { BasketItem } from '@/hooks/useBasket';
import { Trash2 } from 'lucide-react';

interface BasketItemsProps {
  basket: BasketItem[];
  removeFromBasket: (id: number) => void;
}

const BasketItems = ({ basket, removeFromBasket }: BasketItemsProps) => {
  if (basket.length === 0) {
    return (
      <div className="rounded-[20px] bg-[#FFFFFF0A] p-[40px]">
        <h3 className="text-base text-white mb-6">
          {translateds('Products_in_cart')}
        </h3>
        <div className="text-white/50 text-center py-8">{translateds("sebetiniz_bosdur")}</div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[20px] bg-[#FFFFFF0A] p-[40px]">
        <h3 className="text-base text-white mb-6">
          {translateds('Products_in_cart')}
        </h3>
        <div className="space-y-6">
          {basket.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 pb-6 border-b border-[#FFFFFF14] last:border-0 last:pb-0">
              <div className="relative w-[72px] h-[72px] bg-white rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover h-full w-full"
                />
              </div>

              <div className="flex-grow min-w-0">
                <p className="text-white/50 text-sm mb-1">
                  {item.quantity} {translateds('quantity')}
                </p>
                <h4 className="text-white text-base truncate mb-1">
                  {item.title}
                </h4>
                <p className="text-white/50 text-sm">
                  <span className="text-[#FFFFFF99] flex flex-col text-xs md:text-sm">
                    <span>
                      {item.size ? `${item.size?.name} ölçü` : ''}
                    </span>
                    <span>
                      {item.color.name} {translateds('color')}
                    </span>
                  </span>
                </p>
              </div>

              <button
                onClick={() => removeFromBasket(item.id)}
                className="p-2 cursor-pointer hover:bg-white/5 rounded-full transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BasketItems;
