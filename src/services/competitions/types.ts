import { BaseResponseType, Entity, ImageProps } from '@/types';

export type RegistrationDates = {
  start: string;
  end: string;
};

export type GalleryItem = {
  year: string;
  image_link: string;
};

export type Distance = Entity<{
  distance: string;
  price: string;
  max_participants: number;
  current_participants: number;
  remainder_participants: number;
  status: string;
  order?: number;
}>;

export type Logistic = {
  available: boolean;
  price: number;
};

export type TentRental = {
  available: boolean;
  price: number;
};

export type LogisticsServices = {
  logistics: Logistic;
  tent_rental: TentRental;
  donation: {
    title?: string;
    available: boolean;
    price: number;
  };
  number: {
    available: boolean;
    price: number;
  };
};

export type ProductColor = {
  name: string;
  code: string;
};

export type AvailableProduct = {
  id: number;
  name: string;
  name_az?: string;
  price: number;
  image: string;
  sizes?: string[];
  colors?: ProductColor[];
  in_stock: boolean;
  stock?: number;
};

export type FormFieldConfig = {
  enabled: boolean;
  label?: string;
  label_az?: string;
  placeholder?: string;
  placeholder_az?: string;
};

export type FormConfig = {
  name?: FormFieldConfig;
  surname?: FormFieldConfig;
  birth_date?: FormFieldConfig;
  gender?: FormFieldConfig;
  itra_code?: FormFieldConfig;
  team_name?: FormFieldConfig;
  country_id?: FormFieldConfig;
  email?: FormFieldConfig;
  phone?: FormFieldConfig;
  distance_id?: FormFieldConfig;
  logistics?: FormFieldConfig;
  tent_rental?: FormFieldConfig;
  donation?: FormFieldConfig;
  race_number?: FormFieldConfig;
  promo_code?: FormFieldConfig;
  terms_accepted?: FormFieldConfig;
};

export type Competition = {
  id: number;
  name: string;
  mobile_image: string;
  text: string;
  description: string;
  consent_text: string;
  location: string;
  organizer_name: string;
  rules: string;
  image: string;
  image_alt: string;
  bottom_image: string;
  bottom_image_alt: string;
  document_file: string;
  registration_dates: RegistrationDates;
  competition_start_date: string;
  competition_duration: number;
  logistics_services: LogisticsServices;
  distances: Distance[];
  gallery_items: GalleryItem[];
  available_products?: AvailableProduct[];
  form_config?: FormConfig;
  status: boolean;
  distance: string;
  map_link: string;
  registration_status: boolean;
  is_registration_expired: boolean;
  price: string;
  slug: string;
  order: number;
  is_race_az_event: boolean;
  created_at: string;
  updated_at: string;
};

export type Participant = Entity<{
  name: string;
  surname: string;
  team_name: string;
  distance: string;
  rank: number;
  has_rank: boolean;
  rank_visible: boolean;
  approved_at: string;
  country: { id: number; name: string; image: string };
}>;

export type CompetitionBannerType = {
  title: string;
} & ImageProps;

export type GalleryLink = {
  url: string;
};

export type GalleryItemDetail = {
  year: string;
  links: GalleryLink[];
};

export type BaseCompetitionResponse = BaseResponseType<Competition[]>;

export type BaseCompetitionDeailResponse = BaseResponseType<Competition>;

export type BasePaticipantsResponse = {
  participants: Participant[];
};

export type BaseCompetitionBannerResponse = BaseResponseType<CompetitionBannerType[]>;

export type BaseCompetitionGalleryResponse = {
  competition: { name: string };
  gallery_years: GalleryItemDetail[];
};
