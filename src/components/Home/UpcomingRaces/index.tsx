import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionTitle from '@/components/UI/SectionTitle';
import 'swiper/css';
import RaceCard from '@/components/UI/RaceCard';
import { useGetCompetitions } from '@/services/competitions';
import { translateds } from '@/context/TranslateContext';

const UpcomingRaces = () => {
  const sectionRef = useRef(null);
  const { data } = useGetCompetitions();
  const competitionsData = data && data.data;

  const held_competitions = translateds('held_competitions');
  const all_competitions = translateds('all_competitions');

  // Əgər heç bir tədbir yoxdursa, bölməni göstərmə
  if (!competitionsData || competitionsData.length === 0) {
    return null;
  }

  return (
    <motion.section
      ref={sectionRef}
      className="backdrop-blur-3xl bg-[#111216] py-16"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full">
        <div className="main-container">
          <SectionTitle btnLink="/competitions" title={held_competitions} btnText={all_competitions} />
        </div>

        <div className="px-[40px]">
          <div className="pb-[100px]">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                1200: {
                  slidesPerView: 4,
                },
                968: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 1,
                },
              }}
              loop
              className="!pb-8 "
            >
              {competitionsData?.map(item => (
                <SwiperSlide key={item.id} className="min-w-0">
                  <RaceCard
                    date={item.competition_start_date}
                    location={item.location}
                    variant="fixed"
                    id={item.id}
                    name={item.name}
                    text={item.text}
                    slug={item.slug}
                    image={item.image}
                    imageAlt={item.image_alt}
                    registration_status={item.registration_status}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default UpcomingRaces;