import { motion } from 'framer-motion';
import { Skeleton } from '@/components/UI/Skeleton';

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
}

const TeamMember = ({ name, image, position }: TeamMemberProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative cursor-pointer w-full lg:max-w-[302px] h-[328px] rounded-[12px] overflow-hidden group">
        <div className="w-full lg:max-w-[302px] h-[328px]">
          <img
            src={image}
            loading="lazy"
            className="object-cover  w-full h-full"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

        <div className="absolute bg-[#00000029] mb-[12px] backdrop-blur-sm mx-[12px] rounded-[12px] bottom-0 left-0 right-0 p-6 text-center transform transition-transform duration-300 group-hover:translate-y-[-8px]">
          <h3 className="text-white text-[16px] font-display mb-1">{name}</h3>
          <p className="text-white/80 text-sm">{position}</p>
        </div>
      </motion.div>
    </>
  );
};

export default TeamMember;

export const TeamMemberSkeleton = () => {
  return (
    <div className="relative cursor-pointer w-[302px] h-[328px] rounded-[12px] overflow-hidden group">
      <div className="w-[302px] h-[328px]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      <div className="absolute bg-[#00000029] mb-[12px] backdrop-blur-sm mx-[12px] rounded-[12px] bottom-0 left-0 right-0 p-6 text-center transform transition-transform duration-300 group-hover:translate-y-[-8px]">
        <h3 className="text-white text-[16px] font-display mb-1">
          <Skeleton className="h-5 w-3/4 mx-auto bg-white/30" />
        </h3>
        <p className="text-white/80 text-sm">
          <Skeleton className="h-4 w-full mx-auto bg-white/20 mb-1" />
          <Skeleton className="h-4 w-2/3 mx-auto bg-white/20" />
        </p>
      </div>
    </div>
  );
};
