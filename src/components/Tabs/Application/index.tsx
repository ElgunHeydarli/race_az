import PrimaryButton from '@/components/UI/PrimaryButton';
import { translateds } from '@/context/TranslateContext';
import { useGetTerms } from '@/services/competitions';
import { useParams } from 'react-router';

const Application = () => {
  const { slug } = useParams();
  const { data: competitionDetailData } = useGetTerms(slug ?? '');
  const documentUrl = competitionDetailData?.document_file;

  const handleDownload = () => {
    if (documentUrl) {
      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = 'document.pdf';
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <>
      <section className="pb-[100px]">
        <div className="main-container">
          <div>
            <PrimaryButton
              onClick={handleDownload}
              className="max-w-[178px] text-nowrap">
              {translateds('dowload_pdf')}
            </PrimaryButton>
          </div>
          <div className="mt-[40px]">
            <h2 className="text-[24px] text-white mb-[20px] font-[400]">
              {translateds("raziliq_erizesi")}
            </h2>
            <p
              className="text-[#FFFFFFCC]"
              dangerouslySetInnerHTML={{
                __html: competitionDetailData?.consent_text || '',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Application;
