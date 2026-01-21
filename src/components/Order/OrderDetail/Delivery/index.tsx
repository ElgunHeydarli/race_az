import React, { useState } from 'react';
import { BaseResponseType, Entity } from '@/types';
import { useFetch } from '@/utils/reactQuery';
import { translateds } from '@/context/TranslateContext';
import axios from 'axios';
import { useChangeLang } from '@/hooks/useChangeLang';

export type City = Entity<{
  name: string;
}>;

export type CitiesResponse = BaseResponseType<City[]>;

export type DeliveryType = {
  orderValues: any;
  setOrderValues: any;
};

export interface CountriesForDeliveryForm {
  id: number;
  name: string;
  image: string;
}

const Delivery = ({ orderValues, setOrderValues }: DeliveryType) => {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);


  // const [deliverToAdress, setDeliverToAdress] = useState(false);
  // const { data: cities } = useFetch<CitiesResponse>('/cities');

  const { data: countriesForDelivery } = useFetch<{ data: CountriesForDeliveryForm[] }>("countries");
  // @ts-expect-error hasCountries
  const hasCountries = countriesForDelivery && countriesForDelivery?.data && countriesForDelivery?.data?.length > 0 ? countriesForDelivery?.data : [];

  // @ts-expect-error handleInputChange
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setOrderValues({
      ...orderValues,
      [name]: value,
    });
  };

  const { lang } = useChangeLang();
  const [types, setTypes] = React.useState<{ id: number; name: string; }[]>([]);

  const fetchDeliveryTypes = async () => {
    const res = await axios.get("https://admin.race.az/api/delivery-types", {
      headers: {
        "Accept-Language": lang,
      },
    });

    if (res.data) {
      console.log(res.data);
      setTypes(res.data?.data);
    } else {
      console.log(res.status);
    }
  }

  React.useEffect(() => {
    fetchDeliveryTypes();
  }, []);

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
                onClick={() => {
                  setSelectedDeliveryId(t.id);
                  setOrderValues({
                    ...orderValues,
                    delivery_type_id: t.id,
                  });
                }}
                className={`flex cursor-pointer mb-[16px] items-center gap-4 p-[15px] rounded-full transition-all duration-300 ${isActive
                  ? 'bg-[#25262A] border-[#8BEAF9] border text-[#8BEAF9]'
                  : 'bg-[#25262A] border-transparent border text-white/60 hover:border-white/10'
                  }`}>
                <span className="text-sm md:text-base">{t.name}</span>
                <div className="ml-auto">
                  <div className={`w-5 h-5 rounded-full border-2 ${isActive ? 'border-[#8BEAF9]' : 'border-[#FFFFFF3D]'} flex items-center justify-center`}>
                    {isActive && <div className="w-3 h-3 rounded-full bg-[#8BEAF9]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[20px]">
          <button
            onClick={() => setDeliverToAdress(!deliverToAdress)}
            className={`flex cursor-pointer mb-[16px] items-center gap-4 p-[15px] rounded-full transition-all duration-300 ${deliverToAdress
                ? 'bg-[#25262A] border-[#8BEAF9] border text-[#8BEAF9]'
                : 'bg-[#25262A] border-transparent border text-white/60 hover:border-white/10'
              }`}>
            <Bike
              className={`w-5 h-5 md:w-6 md:h-6 ${deliverToAdress ? 'text-[#8BEAF9]' : 'text-white/60'
                }`}
            />
            <span className="text-sm md:text-base">
              {translateds('delivery_text')}
            </span>
            <div className="ml-auto">
              <div
                className={`w-5 h-5 rounded-full border-2 ${deliverToAdress ? 'border-[#8BEAF9]' : 'border-[#FFFFFF3D]'
                  } flex items-center justify-center`}>
                {deliverToAdress && (
                  <div className="w-3 h-3 rounded-full bg-[#8BEAF9]" />
                )}
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[20px]">
          <div className="relative">
            <select
              disabled={!deliverToAdress}
              name="country_id"
              value={orderValues.country_id}
              onChange={handleInputChange}
              className={`w-full appearance-none custom-select bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300 ${!deliverToAdress ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
              <option value="" disabled selected>
                {translateds('select_a_country')}
              </option>
              {hasCountries?.map((c: CountriesForDeliveryForm) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {!deliverToAdress && (
              <div className="absolute inset-0 bg-black/10 rounded-full pointer-events-none" />
            )}
          </div>
          <div className="relative">
            <input
              disabled={!deliverToAdress}
              className={`w-full bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300 ${!deliverToAdress ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              type="text"
              name="unvan"
              value={orderValues.unvan}
              onChange={handleInputChange}
              placeholder={translateds('Address_t')}
            />
            {!deliverToAdress && (
              <div className="absolute inset-0 bg-black/10 rounded-full pointer-events-none" />
            )}
          </div>
        </div>
        <div className="pt-[16px]">
          <textarea
            disabled={!deliverToAdress}
            name="comment"
            value={orderValues.comment}
            onChange={handleInputChange}
            className={`w-full h-[112px] bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-[12px] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300 ${!deliverToAdress ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            placeholder={translateds('notes')}
          />
        </div> */}
      </div>
    </>
  );
};

export default Delivery;
