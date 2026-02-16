import React, { useState } from 'react';
import { translateds } from '@/context/TranslateContext';
import axios from 'axios';
import { useChangeLang } from '@/hooks/useChangeLang';

export type DeliveryTypeItem = {
  id: number;
  name: string;
  price: number;
};

export interface CountriesForDeliveryForm {
  id: number;
  name: string;
  image: string;
}

export type DeliveryProps = {
  orderValues: any;
  setOrderValues: any;
  onDeliveryFeeChange?: (fee: number) => void;
  onRequiresAddress?: (requires: boolean) => void;
};

const Delivery = ({ orderValues, setOrderValues, onDeliveryFeeChange, onRequiresAddress }: DeliveryProps) => {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);
  const { lang } = useChangeLang();
  const [types, setTypes] = React.useState<DeliveryTypeItem[]>([]);

  const fetchDeliveryTypes = async () => {
    const res = await axios.get("https://admin.race.az/api/delivery-types", {
      headers: {
        "Accept-Language": lang,
      },
    });

    if (res.data) {
      setTypes(res.data?.data);
    }
  };

  React.useEffect(() => {
    fetchDeliveryTypes();
  }, []);

  const handleSelectDelivery = (t: DeliveryTypeItem) => {
    setSelectedDeliveryId(t.id);
    setOrderValues({
      ...orderValues,
      delivery_type_id: t.id,
    });

    onDeliveryFeeChange?.(t.price);
    onRequiresAddress?.(t.price > 0);
  };

  const selectedType = types.find((t) => t.id === selectedDeliveryId);
  const requiresAddress = selectedType ? selectedType.price > 0 : false;

  return (
    <>
      <div className="border-b py-5 md:py-[28px] border-b-[#FFFFFF14] pb-[28px]">
        <div>
          <h3 className="text-[#FFFFFF80] !font-poppins pb-4 md:pb-[20px]">
            {translateds('delivery_t')}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[20px]">
          {types?.map((t) => {
            const isActive = selectedDeliveryId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectDelivery(t)}
                className={`flex cursor-pointer mb-[16px] items-center gap-4 p-[15px] rounded-full transition-all duration-300 ${isActive
                  ? 'bg-[#25262A] border-[#8BEAF9] border text-[#8BEAF9]'
                  : 'bg-[#25262A] border-transparent border text-white/60 hover:border-white/10'
                  }`}>
                <span className="text-sm md:text-base">
                  {t.name}{t.price > 0 ? ` (+${t.price} AZN)` : ''}
                </span>
                <div className="ml-auto">
                  <div className={`w-5 h-5 rounded-full border-2 ${isActive ? 'border-[#8BEAF9]' : 'border-[#FFFFFF3D]'} flex items-center justify-center`}>
                    {isActive && <div className="w-3 h-3 rounded-full bg-[#8BEAF9]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {requiresAddress && (
          <div className="mt-4">
            <input
              className="w-full bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
              type="text"
              name="unvan"
              value={orderValues.unvan}
              onChange={(e) => {
                setOrderValues({
                  ...orderValues,
                  unvan: e.target.value,
                });
              }}
              placeholder={translateds('Address_t')}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Delivery;
