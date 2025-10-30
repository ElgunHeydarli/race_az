import Dropdown from '@/assets/svgs/dropdown.svg';
import { useState, useEffect, useRef } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import { ShoppingCart } from 'lucide-react';
import { useBasket } from '@/hooks/useBasket';
import { useGetLogos } from '@/services/logos';
import { useGetCompetitions } from '@/services/competitions';
import { LanguageDropdown } from '../LanguageDropdown';
import { translateds } from '@/context/TranslateContext';
import { LanguageDropdownMobile } from '../LanguageDropdownMobile';

const MainNavbar = () => {
  const competitions_held = translateds('competitions_held');
  const storeText = translateds('store');
  const aboutText = translateds('about_text');
  const partnersText = translateds('partners_text');
  const volunteerText = translateds('volunteer_text');
  const resultText = translateds('result_text');
  const galleryText = translateds('gallery_text');
  const calendarText = translateds('Calendar');
  const cartText = translateds('cart_text');

  const navItems = [
    { id: 1, name: competitions_held, href: '/competitions', hasDropdown: true },
    { id: 2, name: storeText, href: '/products', hasDropdown: false },
    {
      id: 3,
      name: aboutText,
      hasDropdown: true,
      dropdowns: [
        { id: 31, name: partnersText, href: '/partners' },
        { id: 32, name: volunteerText, href: '/volunteers' },
        { id: 33, name: aboutText, href: '/about' }
      ]
    },
    { id: 4, name: resultText, href: '/results', hasDropdown: false }
  ];

  const rightNavItems = [
    // {
    //   id: 5,
    //   name: translateds('partner_competition_text'),
    //   href: '/partner-competitions',
    //   hasDropdown: false,
    // },
    {
      id: 6,
      name: galleryText,
      href: '/gallery',
      hasDropdown: false,
    },
    {
      id: 7,
      name: calendarText,
      href: '/calendar',
      hasDropdown: false,
    },
  ];

  const { data: logos } = useGetLogos();
  const { basket } = useBasket();
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState<boolean>(false);

  const competitionsDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);

  const [mobileMenuStack, setMobileMenuStack] = useState<string[]>([]);

  const { data: competitions } = useGetCompetitions();
  const navigate = useNavigate();

  const isLastElement = (index: number, arr: any[]) => {
    return index === arr.length - 1;
  };

  const handleDropdownHover = (dropdownId: string) => {
    setActiveDropdown(dropdownId);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const pushToMobileStack = (menuId: string) => {
    setMobileMenuStack(prev => [...prev, menuId]);
  };

  const popFromMobileStack = () => {
    setMobileMenuStack(prev => prev.slice(0, -1));
  };

  const closeAllMobileMenus = () => {
    setMobileMenuStack([]);
    setOpen(false);
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    closeAllMobileMenus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        competitionsDropdownRef.current &&
        !competitionsDropdownRef.current.contains(event.target as Node) &&
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (activeDropdown !== 'competitions') {
      setSelectedRaceId(null);
    }
  }, [activeDropdown]);

  return (
    <nav
      className={`absolute ${pathname === '/' ? 'bg-blur backdrop-blur-2xl' : ''
        } border-b-[#FFFFFF14] border-b top-0 left-0 right-0 z-50 bg-[#0000000A] text-white`}
    >
      <div className="main-container">
        <div className="flex justify-between w-full relative items-center min-h-[90px]">
          <div className="hidden lg:flex items-center leading-[90px] gap-[12px] xl:gap-[28px] text-[13px] xl:text-[15px]">
            <div
              ref={competitionsDropdownRef}
              className={`relative flex group w-full leading-[20px] ${activeDropdown === 'competitions' ? 'bg-white/10' : ''
                } p-[10px] transition-colors duration-300 rounded-[12px] items-center gap-[8px]`}
              onMouseEnter={() => handleDropdownHover('competitions')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to={'/competitions'}
                className="text-nowrap relative"
              >
                {competitions_held}
              </Link>
              <span
                className={`w-5 transition-transform duration-200 h-5 flex items-center justify-center ${activeDropdown === 'competitions' ? 'rotate-180' : ''
                  }`}
              >
                <img
                  src={Dropdown || '/placeholder.svg'}
                  alt="Dropdown"
                  className="w-full h-auto"
                />
              </span>

              {activeDropdown === 'competitions' && (
                <div className="absolute left-0 w-full h-8 bottom-0 translate-y-full z-10" />
              )}

              <div
                className={`${activeDropdown === 'competitions'
                  ? 'visible opacity-100'
                  : 'invisible opacity-0 pointer-events-none'
                  } duration-300 dropdown max-w-[490px]  w-[400px] text-[15px] grid grid-cols-1 leading-normal bg-white  text-black rounded-[12px] absolute top-[calc(100%+8px)] shadow-lg z-20`}
                onMouseEnter={() => handleDropdownHover('competitions')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="py-[28px] px-[28px] text-[15px]">
                  {competitions &&
                    competitions.data.map((item, index, arr) => (
                      <div
                        key={item.id}
                        className={`flex flex-col gap-[14px] ${!isLastElement(index, arr) ? 'mb-[14px]' : ''
                          }`}
                      >
                        <div
                          className="flex cursor-pointer items-center justify-between gap-[8px]"
                          onMouseEnter={() => setSelectedRaceId(item.id)}
                        >
                          <Link
                            to={`/competition/${item.slug}`}
                            className={`duration-300 leading-[24px] ${selectedRaceId === item.id ? 'text-[#0B98A1] underline' : ''
                              }`}
                            onClick={closeAllMobileMenus}
                          >
                            {item.name}
                          </Link>
                        </div>
                        {!isLastElement(index, arr) && (
                          <span className="bg-[#00000033] w-[31px] h-[2px]"></span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[8px]">
              <Link
                to={'/products'}
                className=""
              >
                {translateds('store')}
              </Link>
            </div>

            <div
              ref={aboutDropdownRef}
              className={`relative flex group w-full leading-[20px] ${activeDropdown === 'about' ? 'bg-white/10' : ''
                } p-[10px] transition-colors duration-300 rounded-[12px] items-center gap-[8px]`}
              onMouseEnter={() => handleDropdownHover('about')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="text-nowrap relative"
              >
                {translateds('about_text')}
              </button>
              <span
                className={`w-5 transition-transform duration-200 h-5 flex items-center justify-center ${activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
              >
                <img
                  src={Dropdown || '/placeholder.svg'}
                  alt="Dropdown"
                  className="w-full h-auto"
                />
              </span>

              {/* Invisible bridge element to maintain hover */}
              {activeDropdown === 'about' && (
                <div className="absolute left-0 w-full h-8 bottom-0 translate-y-full z-10" />
              )}

              {/* About Us Dropdown Content */}
              <div
                className={`${activeDropdown === 'about'
                  ? 'visible opacity-100'
                  : 'invisible opacity-0 pointer-events-none'
                  } duration-300 dropdown min-w-[200px] w-[400px] text-[15px] leading-normal bg-white text-black rounded-[12px] absolute top-[calc(100%+8px)] left-0 shadow-lg z-20`}
                onMouseEnter={() => handleDropdownHover('about')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="py-5 px-6">
                  {navItems[2].dropdowns?.reverse()?.map((item, index, arr) => (
                    <div
                      key={item.id}
                      className={`flex flex-col ${!isLastElement(index, arr) ? 'mb-5' : ''}`}
                    >
                      <Link
                        to={item.href}
                        className="text-[15px] leading-5 hover:text-[#0B98A1] transition-colors duration-200"
                        onClick={closeAllMobileMenus}
                      >
                        {item.name}
                      </Link>
                      {!isLastElement(index, arr) && (
                        <span className="bg-[#00000014] h-[1px] w-full mt-5"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-center w-full h-auto">
            <div className="flex justify-center">
              <Link to={'/'}>
                <img
                  src={logos && logos.data[0].header_logo}
                  alt={logos && logos.data[0].header_alt}
                  title={logos && logos.data[0].header_title}
                  className="h-12"
                />
              </Link>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex align-center justify-end gap-4">
              <div className="lg:hidden flex align-center justify-end gap-4">
                {LanguageDropdown()}
                <span>
                  <Hamburger
                    toggled={isOpen}
                    toggle={setOpen}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-end text-[13px] xl:text-[15px] items-center gap-[12px] xl:gap-[24px]">
            {/* <Link to={'/partner-competitions'}>
              {translateds('partner_competition_text')}
            </Link> */}
            <div className="">
              <Link
                to={'/results'}
                className=""
              >
                {translateds('result_text')}
              </Link>
            </div>
            <Link to={'/gallery'}>{translateds('gallery_text')}</Link>
            <Link to={'/calendar'}>{translateds('Calendar')}</Link>
            {/* <button className="bg-[rgba(255,255,255,0.12)] flex items-center gap-[8px] cursor-pointer rounded-[12px] py-[8px] px-[12px]">
              AZ
              <span className="w-4 h-4 flex items-center justify-center">
                <img
                  src={Dropdown || '/placeholder.svg'}
                  alt="Dropdown"
                  className="w-full h-auto"
                />
              </span>
            </button> */}
            <LanguageDropdown />
            <div
              className="relative inline-flex bg-[#FFFFFF1F] p-[10px] rounded-full cursor-pointer"
              onClick={() => navigate('/basket')}
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {basket.length}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="lg:hidden fixed top-0 right-0 w-64 h-screen bg-black backdrop-blur-2xl shadow-lg overflow-y-auto z-50"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-end p-4">
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close menu"
                      className="text-white"
                    >
                      <IoMdClose className="text-[24px]" />
                    </button>
                  </div>

                  {/* Main Mobile Menu */}
                  {mobileMenuStack.length === 0 && (
                    <div className="flex-grow">
                      {navItems.concat(rightNavItems).map(item => (
                        <div key={item.id}>
                          {item.hasDropdown ? (
                            <button
                              onClick={() => pushToMobileStack(item.name)}
                              className="flex text-[14px] justify-between items-center w-full py-3 px-6 text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              {item.name}
                              <MdKeyboardArrowRight className="text-xl" />
                            </button>
                          ) : (
                            <Link
                              to={item.href || ''}
                              onClick={() => {
                                setOpen(false);
                                closeAllMobileMenus();
                              }}
                              className="flex text-[14px] justify-between items-center w-full py-3 px-6 text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}

                      {/* Mobile Cart */}
                      <div
                        className="flex items-center gap-2 py-3 px-6 text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleNavigation('/basket')}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{cartText}</span>
                        <div className="ml-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {basket.length}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Competitions Submenu */}
                  <AnimatePresence mode="wait">
                    {mobileMenuStack.includes(competitions_held) && (
                      <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="absolute top-0 right-0 w-64 h-screen bg-black backdrop-blur-2xl shadow-lg overflow-y-auto z-60"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center p-4 border-b border-white/10">
                            <button
                              onClick={popFromMobileStack}
                              aria-label="Go back"
                              className="text-white mr-2"
                            >
                              <MdKeyboardArrowDown className="text-xl rotate-90" />
                            </button>
                            <span className="text-white font-medium">{competitions_held}</span>
                          </div>
                          <div className="flex-grow">
                            {competitions &&
                              competitions.data.map(race => (
                                <Link
                                  key={race.id}
                                  to={`/competition/${race.slug}`}
                                  onClick={closeAllMobileMenus}
                                  className="flex justify-between items-center w-full py-3 px-6 text-white hover:bg-white/10 transition-colors duration-200"
                                >
                                  {race.name}
                                  <FaArrowRightLong className="text-sm" />
                                </Link>
                              ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* About Us Submenu */}
                  <AnimatePresence mode="wait">
                    {mobileMenuStack.includes(translateds('about_text')) && (
                      <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="absolute top-0 right-0 w-64 h-screen bg-black backdrop-blur-2xl shadow-lg overflow-y-auto z-60"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center p-4 border-b border-white/10">
                            <button
                              onClick={popFromMobileStack}
                              aria-label="Go back"
                              className="text-white mr-2"
                            >
                              <MdKeyboardArrowDown className="text-xl rotate-90" />
                            </button>
                            <span className="text-white font-medium">
                              {translateds('about_text')}
                            </span>
                          </div>
                          <div className="flex-grow">
                            {navItems[2].dropdowns?.map(item => (
                              <Link
                                key={item.id}
                                to={item.href}
                                onClick={closeAllMobileMenus}
                                className="flex justify-between items-center w-full py-3 px-6 text-white hover:bg-white/10 transition-colors duration-200"
                              >
                                {item.name}
                                <FaArrowRightLong className="text-sm" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <LanguageDropdownMobile />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
