import { motion } from 'framer-motion';
import { useState } from 'react';
import { z } from 'zod';
import { useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosClient } from '@/api/axiosClient';
import { InputField } from '@/components/UI/InputField';
import { translateds } from '@/context/TranslateContext';
import toast from 'react-hot-toast';
import FeaturePartners from '@/components/Partners/FeaturePartners';

const volunteerSchema = z.object({
  name: z.string().min(2, translateds('ad_soyad_err')),
  surname: z.string().min(2, translateds('ad_soyad_err')),
  email: z.string().email(translateds('duzgun_email_daxil_edin')),
  number: z.string().min(9, translateds('duzgun_tel_daxil_edin')),
  comment: z.string().optional(),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const VolunteerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const handleFormSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    try {
      const endpoint = '/volunteer-forms';

      const formattedData = {
        ...data,
        number_prefix: '+994',
      };

      await axiosClient.post(endpoint, formattedData);
      toast.success(translateds('ugurla_gonderildi'));
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col align-center justify-start">
      <FeaturePartners
        customStyle={{
          width: '100%',
          maxWidth: '90%',
          margin: '48px auto auto auto',
        }}
      />
      <section className="py-12 sm:py-16 md:py-20 lg:py-[100px] px-[35px] sm:px-[70px] md:px-[130px] lg:px-[270px]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#FFFFFF14] backdrop-blur-sm rounded-2xl py-8 sm:py-12 md:py-[60px] px-4 sm:px-6 md:px-[48px]"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:gap-5 text-white items-center justify-center text-center"
            >
              <h3 className="text-2xl sm:text-3xl md:text-[40px] font-display">
                {translateds('volunteer_title')}!
              </h3>
              <p className="text-sm sm:text-[14px] text-white/80 max-w-md">
                {translateds('volunteer_desc')}
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(handleFormSubmit)}
              variants={itemVariants}
              className="mt-8 sm:mt-12 md:mt-[48px]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[16px] w-full">
                <InputField
                  placeholder={translateds('name')}
                  register={(register as UseFormRegister<VolunteerFormData>)(
                    'name',
                  )}
                  error={errors.name}
                />
                <InputField
                  placeholder={translateds('surname')}
                  register={(register as UseFormRegister<VolunteerFormData>)(
                    'surname',
                  )}
                  error={errors.surname}
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
                  register={register('number')}
                  error={errors.number}
                />
              </div>

              <div className="mt-4 sm:mt-[16px]">
                <textarea
                  {...register('comment')}
                  className="w-full min-h-[120px] bg-[#FFFFFF14] border-none outline-none focus:ring-1 focus:ring-[#0B98A1] text-white py-4 px-5 rounded-[12px] placeholder:text-[#FFFFFF99] transition-all duration-200"
                  placeholder={translateds('note_text')}
                  rows={4}
                />
                {errors.comment && (
                  <span className="mt-1 text-sm text-red-400">
                    {errors.comment.message}
                  </span>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0B98A1] hover:bg-[#0a8991] transition-colors duration-200 cursor-pointer py-3.5 sm:py-[14px] w-full rounded-full text-white mt-6 sm:mt-[28px] font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {translateds(isSubmitting ? 'sending' : 'send')}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerForm;
