import { useState, useEffect } from 'react';
import Bottom from '@/assets/svgs/bottom.svg';
import { useGetLogos } from '@/services/logos';
import { useGetSocials } from '@/services/socials';
import { Link } from 'react-router';
import { translateds } from '@/context/TranslateContext';

const Footer = () => {

  const [showScrollTop, setShowScrollTop] = useState(false);
  const { data: logos } = useGetLogos();
  const { data: socials } = useGetSocials();
  const socialData = socials && socials.data;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 md:pt-12 relative border-t-[#FFFFFF0F] border-t text-white">
      <div className="main-container">
        <div className="flex items-center justify-center w-full mb-8 md:mb-12">
          <Link to={'/'}>
            <img
              src={logos && logos.data[0].footer_logo}
              alt={logos && logos.data[0].footer_alt}
              title={logos && logos.data[0].footer_title}
              className="h-12 md:h-16"
            />
          </Link>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 pb-12 md:pb-16">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {translateds('about_text')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/about">{translateds('our_team')}</Link>
              </li>
              <li>
                <Link to="/volunteers">{translateds('volunteer_text')}</Link>
              </li>
              <li>
                <Link to="/partners">{}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{competitions_held}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {competitions &&
                competitions.map(({ name, slug }) => (
                  <li key={slug}>
                    <Link to={`/competition/${slug}`}>{name}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {translateds('other_links')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/gallery">{translateds('store')}</Link>
              </li>
              <li>
                <Link to="/gallery">{translateds('gallery_text')}</Link>
              </li>
              <li>
                <Link to="/results">{translateds('result_text')}</Link>
              </li>
              <li>
                <Link to="/calendar">{translateds('Calendar')}</Link>
              </li>
              <li>
                <Link to="/partners">
                  {translateds('partner_competition_text')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {translateds('contact_information')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {contacts &&
                contacts.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt="Location"
                      className="w-4 h-4"
                    />
                    <span>{item.value}</span>
                  </li>
                ))}
              {/* <li className="flex items-center gap-2">
                <img
                  src={Phone || '/placeholder.svg'}
                  alt="Phone"
                  className="w-4 h-4"
                />
                <span>+994 00 000 00 00</span>
              </li> 
            </ul>
          </div>
        </div> */}

        <div className="flex justify-center space-x-6 pb-8">
          {socialData &&
            socialData.map((item) => (
              <SocialIcon key={item.id} link={item.link} Icon={item.image} />
            ))}
        </div>

        <div className="border-t border-gray-700 py-6">
          <p className="text-sm text-gray-400 text-center">
            © 2024 RACE.az. {translateds('all_rights')}.
          </p>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed cursor-pointer bottom-5 right-5 z-50 bg-[#8BEAF9] rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-opacity hover:opacity-80 focus:outline-none"
          aria-label="Scroll to top">
          <img
            src={Bottom || '/placeholder.svg'}
            className="w-5 h-5"
            alt="Scroll to top"
          />
        </button>
      )}
    </footer>
  );
};

const SocialIcon = ({ Icon, link }: { Icon: string; link: string }) => (
  <Link
    target="_blank"
    to={link}
    className="text-gray-400 hover:text-white transition-colors">
    <img src={Icon} className="w-5 h-5 object-cover" alt="social icon" />
  </Link>
);

export default Footer;
