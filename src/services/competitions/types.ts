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
  status: boolean;
  distance: string;
  map_link: string;
  registration_status: boolean;
  is_registration_expired: boolean;
  price: string;
  slug: string;
  order: number;
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
