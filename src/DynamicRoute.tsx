import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useChangeLang } from './hooks/useChangeLang';
import { InputField } from './components/UI/InputField';
import { useForm } from 'react-hook-form';
import { translateds } from './context/TranslateContext';

const DynamicRoute: React.FC = () => {
  const { dynamicId } = useParams<{ dynamicId: string }>();
  const { lang } = useChangeLang();

  const [pageData, setPageData] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!dynamicId) return;

    // ilk istek: sayfa bilgileri
    axios
      .get(`https://admin.race.az/api/payment-link/${dynamicId}`, {
        headers: { 'Accept-Language': lang },
      })
      .then(res => {
        setPageData(res.data.data);
      })
      .catch(err => console.error(err));
  }, [dynamicId, lang]);

  if (!dynamicId) return null;

  return (
    <div className="w-full h-full bg-black py-[100px] flex items-center justify-center mt-24">
      <div className="w-full max-w-[760px] mx-auto">
        <div className="bg-[#FFFFFF14] backdrop-blur-sm rounded-2xl py-8 sm:py-12 md:py-[60px] px-4 sm:px-6 md:px-[48px]">
          <div className="flex flex-col gap-4 sm:gap-5 text-white items-center justify-center text-center">
            <h3 className="text-2xl sm:text-3xl md:text-[40px] font-display">
              {pageData?.title ?? 'Loading...'}
            </h3>
            <p
              className="text-sm sm:text-[14px] text-white/80 max-w-md"
              dangerouslySetInnerHTML={{ __html: pageData?.description ?? '' }}
            />
          </div>

          <form
            onSubmit={handleSubmit(async formData => {
              try {
                const res = await axios.post(
                  `https://admin.race.az/api/payment-link/${dynamicId}/pay`,
                  formData,
                  { headers: { 'Accept-Language': lang } },
                );

                if (res.data?.redirect_url) {
                  window.location.href = res.data.redirect_url;
                } else {
                  console.error('Payment not successful:', res.data.message);
                }
              } catch (err) {
                console.error('Error:', err);
              }
            })}
            className="mt-8 sm:mt-12 md:mt-[48px]"
          >
            <div className="mt-4 sm:mt-[16px]">
              <p className='text-white text-xs mb-[8px]'><sup>*</sup>{translateds('can_enter_amount')}</p>
              <InputField
                placeholder="0.00"
                register={register('payment', {
                  required: 'Ödəniş məcburidir',
                })}
                error={errors.payment}
              />
            </div>
              <p className='text-white sm:text-start text-lg md:text-center  lg:text-center mt-[32px] mb-[8px]'>{translateds('user_info')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[16px] w-full mt-4 sm:mt-[16px]">
               <InputField
                placeholder={translateds('name_text')}
                register={register('firstname', {
                  required: translateds('ad_mecburidir'),
                })}
                error={errors.lastname}
              />
              <InputField
                placeholder={translateds('surname_text')}
                register={register('lastname', {
                  required: translateds('soyad_mecburidir'),
                })}
                error={errors.lastname}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[16px] w-full mt-4 sm:mt-[16px]">
              <InputField
                placeholder={translateds('email_text')}
                type="email"
                register={register('email')}
                error={errors.email}
              />
              <InputField
                placeholder="+994 00 000 00 00"
                type="tel"
                register={register('phone')}
                error={errors.phone}
              />
            </div>

            <div className="mt-4 sm:mt-[16px]">
              <textarea
                {...register('note')}
                className="w-full min-h-[120px] bg-[#FFFFFF14] border-none outline-none focus:ring-1 focus:ring-[#0B98A1] text-white py-4 px-5 rounded-[12px] placeholder:text-[#FFFFFF99] transition-all duration-200"
                placeholder={translateds('note_text')}
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0B98A1] hover:bg-[#0a8991] transition-colors duration-200 cursor-pointer py-3.5 sm:py-[14px] w-full rounded-full text-white mt-6 sm:mt-[28px] font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {translateds(
                isSubmitting ? translateds('wait') : translateds('odenish_et'),
              )}{' '}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicRoute;
