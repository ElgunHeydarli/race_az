import { HomeBanner as HomeBannerType } from "../../../services/homeBanners/types";
import { motion } from "framer-motion";
import { BarChart3, Images } from "lucide-react";
import { Link } from "react-router";

interface HomeBannerProps {
  banner: HomeBannerType;
}

const HomeBanner = ({ banner }: HomeBannerProps) => {
  // Title-dan slug yaratmaq
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const competitionSlug = createSlug(banner.title);

  // Button üçün ikon seçimi
  const getButtonIcon = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("nəticə") || lowerText.includes("result")) {
      return <BarChart3 className="w-5 h-5" />;
    }
    if (
      lowerText.includes("şəkil") ||
      lowerText.includes("gallery") ||
      lowerText.includes("photo")
    ) {
      return <Images className="w-5 h-5" />;
    }
    return null;
  };

  // Düzgün link yaratmaq
  const getButtonLink = (text: string) => {
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes("nəticə") ||
      lowerText.includes("result") ||
      lowerText.includes("результаты")
    ) {
      return `/result/${competitionSlug}`;
    }
    if (
      lowerText.includes("şəkil") ||
      lowerText.includes("gallery") ||
      lowerText.includes("photo") ||
      lowerText.includes("фотографии")
    ) {
      return `/gallery/${competitionSlug}`;
    }
    return "#";
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${banner.background_image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full px-4 text-center text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {banner.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto"
        >
          {banner.description}
        </motion.p>

        {/* Yaxşılaşdırılmış Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto px-4"
        >
          {banner.buttons.map((button, index) => {
            const icon = getButtonIcon(button.text);
            const linkUrl = getButtonLink(button.text);

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={linkUrl}
                  className="
                    group relative overflow-hidden
                    flex items-center justify-center gap-3
                    w-full sm:w-auto
                    px-6 sm:px-8 py-4
                    bg-white/10 backdrop-blur-md
                    hover:bg-white/20
                    text-white font-semibold text-base
                    rounded-xl
                    border-2 border-white/30
                    hover:border-white/50
                    transition-all duration-300
                    shadow-lg hover:shadow-2xl
                    hover:shadow-white/20
                  "
                >
                  {/* Hover Background Effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#53C5D7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                  {/* Icon */}
                  {icon && (
                    <span className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
                      {icon}
                    </span>
                  )}

                  {/* Text */}
                  <span className="relative z-10">{button.text}</span>

                  {/* Shine Effect */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeBanner;
