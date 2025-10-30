import { Tab, tabs } from '@/data/tabs';
import Share from '@/assets/svgs/share.svg';
import { useTab } from '@/hooks/useTab';
import { useMemo } from 'react';
import { translateds } from '@/context/TranslateContext';
import toast from 'react-hot-toast';
const CompetitionDetailTabs = () => {
  const { activeTab, setActiveTab } = useTab();

  const general_information = translateds('general_information');
  const participants_text = translateds('Participants');
  const terms_condition = translateds('terms_condition');
  const consent_application = translateds('consent_application');

  const translateById = (text: Tab) => {
    switch (text.id) {
      case 'general':
        return general_information;
      case 'participant':
        return participants_text;
      case 'registration':
        return terms_condition;
      case 'contact':
        return consent_application;
      default:
        return '';
    }
  };

  const translatedTabs = useMemo(() => {
    return tabs.map((item) => ({
      ...item,
      translatedName: translateById(item),
    }));
}, [general_information, participants_text, terms_condition, consent_application]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };
  return (
    <nav className="mt-[28px] mb-[30px]">
      <div className="main-container">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[40px] w-full">
          <div className="bg-[#FFFFFF0D] no-scrollbar py-4 px-4 sm:py-[20px] sm:px-[20px] w-full rounded-[12px] overflow-x-auto">
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-[28px]">
              {translatedTabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`${
                    item.id === activeTab
                      ? 'text-[#8BEAF9] border-b'
                      : 'text-[#FFFFFF99]'
                  } cursor-pointer whitespace-nowrap text-sm sm:text-base`}>
                  {item.translatedName}
                </button>
              ))}
            </div>
          </div>
          <div
            onClick={handleShare}
            className="cursor-pointer flex items-center gap-2 sm:flex-col sm:gap-[6px] text-white justify-center">
            <span className="w-[40px] sm:w-[48px] bg-[#FFFFFF0D] rounded-full p-[10px] sm:p-[12px] inline-flex justify-center items-center h-[40px] sm:h-[48px]">
              <img
                className="object-cover w-[20px] sm:w-[24px] h-[20px] sm:h-[24px]"
                src={Share || '/placeholder.svg'}
                alt="Paylaş"
              />
            </span>
            <span className="text-[10px] sm:text-[12px]">
              {translateds('share')}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CompetitionDetailTabs;
