import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useGetHomeForm } from '@/services/home';
import { axiosClient } from '@/api/axiosClient';
import { AlertCircle, Loader2, MailCheck } from 'lucide-react';
import axios from 'axios';

const SendMail = () => {
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');

  //!Loading indicator
  const [isSending, setIsSending] = useState(false);

  //!Messages indicators
  const [emailError, setEmailError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //! For animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { data } = useGetHomeForm();

  const homeFormData = data && data?.data[0];

  //!FramerMOTIONS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubscribeEmail(value);

    if (successMessage) {
      setSuccessMessage(null);
    }

    if (emailError) {
      validateEmail(value);
    }
  };

  const handleSubmit = async () => {
    if (!validateEmail(subscribeEmail)) {
      setSuccessMessage(null);
      return;
    }

    setIsSending(true);
    setEmailError(null);
    try {
      await axiosClient.post('/subscribe-forms', {
        email: subscribeEmail,
      });
      setSuccessMessage('Subscription successful!');
      setSubscribeEmail('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data?.errors?.email?.[0]) {
          console.log(error.response.data.errors.email[0]);
          setEmailError(error.response.data.errors.email[0]);
        } else {
          setEmailError('Please try again.');
        }
      } else {
        setEmailError('Failed to subscribe. Please try again.');
      }
      setSuccessMessage(null);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (successMessage) {
      timeoutId = setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [successMessage]);

  return (
    <section
      ref={sectionRef}
      className="bg-cover bg-center relative h-[60vh] md:h-[70vh] flex justify-center items-center overflow-hidden px-4"
      style={{
        backgroundImage: `url(${homeFormData?.image})`,
      }}>
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 flex max-w-[502px] w-full items-center justify-center flex-col gap-6 md:gap-12 text-center">
        <div className="text-white flex flex-col gap-3">
          <motion.h4
            variants={itemVariants}
            className="font-unbounded text-lg md:text-xl lg:text-[28px]">
            {homeFormData?.title}
          </motion.h4>
          <motion.p
            variants={itemVariants}
            className="text-[11px] md:text-[14px]">
            {homeFormData?.text}
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative cursor-pointer w-full max-w-[420px]">
          <input
            className="w-full bg-[#FFFFFF1F] backdrop-blur-lg py-4 pl-5 pr-16 rounded-full text-white placeholder:text-[#FFFFFF99] border-none outline-none text-sm sm:text-base"
            type="email"
            onChange={handleEmail}
            onKeyDown={handleKeyDown}
            placeholder="Email"
          />
          <motion.button
            onClick={handleSubmit}
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-[#8BEAF9] w-12 h-12 flex justify-center items-center rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            {isSending ? (
              <Loader2 className=" animate-spin duration-300" />
            ) : (
              <IoIosArrowRoundForward className="w-6 h-6" />
            )}
          </motion.button>
          {emailError && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 -bottom-6 flex items-center text-red-400 text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              <span>{emailError}</span>
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 -bottom-6 flex items-center text-green-400 text-xs">
              <MailCheck className="w-3 h-3 mr-1" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SendMail;
