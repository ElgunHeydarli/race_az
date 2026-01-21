import { motion } from 'framer-motion';
import BottomArrow from '@/assets/svgs/bottom-arrow.svg';
import { translateds } from '@/context/TranslateContext';

const ScrollIndicator = () => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      className="absolute bottom-[25px] md:bottom-[48px] !cursor-pointer right-0   md:right-[90px] z-10 text-white">
      <motion.span
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-2">
        <motion.img
          src={BottomArrow || '/placeholder.svg'}
          alt="Scroll down"
          className="w-[32px] h-[32px] mb-2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: 'easeInOut',
          }}
        />
        <span className=" font-[300] mt-[12px] text-[12px]">
          {translateds('scroll_text')}
        </span>
      </motion.span>
    </motion.div>
  );
};

export default ScrollIndicator;
