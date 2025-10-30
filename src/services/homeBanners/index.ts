import { axiosClient } from "../../api/axiosClient";
import { HomeBannerResponse } from "./types";

export const getHomeBanner = async (
  locale: string = "az"
): Promise<HomeBannerResponse> => {
  const response = await axiosClient.get<HomeBannerResponse>("/home-banner", {
    headers: {
      "Accept-Language": locale,
    },
  });
  return response.data;
};