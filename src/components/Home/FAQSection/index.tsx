import { useGetHomeQuestions } from '@/services/home';
import FAQItem from './FAQItem';
import { translateds } from '@/context/TranslateContext';

const FAQSection = () => {
  const { data } = useGetHomeQuestions();
  return (
    <section className="bg-[#07080D] py-16 md:py-[100px]">
      <div className="main-container">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[62px] text-white">
          <div className="w-full md:w-5/12">
            <h3 className="text-3xl md:text-[40px] leading-tight">
              {translateds('faq_text')}
            </h3>
          </div>

          <div className="w-full md:w-7/12 flex flex-col gap-4">
            {data &&
              data.data.map((item) => (
                <FAQItem
                  key={item.id}
                  text={item.title}
                  description={item.description}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
