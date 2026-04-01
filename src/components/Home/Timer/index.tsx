import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import TimerBox from './TimerBox';
import { useGetHomepageCompetitions } from '@/services/competitions';
import { findNearestFutureRace } from '@/utils/nearestRace';

interface TimerUnit {
  value: number;
  label: string;
}

function getCachedDate(): Date | null {
  try {
    const cached = localStorage.getItem('race_hero_cache');
    if (cached) {
      const data = JSON.parse(cached);
      if (data.competition_start_date) {
        return new Date(data.competition_start_date);
      }
    }
  } catch {}
  return null;
}

const Timer = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(getCachedDate);

  const { data: allCompetitionsData } = useGetHomepageCompetitions();
  const competitions = allCompetitionsData?.data || [];

  useEffect(() => {
    if (competitions && competitions.length > 0) {
      const nextRace = findNearestFutureRace(competitions);

      if (nextRace?.competition_start_date) {
        setTargetDate(new Date(nextRace.competition_start_date));
      } else {
        setTargetDate(new Date(Date.now() + 86400000));
      }
    }
  }, [competitions]);

  const defaultUnits: TimerUnit[] = [
    { value: 0, label: 'Gün' },
    { value: 0, label: 'Saat' },
    { value: 0, label: 'Dakika' },
    { value: 0, label: 'Saniye' },
  ];

  const renderUnits = (units: TimerUnit[]) => (
    <div className="timer px-[15px] md:px-[20px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
        {units.map((unit, index) => (
          <TimerBox key={index} value={unit.value} label={unit.label} />
        ))}
      </div>
    </div>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) return renderUnits(defaultUnits);
    return renderUnits([
      { value: days, label: 'Gün' },
      { value: hours, label: 'Saat' },
      { value: minutes, label: 'Dakika' },
      { value: seconds, label: 'Saniye' },
    ]);
  };

  if (!targetDate) return renderUnits(defaultUnits);

  return (
    <Countdown
      date={targetDate}
      renderer={renderer}
    />
  );
};

export default Timer;
