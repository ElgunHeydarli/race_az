import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="mb-4">
        <div
          onClick={toggleOpen}
          className={`bg-[#FFFFFF0A] group duration-300 flex items-center justify-between p-4 md:p-[20px] rounded-[12px] cursor-pointer backdrop-blur-sm ${
            isOpen ? 'rounded-b-none' : ''
          }`}>
          <p className="text-sm md:text-base">{text}</p>
          <motion.span
            animate={{ rotate: isOpen ? 90 : 45 }}
            transition={{ duration: 0.3 }}>
            <FaArrowRight className="w-6 h-6 md:w-[24px] md:h-[24px]" />
          </motion.span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFFFFF05] backdrop-blur-sm overflow-hidden rounded-b-[12px] px-4 md:px-[20px] border-t border-[#FFFFFF10]">
              <div className="py-4 md:py-5">
                <p
                  className="text-sm md:text-base text-[#FFFFFFCC]"
                  dangerouslySetInnerHTML={{ __html: description || '' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FAQItem;
