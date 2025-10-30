import { useChangeLang } from "@/hooks/useChangeLang";
import axios from "axios";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

interface Props {
  customStyle?: React.CSSProperties;
}

interface VolunteerPartnerDataInterface {
  id: number;
  image: string;
  image_title: string;
  image_alt: string;
  url: string;
}

const FeaturePartners: React.FC<Props> = ({ customStyle }) => {
  const { lang } = useChangeLang();
  const [volunteerPartnerData, setVolunteerPartnerData] =
    React.useState<VolunteerPartnerDataInterface[]>();

  const getAlls = async () => {
    const res = await axios.get(
      `https://admin.race.az/api/volunteer-partners`,
      {
        headers: {
          "Accept-Language": lang,
        },
      }
    );
    if (res.data) {
      setVolunteerPartnerData(res.data?.data);
    }
  };

  React.useEffect(() => {
    getAlls();
  }, [lang]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    volunteerPartnerData &&
    volunteerPartnerData?.length > 0 && (
      <div
        style={customStyle}
        className="bg-[#FFFFFF0D] mt-5 rounded-[12px] p-[20px] lg:p-[40px] w-full"
      >
        <div className="w-full flex">
          {volunteerPartnerData && volunteerPartnerData.length > 0 && (
            <Marquee
              speed={30}
              direction="left"
              gradient={true}
              gradientColor="255, 255, 255"
              gradientWidth={60}
            >
              {volunteerPartnerData.map(
                (item: VolunteerPartnerDataInterface, index: number) => (
                  <div
                    onClick={() => {
                      setSelectedImage(item.image);
                      setIsOpen(true);
                    }}
                    key={`right-${item?.id || index}`}
                    className="w-[300px] h-[400px] flex-shrink-0 overflow-hidden shadow-lg transition-transform duration-300"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={item?.image || "/placeholder.svg"}
                      alt={item?.image_alt || `Race scene ${index + 1}`}
                    />
                  </div>
                )
              )}
            </Marquee>
          )}
        </div>

        {isOpen && selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative max-w-4xl w-full p-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-lg"
              />
              <button
                className="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1 font-bold hover:bg-red-600"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default FeaturePartners;
