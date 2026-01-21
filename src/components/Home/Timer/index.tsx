import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import TimerBox from './TimerBox';
import { motion } from 'framer-motion';
import { useGetCompetitions } from '@/services/competitions';
import { findNearestFutureRace } from '@/utils/nearestRace';

interface TimerUnit {
  value: number;
  label: string;
}

const Timer = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const { data: allCompetitionsData } = useGetCompetitions();
  const competitions = allCompetitionsData?.data || [];

  useEffect(() => {
    if (competitions && competitions.length > 0) {
      const nextRace = findNearestFutureRace(competitions);

      if (nextRace?.competition_start_date) {
        console.log(nextRace.competition_start_date);
        setTargetDate(new Date(nextRace.competition_start_date));
      } else {
        setTargetDate(new Date(Date.now() + 86400000));
      }
    }
  }, [competitions]);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      const completedUnits: TimerUnit[] = [
        { value: 0, label: 'Gün' },
        { value: 0, label: 'Saat' },
        { value: 0, label: 'Dakika' },
        { value: 0, label: 'Saniye' },
      ];

      return (
        <div className="timer md:py-[40px] py-[30px] px-[15px] md:px-[20px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
            {completedUnits.map((unit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                <TimerBox
                  value={unit.value}
                  label={unit.label}
                />
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    const timerUnits: TimerUnit[] = [
      { value: days, label: 'Gün' },
      { value: hours, label: 'Saat' },
      { value: minutes, label: 'Dakika' },
      { value: seconds, label: 'Saniye' },
    ];

    return (
      <div className="timer md:py-[40px] py-[30px] px-[15px] md:px-[20px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
          {timerUnits.map((unit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <TimerBox
                value={unit.value}
                label={unit.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  if (!targetDate) {
    const placeholderUnits: TimerUnit[] = [
      { value: 0, label: 'Gün' },
      { value: 0, label: 'Saat' },
      { value: 0, label: 'Dakika' },
      { value: 0, label: 'Saniye' },
    ];

    return (
      <div className="timer md:py-[40px] py-[30px] px-[15px] md:px-[20px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
          {placeholderUnits.map((unit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <TimerBox
                value={unit.value}
                label={unit.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Countdown
      date={targetDate}
      renderer={renderer}
    />
  );
};

export default Timer;
