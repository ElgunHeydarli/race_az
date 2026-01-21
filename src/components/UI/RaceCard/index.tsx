import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { translateds } from '@/context/TranslateContext';
import { useInView } from 'react-intersection-observer';

interface RaceCardProps {
  variant?: 'fixed' | 'responsive' | 'partner';
  className?: string;
  animationProps?: {
    type: string;
    stiffness: number;
  };
  date: string;
  location: string;
  id: number;
  name: string;
  text: string;
  image: string;
  slug: string;
  imageAlt: string;
  registration_status: boolean;
}

const RaceCard: React.FC<RaceCardProps> = ({
  variant = 'responsive',
  className = '',
  animationProps = { type: 'spring', stiffness: 300 },
  date,
  location,
  name,
  slug,
  text,
  image,
  imageAlt,
  registration_status,
}) => {
  // Animation controls for Framer Motion
  const controls = useAnimation();

  // Use InView hook for detecting when element is in viewport
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });

  // GSAP reference
  const gsapRef = useRef(null);

  const navigate = useNavigate();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Reset animation state when slug changes
  useEffect(() => {
    return () => {
      setHasAnimated(false);
    };
  }, [slug]);

  // Handle animations when element comes into view
  useEffect(() => {
    if (inView) {
      // GSAP animation
      if (gsapRef.current) {
        gsap.to(gsapRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      }

      // Framer Motion animation
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
      });

      setHasAnimated(true);
    } else if (!inView && hasAnimated) {
      controls.start({
        opacity: 0,
        y: 50,
        scale: 0.5,
      });
    }
  }, [inView, controls, hasAnimated]);

  // Combine refs for both GSAP and InView
  const setRefs = (element: HTMLDivElement) => {
    // Set the gsapRef
    // @ts-expect-error - TypeScript doesn't like this pattern but it works
    gsapRef.current = element;
    // Set the inViewRef
    inViewRef(element);
  };

  const variantClasses = {
    fixed: 'w-full sm:w-[full] h-[320px]',
    responsive: 'w-full aspect-[1.056]',
    partner: 'w-full aspect-[1.056]',
  };

  const baseClasses = 'group relative cursor-pointer rounded-xl overflow-hidden';
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <motion.div
      ref={setRefs}
      className=""
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      // @ts-ignore tr
      transition={animationProps}
    >
      <div className="" onClick={() => navigate(`/competition/${slug}`)}>
        <motion.div
          // @ts-ignore tr
          transition={animationProps}
          className={cardClasses}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            transition={{ delay: 0.2 }}
            className="absolute right-4 top-4 z-10"
          >
            <div className="bg-[#00000029] backdrop-blur-md p-4 rounded-full transition-opacity duration-300">
              <FiArrowUpRight className="text-white text-xl" />
            </div>
          </motion.div>
          <motion.div className="relative w-full h-full overflow-hidden">
            {/* Low quality image placeholder */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${image}?width=20)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
                transform: 'scale(1.1)',
              }}
            />
            <motion.img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 relative z-10"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.5 }}
              onLoad={e => {
                e.currentTarget.style.opacity = '1';
              }}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="pt-[20px] md:max-w-[338px]"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* DATE */}
          <div className="flex items-center text-[12px] justify-between gap-[20px] text-[#FFFFFF99] pb-[]">
            <div className="flex items-center gap-[8px]">
              {/* CALENDAR */}
              <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.80037 1.66663C6.14831 1.66663 6.43036 1.92492 6.43036 2.24355V3.40732C6.98918 3.3974 7.61555 3.3974 8.32032 3.3974H8.32034H11.6803H11.6803C12.3851 3.3974 13.0115 3.3974 13.5703 3.40732V2.24355C13.5703 1.92492 13.8523 1.66663 14.2003 1.66663C14.5482 1.66663 14.8303 1.92492 14.8303 2.24355V3.45836C16.0393 3.54702 16.833 3.76461 17.4161 4.29861C17.9992 4.8326 18.2368 5.55945 18.3337 6.66663V7.49996H1.66699V6.66663C1.76381 5.55945 2.00141 4.8326 2.58453 4.29861C3.16765 3.76461 3.96135 3.54702 5.17038 3.45836V2.24355C5.17038 1.92492 5.45244 1.66663 5.80037 1.66663Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                  <path
                    opacity="0.5"
                    d="M18.3337 11.6667V10C18.3337 9.3008 18.3231 8.05439 18.3123 7.5H1.67187C1.66112 8.05439 1.67169 9.3008 1.67169 10V11.6667C1.67169 14.8094 1.67169 16.3807 2.64773 17.357C3.62376 18.3333 5.19467 18.3333 8.33648 18.3333H11.6689C14.8107 18.3333 16.3816 18.3333 17.3576 17.357C18.3337 16.3807 18.3337 14.8094 18.3337 11.6667Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6672 10.2084C10.8617 10.2084 10.2088 10.8613 10.2088 11.6667V13.3334C10.2088 14.1388 10.8617 14.7917 11.6672 14.7917C12.4726 14.7917 13.1255 14.1388 13.1255 13.3334V11.6667C13.1255 10.8613 12.4726 10.2084 11.6672 10.2084ZM11.6672 11.4584C11.5521 11.4584 11.4588 11.5517 11.4588 11.6667V13.3334C11.4588 13.4485 11.5521 13.5417 11.6672 13.5417C11.7822 13.5417 11.8755 13.4485 11.8755 13.3334V11.6667C11.8755 11.5517 11.7822 11.4584 11.6672 11.4584Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M9.37549 10.8334C9.37549 10.5806 9.22321 10.3527 8.98967 10.256C8.75612 10.1592 8.4873 10.2127 8.30855 10.3915L7.05855 11.6415C6.81447 11.8855 6.81447 12.2813 7.05855 12.5253C7.30262 12.7694 7.69835 12.7694 7.94243 12.5253L8.12549 12.3423V14.1667C8.12549 14.5119 8.40531 14.7917 8.75049 14.7917C9.09567 14.7917 9.37549 14.5119 9.37549 14.1667V10.8334Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </span>
              <span>{moment(date).format('DD.MM.YYYY')}</span>
            </div>

            <div className="flex items-center gap-[8px]">
              {/* LOCATION */}
              <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.00049 6.75618C5.00049 3.9453 7.23906 1.66663 10.0005 1.66663C12.7619 1.66663 15.0005 3.9453 15.0005 6.75618C15.0005 9.54504 13.4047 12.7994 10.9148 13.9632C10.3344 14.2344 9.66658 14.2344 9.08616 13.9632C6.59632 12.7994 5.00049 9.54504 5.00049 6.75618ZM10.0005 8.33329C10.921 8.33329 11.6672 7.5871 11.6672 6.66663C11.6672 5.74615 10.921 4.99996 10.0005 4.99996C9.08001 4.99996 8.33382 5.74615 8.33382 6.66663C8.33382 7.5871 9.08001 8.33329 10.0005 8.33329Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                  <path
                    opacity="0.5"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.02309 12.1119C3.23745 12.3824 3.1919 12.7755 2.92135 12.9899C2.4433 13.3687 2.29199 13.7025 2.29199 13.9584C2.29199 14.1608 2.38389 14.4067 2.65919 14.6914C2.93731 14.9789 3.37184 15.271 3.96329 15.5392C5.0085 16.0133 6.45325 16.3722 8.12533 16.5286V16.1459C8.12533 15.9006 8.26875 15.678 8.49206 15.5767C8.71538 15.4754 8.97733 15.514 9.16189 15.6755L10.4119 16.7692C10.5475 16.8879 10.6253 17.0594 10.6253 17.2396C10.6253 17.4198 10.5475 17.5913 10.4119 17.71L9.16189 18.8037C8.97733 18.9652 8.71538 19.0038 8.49206 18.9025C8.26875 18.8012 8.12533 18.5786 8.12533 18.3334V17.7837C6.3046 17.6239 4.67471 17.2345 3.44698 16.6776C2.76877 16.37 2.18423 15.9983 1.76069 15.5604C1.33433 15.1196 1.04199 14.5783 1.04199 13.9584C1.04199 13.1665 1.51421 12.51 2.14508 12.0102C2.41563 11.7958 2.80872 11.8413 3.02309 12.1119ZM16.9776 12.1119C17.1919 11.8413 17.585 11.7958 17.8556 12.0102C18.4864 12.51 18.9587 13.1665 18.9587 13.9584C18.9587 15.1068 17.9853 15.9672 16.8365 16.5428C15.6351 17.1448 13.9928 17.571 12.1467 17.758C11.8033 17.7929 11.4966 17.5427 11.4618 17.1993C11.427 16.8558 11.6772 16.5492 12.0206 16.5144C13.7687 16.3373 15.2515 15.9389 16.2765 15.4253C17.3541 14.8853 17.7087 14.3389 17.7087 13.9584C17.7087 13.7025 17.5574 13.3687 17.0793 12.9899C16.8088 12.7755 16.7632 12.3824 16.9776 12.1119Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </span>
              <span>{location}</span>
            </div>
          </div>
          <span className="my-[12px] block h-[2px] bg-[#FFFFFF1F] w-full backdrop-blur-lg"></span>
          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col gap-[12px]"
          >
            <h3 className="text-[18px] text-white">{name}</h3>
            {variant === 'partner' ? (
              <div className="flex items-center gap-1">
                <span className="text-sm text-white/80">{translateds('competition_partner')}:</span>
                <span className="text-sm text-white">Zafar Run MMC</span>
              </div>
            ) : (
              <>
                {/* Race description */}
                <p className="text-[14px] text-[#FFFFFFCC]">{text}</p>
              </>
            )}
            {registration_status ? (
              <span className="text-[12px] text-green-400">{translateds('registration_open')}</span>
            ) : (
              <span className="text-[12px] text-[#FFFFFF99]">{translateds('registration_closed')}</span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RaceCard;
