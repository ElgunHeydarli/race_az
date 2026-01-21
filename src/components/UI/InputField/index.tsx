import { motion } from 'framer-motion';
interface InputFieldProps {
  placeholder: string;
  type?: string;
  register: any;
  error?: any;
}

export const InputField = ({
  placeholder,
  type = 'text',
  register,
  error,
}: InputFieldProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div variants={itemVariants} className="flex flex-col">
      <input
        className="w-full bg-[#FFFFFF14] border-none outline-none focus:ring-1 focus:ring-[#0B98A1] text-white py-4 px-5 rounded-[12px] placeholder:text-[#FFFFFF99] transition-all duration-200"
        placeholder={placeholder}
        type={type}
        {...register}
      />
      {error && (
        <span className="mt-1 text-sm text-red-400">{error.message}</span>
      )}
    </motion.div>
  );
};
