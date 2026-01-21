import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router';

interface SectionTitleProps {
  title: string;
  btnText?: string;
  btnLink?: string;
}

const SectionTitle = ({ title, btnText, btnLink }: SectionTitleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className="w-full" ref={ref}>
      <div className="py-8 sm:pt-16 md:pt-20 lg:pt-[100px] sm:pb-10 md:pb-12 lg:pb-[48px]">
        <div className="flex flex-col sm:flex-row justify-between text-white items-start sm:items-center gap-4 sm:gap-6">
          <motion.h2
            className="font-unbounded text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            {title}
          </motion.h2>
          {btnText && (
            <motion.button
              className="group cursor-pointer flex items-center gap-2 sm:gap-[8px] text-[#53C5D7] font-medium text-sm sm:text-[15px] hover:opacity-80 transition-opacity"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <Link to={btnLink || '/'}>
                <span className="underline underline-offset-4">{btnText}</span>
              </Link>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                animate={isInView ? { x: [0, 5, 0] } : { x: 0 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeatDelay: 0.5,
                }}>
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 18L19 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 6L19 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
