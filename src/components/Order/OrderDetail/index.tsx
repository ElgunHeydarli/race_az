import { OrderItem, useBasket } from '@/hooks/useBasket';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import PromoCodeForm from './PromoCodeForm';
import { PromoResponse } from './types';
import OrderSummary from './OrderSummary';
import toast from 'react-hot-toast';
import BasketItems from './BasketItems';
import { axiosClient } from '@/api/axiosClient';
import { translateds } from '@/context/TranslateContext';
import { useNavigate } from 'react-router';
import Delivery from './Delivery';

const OrderDetail = () => {
  const [activeMethod, setActiveMethod] = useState<'cash' | 'cart' | ''>('');
  const { basket, removeFromBasket, clearBasket } = useBasket();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  const [discountResponse, setDiscountResponse] =
    useState<null | PromoResponse>(null);

  const orderItems: OrderItem[] = basket.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    color_id: item.color.id,
    size_id: item.size?.id ?? null,
  }));

  const [orderValues, setOrderValues] = useState({
    ad: '',
    soyad: '',
    email: '',
    number_prefix: '+994',
    number: '',
    country_id: '',
    unvan: '',
    comment: '',
    payment_method: 'cash',
    accept_rules: true,
    promo_code: '',
  });

  const handlePromoCodeApplied = (promoCode: string) => {
    setOrderValues({ ...orderValues, promo_code: promoCode });
  };

  const calculateOriginalTotal = () => {
    return basket
      .reduce((total, item) => {
        return total + Number.parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const orderData = {
        ...orderValues,
        payment_method: activeMethod,
        items: orderItems,
      };

      const response = await axiosClient.post('/orders', orderData);

      if (response.data.status === 'success') {
        if (response.data.redirect_url) {
          // Online ödeme varsa direkt yönlendir
          window.location.href = response.data.redirect_url;
          return;
        } else {
          // Online ödeme yoksa sipariş başarı sayfasına git
          clearBasket();
          navigate('/order-success');
          return;
        }
      } else {
        toast.error(translateds("sifaris_err"));
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (!orderValues.promo_code || basket.length === 0) {
      if (discountResponse) setDiscountResponse(null);
      return;
    }
    if (basket.length === 0) {
      setDiscountResponse(null);
      return;
    }

    const applyPromoCode = async () => {
      try {
        const payload = {
          promo_code: orderValues.promo_code,
          items: orderItems,
        };

        if (orderItems.length === 0) {
          setDiscountResponse(null);
          return;
        }

        const response = await axiosClient.post(
          '/products/check-cart-promo',
          payload
        );
        setDiscountResponse(response.data);
      } catch (error) {
        console.error('Error re-applying promo code:', error);
        setDiscountResponse(null);
      }
    };

    applyPromoCode();
  }, [basket, orderValues.promo_code]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderValues({
      ...orderValues,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method: 'cash' | 'cart') => {
    setActiveMethod(method);
    setOrderValues({
      ...orderValues,
      payment_method: method,
    });
  };

  const originalTotal =
    discountResponse?.original_total || calculateOriginalTotal();
  const discount = discountResponse?.total_discount || '0.00';
  const discountedTotal = discountResponse?.discounted_total || originalTotal;

  return (
    <section className="pt-[49px] pb-[100px]">
      <div className="main-container">
        <div className="grid grid-cols-12 gap-[24px]">
          <div className=" col-span-12 lg:col-span-8">
            <div className="bg-[#FFFFFF0A]  sm:p-6 p-4 mdLp-[48px] rounded-[20px]">
              <div className="border-b border-b-[#FFFFFF14] pb-5 md:pb-[28px]">
                <div>
                  <h3 className="text-[#FFFFFF80] !font-poppins pb-4 md:pb-[20px]">
                    {translateds('user_info')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[20px]">
                  <div>
                    <input
                      className="w-full bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="text"
                      name="ad"
                      value={orderValues.ad}
                      onChange={handleInputChange}
                      placeholder="Ad"
                    />
                  </div>
                  <div>
                    <input
                      className="w-full bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="text"
                      name="soyad"
                      value={orderValues.soyad}
                      onChange={handleInputChange}
                      placeholder="Soyad"
                    />
                  </div>
                  <div>
                    <input
                      className="w-full bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="email"
                      name="email"
                      value={orderValues.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex bg-[#FFFFFF14] px-4 py-[18px] rounded-full">
                    <select
                      value={orderValues.number_prefix}
                      name="number_prefix"
                      onChange={handleInputChange}
                      className="w-24 text-white"
                    >
                      <option>+994</option>
                    </select>
                    <input
                      type="tel"
                      value={orderValues.number}
                      name="number"
                      onChange={handleInputChange}
                      placeholder="000 00 00"
                      className="w-full px-4 text-white placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <Delivery
                orderValues={orderValues}
                setOrderValues={setOrderValues}
              />
              <div className="border-b py-5 md:py-[28px] border-b-[#FFFFFF14] pb-[28px]">
                <div>
                  <h3 className="text-[#FFFFFF80] !font-poppins pb-4 md:pb-[20px]">
                    {translateds('Payment_type')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[20px]">
                  <button
                    onClick={() => handlePaymentMethodChange('cart')}
                    className={`flex cursor-pointer mb-[16px] items-center gap-4 p-[15px] rounded-full transition-all duration-300 ${activeMethod === 'cart'
                      ? 'bg-[#25262A] border-[#8BEAF9] border text-[#8BEAF9]'
                      : 'bg-[#25262A] border-transparent border text-white/60 hover:border-white/10'
                      }`}
                  >
                    <CreditCard
                      className={`w-6 h-6 ${activeMethod === 'cart'
                        ? 'text-[#8BEAF9]'
                        : 'text-white/60'
                        }`}
                    />
                    <span className="text-base">
                      {translateds('online_card')}
                    </span>
                    <div className="ml-auto">
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${activeMethod === 'cart'
                          ? 'border-[#8BEAF9]'
                          : 'border-[#FFFFFF3D]'
                          } flex items-center justify-center`}
                      >
                        {activeMethod === 'cart' && (
                          <div className="w-3 h-3 rounded-full bg-[#8BEAF9]" />
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <PromoCodeForm
                orderItems={orderItems}
                setDiscountResponse={setDiscountResponse}
                onPromoCodeApplied={handlePromoCodeApplied}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
            <div className="flex flex-col gap-[20px]">
              <BasketItems
                basket={basket}
                removeFromBasket={removeFromBasket}
              />
              <OrderSummary
                originalTotal={originalTotal}
                discount={discount}
                discountedTotal={discountedTotal}
                currency="AZN"
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
