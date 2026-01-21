import { motion } from 'framer-motion';
import { staggerChildrenVariants } from '../../variants/fadeVariants';
import { ReactNode } from 'react';

interface AnimatedFilterButtonsProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedFilterButtons = ({
  children,
  className = '',
}: AnimatedFilterButtonsProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildrenVariants}
      className={className}>
      {children}
    </motion.div>
  );
};

interface AnimatedFilterButtonProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  dataFilter?: string;
}

export const AnimatedFilterButton = ({
  children,
  className = '',
  onClick,
  dataFilter,
}: AnimatedFilterButtonProps) => {
  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-filter={dataFilter}
      onClick={onClick}
      className={className}>
      {children}
    </motion.button>
  );
};
