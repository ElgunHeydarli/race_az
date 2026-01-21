import { translateds } from '@/context/TranslateContext';
import { Participant } from '@/services/competitions/types';
import { useMatch } from 'react-router';

export type Gender = 'Qadın' | 'Kişi';

type ParticipantColumnKey = keyof Participant | 'index' | 'gender' | 'flag' | 'category' | 'result' | 'bibnr';

export type ParticipantColumnType = {
  key: ParticipantColumnKey;
  header: string;
};

export const usePartCol = (): { participantsColumns: ParticipantColumnType[] } => {
  const isResultLocation = useMatch('/result/:slug');
  const isCompetitionLocation = useMatch('/competition/:slug');

  const nameTitle = translateds('ad_ve_soyad');
  const cinsTitle = translateds('cins_title');
  const olkeTitle = translateds('olke_title');
  const kateqoriyaTitle = translateds('category_title');
  const neticeTitle = translateds('netice_title');
  const klubTitle = translateds('klub_title');
  const mesafeTitle = translateds('mesafe_title');
  const komandaTitle = translateds('komanda_title');

  const baseColumns: ParticipantColumnType[] = [
    { key: 'name', header: nameTitle },
    { key: 'gender', header: cinsTitle },
    { key: 'flag', header: olkeTitle },
  ];

  const resultColumns: ParticipantColumnType[] = isResultLocation
    ? [
        { key: 'category', header: kateqoriyaTitle },
        { key: 'result', header: neticeTitle },
      ]
    : [];

  // @ts-expect-error competitionColumns
  const competitionColumns: ParticipantColumnType[] = isCompetitionLocation
    ? [
        { key: 'club', header: klubTitle },
        { key: 'distance', header: mesafeTitle },
        { key: 'team', header: komandaTitle },
      ]
    : [];

  const participantsColumns = [...baseColumns, ...resultColumns, ...competitionColumns];

  return {
    participantsColumns,
  };
};
