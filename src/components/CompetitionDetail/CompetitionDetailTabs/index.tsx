import { Tab, tabs } from '@/data/tabs';
import { useTab } from '@/hooks/useTab';
import { useMemo } from 'react';
import { translateds } from '@/context/TranslateContext';
import { useParams } from 'react-router';
import { useGetCompetitions } from '@/services/competitions';
const CompetitionDetailTabs = () => {
  const { activeTab, setActiveTab } = useTab();
  const { slug } = useParams<{ slug: string }>();
  const { data: competitions } = useGetCompetitions();

  const general_information = translateds('general_information');
  const participants_text = translateds('Participants');
  const terms_condition = translateds('terms_condition');
  const consent_application = translateds('consent_application');

  const currentCompetition = competitions?.data?.find(comp => comp.slug === slug);

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

  return (
    <nav className="mt-[28px] mb-[30px]">
      <div className="main-container">
        {/* Event Title - Centered above tabs */}
        {currentCompetition && (
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium text-center mb-8">
            {currentCompetition.name}
          </h1>
        )}

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
      </div>
    </nav>
  );
};

export default CompetitionDetailTabs;
