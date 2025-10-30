import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useGetQualities } from '@/services/quality';

interface StatItemProps {
  count: number | string;
  title: string;
}

const StatItem: React.FC<StatItemProps> = ({ count, title }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center text-white">
      <span className="font-unbounded font-normal sm:text-[48px] text-[28px]">
        {inView ? (
          <CountUp
            start={0}
            end={Number(count)}
            duration={2.5}
            suffix="+"
            useEasing={true}
          />
        ) : (
          '0+'
        )}
      </span>
      <span className="font-light text-base sm:text-sm text-white/80 text-center">
        {title}
      </span>
    </div>
  );
};

const Divider: React.FC = () => (
  <div className="hidden sm:flex items-center md:px-[40px] px-[20px] lg:px-[100px] justify-center">
    <span className="bg-white/20 w-[1px] sm:h-[96px] h-[48px] transform rotate-[15deg]"></span>
  </div>
);

const StatsDisplay: React.FC = () => {
  const { data: qualityData } = useGetQualities();

  return (
    <section className="py-[90px] bg-black">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-4">
        {qualityData &&
          qualityData?.data.map((item, index) => (
            <React.Fragment key={index}>
              <StatItem count={item?.count} title={item.title} />
              {index < qualityData.data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
      </div>
    </section>
  );
};

export default StatsDisplay;
