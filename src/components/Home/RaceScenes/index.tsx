import { useRef } from 'react';
import Marquee from 'react-fast-marquee';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/UI/SectionTitle';
import { useGetHomeGalleries } from '@/services/home';
import { translateds } from '@/context/TranslateContext';

gsap.registerPlugin(ScrollTrigger);

const RaceScenes = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { data } = useGetHomeGalleries();
  const galleryItems = data?.data || [];

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom-=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 overflow-hidden w-full">
      <div className="main-container">
        <SectionTitle
          title={translateds('images_races')}
          btnText={translateds('all_text')}
          btnLink="/gallery"
        />
      </div>

      <div>
        <Marquee
          speed={40}
          gradient={true}
          gradientColor="255, 255, 255"
          gradientWidth={60}>
          {galleryItems.map((item, index) => (
            <div
              key={`left-${item?.id || index}`}
              className="w-[280px] h-[350px] flex-shrink-0 overflow-hidden shadow-lg ">
              <img
                className="w-full h-full object-cover"
                src={item?.image || '/placeholder.svg'}
                alt={item?.image_alt || `Race scene ${index + 1}`}
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="">
        <Marquee
          speed={30}
          direction="right"
          gradient={true}
          gradientColor="255, 255, 255"
          gradientWidth={60}>
          {galleryItems.map((item, index) => (
            <div
              key={`right-${item?.id || index}`}
              className="w-[280px] h-[350px] flex-shrink-0 overflow-hidden shadow-lg  transition-transform duration-300">
              <img
                className="w-full h-full object-cover"
                src={item?.image || '/placeholder.svg'}
                alt={item?.image_alt || `Race scene ${index + 5}`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default RaceScenes;
