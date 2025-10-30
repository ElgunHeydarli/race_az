export type SortOption = {
  label: string;
  value: boolean | string;
};

export const competitionSortOptions: SortOption[] = [
  { label: 'Qeydiyyat açıq', value: 'registration_status_true' },
  { label: 'Qeydiyyat bağlı', value: 'registration_status_false' },
  // { label: 'Köhnələr', value: false },
];

export const productSortOptions: SortOption[] = [
  { label: 'Ucuzdan Bahaya', value: 'price_asc' },
  { label: 'Bahadan Ucuza', value: 'price_desc' },
];
