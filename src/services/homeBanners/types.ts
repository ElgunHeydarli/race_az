export interface HomeBanner {
  id: number;
  title: string;
  description: string;
  background_image: string;
  buttons: {
    text: string;
    link: string;
  }[];
}

export interface HomeBannerResponse {
  has_banner: boolean;
  banner: HomeBanner | null;
}