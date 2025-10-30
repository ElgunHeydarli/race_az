export enum ProductCategory {
  ALL = 'all',
}

export interface Filter {
  title?: string;
  id: string;
}

export const BUTTON_STYLES = {
  buttonBase:
    'px-[24px] py-[14px] cursor-pointer rounded-[12px] transition-colors whitespace-nowrap',
  buttonActive: 'bg-white text-[#04848C]',
  buttonInactive: 'bg-[#FFFFFF3D] text-white hover:bg-[#FFFFFF4D]',
} as const;
