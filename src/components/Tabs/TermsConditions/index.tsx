import { translateds } from '@/context/TranslateContext';
import { useGetRules } from '@/services/competitions';
import { useParams } from 'react-router';

const TermsConditions = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: competitionDetailData } = useGetRules(slug ?? '');

  return (
    <section className="py-[40px]">
      <div className="main-container">
        <div>
          <h2 className="text-[24px] text-white mb-[20px] font-[400] text-center">
            {translateds('terms_condition')}
          </h2>
          <p
            className="text-[#FFFFFFCC]"
            dangerouslySetInnerHTML={{
              __html: competitionDetailData?.rules_html || '',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
