import { motion } from 'framer-motion';

const CompetitionBanner = ({
  image,
  title,
}: {
  image: string;
  title: string;
  showSearch?: boolean;
}) => {
  return (
    <>
      <section
        className="relative bg-cover h-[100px] md:h-[200px] flex justify-center items-center overflow-hidden"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center center',
        }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.36)]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black to-transparent"
        />
        <div
          className=" absolute sm:w-fit w-[80%] top-[40%] lg:top-[35%] left-1/2 transform -translate-x-1/2 
">
          <div className="flex items-center flex-col gap-[35px] lg:gap-[54px]">
            <h2 className="text-[21px] md:text-[25px] lg:text-[40px] font-normal text-white text-center w-full">
              {title}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompetitionBanner;
