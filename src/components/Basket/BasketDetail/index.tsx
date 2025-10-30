import PrimaryButton from '@/components/UI/PrimaryButton';
import { useBasket } from '@/hooks/useBasket';
import { useNavigate } from 'react-router';
import BasketProductCard from '../BasetProductCard';
import { translateds } from '@/context/TranslateContext';

const BasketDetail = () => {
  const navigate = useNavigate();
  const { basket, selectOrderItems } = useBasket();

  const totalPrice = basket.reduce(
    (total, item) => total + +item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    const orderItems = basket.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      color_id: item.color.id,
      size_id: item.size?.id ?? null,
    }));
    selectOrderItems([...orderItems]);
    navigate('/order');
  };

  console.log(basket, 'BAASSKKET')

  return (
    <section className="pt-[48px] pb-[100px]">
      <div className="main-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF0A] lg:col-span-2 rounded-lg lg:rounded-xl">
            <div className="p-4 md:p-6 lg:p-8">
              {basket.length < 1 ? (
                <p className="text-white text-[18px] text-center">
                  {translateds('Cart_is_empty')}
                </p>
              ) : (
                basket.map((item) => (
                  <BasketProductCard
                    main_image={item.image}
                    {...item}
                    price={Number(item.price)}
                    key={`${item.id}-${item.color?.id ?? 'nc'}-${item.size?.id ?? 'ns'}`}
                    color={item.color}
                    size={item.size}
                  />
                ))
              )}
            </div>
          </div>
          <div className="bg-[#FFFFFF0A] p-6 lg:p-8 rounded-lg lg:rounded-xl">
            <div>
              <h3 className="text-white text-lg md:text-xl">
                {translateds('Order_amount')}
              </h3>
              <div className="flex flex-col gap-4 pt-6">
                <div className="flex items-center text-center justify-between text-[#FFFFFF99] text-sm md:text-base">
                  <span>{translateds('Product_price')}:</span>
                  <span>{totalPrice.toFixed(2)} AZN</span>
                </div>

                <div className="flex items-center justify-between text-[#8FEDA0] text-sm md:text-base">
                  <span>{translateds('Total')}:</span>
                  <span>{totalPrice.toFixed(2)} AZN</span>
                </div>
                <PrimaryButton onClick={handleConfirmOrder}>
                  {translateds('Confirm_order')}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasketDetail;
