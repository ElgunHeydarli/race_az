import { Gender } from '../participants';

export type Result = {
  id: number;
  name: string;
  gender: Gender;
  club: string;
  participantNumber: string;
  category: string;
  distance: string;
  result: string;
};

export const results: Result[] = [
  {
    id: 1,
    name: 'İlahə Nazarova',
    gender: 'Qadın',
    club: 'Klub',
    participantNumber: '0002',
    category: 'Kateqoriya',
    distance: '58 KM',
    result: '58 KM',
  },
];

type ResultColumnKey = keyof Result;

type ParticipantColumnType = {
  key: ResultColumnKey;
  header: string;
};

export const resultsColumns: ParticipantColumnType[] = [
  { key: 'id', header: '№' },
  { key: 'name', header: 'Ad və soyad' },
  { key: 'club', header: 'Klub' },
  { key: 'participantNumber', header: 'İştirakçı no' },
  { key: 'gender', header: 'Cins' },
  { key: 'category', header: 'Kateqoriya' },
  { key: 'distance', header: 'Məsafə' },
  { key: 'result', header: 'Nəticə' },
];
