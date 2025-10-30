import { axiosClient } from '@/api/axiosClient';
import PrimaryButton from '@/components/UI/PrimaryButton';
import { OrderItem, useBasket } from '@/hooks/useBasket';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PromoResponse } from '../types';
import { translateds } from '@/context/TranslateContext';
import { useChangeLang } from '@/hooks/useChangeLang';

interface PromoCodeFormProps {
  onPromoCodeApplied: (promoCode: string) => void;
  setDiscountResponse: (response: PromoResponse) => void;
  orderItems: OrderItem[];
}

const PromoCodeForm = ({ onPromoCodeApplied, setDiscountResponse, orderItems }: PromoCodeFormProps) => {
  const { basket } = useBasket();
  const [promoCode, setPromoCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang } = useChangeLang();

  const TranslateOne = () => {
    switch (lang) {
      case 'az':
        return 'Səbət boşdur';
      case 'en':
        return 'Basket is empty';
      case 'ru':
        return 'Корзина пуста';
    }
  };

  const TranslateTwo = () => {
    switch (lang) {
      case 'az':
        return 'Zəhmət olmasa promokodu daxil edin';
      case 'en':
        return 'Please enter promo code.';
      case 'ru':
        return 'Пожалуйста, введите промокод.';
    }
  };

  const TranslateThree = () => {
    switch (lang) {
      case 'az':
        return 'Promokod tətbiq edildi';
      case 'en':
        return 'Promo code applied';
      case 'ru':
        return 'Промокод применен';
    }
  };

  const handleChangePromoCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleSubmitPromoCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (basket.length === 0) {
      toast.error(TranslateOne() || '');
      return;
    }

    if (!promoCode.trim()) {
      toast.error(TranslateTwo() || '');
      return;
    }
    setIsSubmitting(true);
    try {
      const items = orderItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const payload = {
        promo_code: promoCode,
        items: items,
      };
      const response = await axiosClient.post('/products/check-cart-promo', payload);
      onPromoCodeApplied(promoCode);
      if (response.data) {
        setDiscountResponse(response.data);
      }
      toast.success(TranslateThree() || '');
    } catch (error: any) {
      if (error && error.response.data.message) {
        toast.error(error.response.data.message);
      } 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitPromoCode} className="py-5 md:py-[28px] ">
        <div>
          <h3 className="text-[#FFFFFF80] !font-poppins text-base md:text-lg pb-4 md:pb-[20px]">
            {translateds('promocode_have')}
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder={translateds('promokod_title')}
              value={promoCode}
              onChange={handleChangePromoCode}
              className="w-full sm:w-[350px] bg-[#FFFFFF14] py-4 px-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] transition duration-300"
            />
          </div>
          <PrimaryButton
            type="submit"
            className="w-full sm:w-[123px] bg-[#0B98A1] hover:bg-[#0B98A1]/90 text-white rounded-full"
          >
            {translateds(isSubmitting ? 'wait' : 'Apply')}
          </PrimaryButton>
        </div>
      </form>
    </>
  );
};

export default PromoCodeForm;
