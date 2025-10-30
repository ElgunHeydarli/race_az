import PrimaryButton from '@/components/UI/PrimaryButton';
import { translateds } from '@/context/TranslateContext';

interface OrderSummaryProps {
  originalTotal: string | number;
  discount: string | number;
  discountedTotal: string | number;
  currency?: string;
  onCheckout: () => void;
  isLoading?: boolean;
}

export default function OrderSummary({
  originalTotal,
  discount,
  discountedTotal,
  currency = 'AZN',
  onCheckout,
  isLoading = false,
}: OrderSummaryProps) {
  const formatPrice = (price: string | number) => {
    const numPrice =
      typeof price === 'string' ? Number.parseFloat(price) : price;
    return numPrice.toFixed(2);
  };

  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex items-center text-center justify-between text-[#FFFFFF99] text-sm md:text-base">
        <span>{translateds('Product_price')}:</span>
        <span>
          {formatPrice(originalTotal)} {currency}
        </span>
      </div>
      <div className="flex items-center justify-between text-[#FFFFFF99] text-sm md:text-base">
        <span>{translateds('discount_text')}:</span>
        <span>
          {formatPrice(discount)} {currency}
        </span>
      </div>
      <div className="flex items-center justify-between text-[#8FEDA0] text-sm md:text-base">
        <span>{translateds('Total')}:</span>
        <span>
          {formatPrice(discountedTotal)} {currency}
        </span>
      </div>
      <PrimaryButton onClick={onCheckout} className="" disabled={isLoading}>
        {translateds(isLoading ? 'wait' : 'pay')}
      </PrimaryButton>
    </div>
  );
}
