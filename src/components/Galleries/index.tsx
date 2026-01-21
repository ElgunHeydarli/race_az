import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  fadeUpVariants,
  staggerChildrenVariants,
} from "@/animations/framer/variants/fadeVariants";
import { Link, useNavigate } from "react-router";
import { translateds } from "@/context/TranslateContext";
import axios from "axios";
import { useChangeLang } from "@/hooks/useChangeLang";
import React from "react";

export default function Galleries() {
  const { lang } = useChangeLang();
  const [competitionData, setCompetitionsData] = React.useState<any>();
  const getAlls = async () => {
    try {
      const res = await axios.get(
        `https://admin.race.az/api/competitions/galleries`,
        {
          headers: {
            "Accept-Language": lang,
          },
        },
      );
      if (res.data) {
        setCompetitionsData(res.data);
      }
    } catch (error) {
      console.error('Gallery API Error:', error);
    }
  };

  React.useEffect(() => {
    getAlls();
  }, [lang]);

  const competitions = competitionData && competitionData.galleries;
  const navigate = useNavigate();
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit="exit"
      className="pt-[48px] pb-[100px]"
    >
      <div className="main-container">
        <h1 className="gallery-page-title">{translateds("gallery_text")}</h1>
        <motion.div
          variants={staggerChildrenVariants}
          className="flex flex-col gap-4"
        >
          {competitions &&
            competitions.map((item: any) => (
              <motion.div
                key={item.id}
                onClick={() => navigate(item.slug)}
                variants={fadeUpVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex flex-col rounded-[12px] justify-between bg-[#FFFFFF0A] py-[40px] px-[40px] cursor-pointer"
              >
                <motion.div
                  variants={fadeUpVariants}
                  className="text-sm text-gray-400"
                >
                  {/* {moment(item.registration_dates.start).format('DD.MM.YYYY')} */}
                </motion.div>

                <div className="flex items-center justify-between">
                  <motion.h2
                    variants={fadeUpVariants}
                    className="text-base text-white"
                  >
                    {item.name}
                  </motion.h2>

                  <Link
                    to={item.slug}
                    className="flex items-center gap-2 text-[#53C5D7] transition-colors hover:text-[#53C5D7]/80"
                  >
                    {translateds("see_more")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
