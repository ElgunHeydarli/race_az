export type Tab = {
  id: 'general' | 'participant' | 'registration' | 'contact';
  label: string;
};

export const tabs: Tab[] = [
  { id: 'general', label: 'Ümumi məlumat' },
  { id: 'participant', label: 'İştirakçılar' },
  { id: 'registration', label: 'Qaydalar və şərtlər' },
  { id: 'contact', label: 'Razılıq ərizəsi' },
];
