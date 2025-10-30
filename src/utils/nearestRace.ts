import { Competition } from '@/services/competitions/types';

export function findNearestFutureRace(
  races: Competition[]
): Competition | null {
  if (!races || races.length === 0) return null;

  const now = new Date();

  const futureRaces = races.filter((race) => {
    const raceDate = new Date(race.competition_start_date);
    return (
      raceDate >= now && 
      // race.registration_status &&
      !race.is_registration_expired
    );
  });

  if (futureRaces.length === 0) return null;

  futureRaces.sort((a, b) => {
    const dateA = new Date(a.competition_start_date);
    const dateB = new Date(b.competition_start_date);
    return dateA.getTime() - dateB.getTime();
  });

  return futureRaces[0];
}
