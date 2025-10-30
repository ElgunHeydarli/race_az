import { Link, useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import moment from 'moment';
import { translateds } from '@/context/TranslateContext';
import { useGetSeoOfPage } from '@/services/seo';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import axios from 'axios';
import { useChangeLang } from '@/hooks/useChangeLang';

const Results = () => {
  const { data: resultsData } = useGetSeoOfPage('results');
  const seoData = resultsData?.data.find((item) => item.key === 'results');
  const { lang } = useChangeLang();

  const [competitionData, setCompetitionsData] = React.useState<any>();
  const getAlls = async () => {
    const res = await axios.get(`https://admin.race.az/api/competitions/get-all`, {
      headers: {
        "Accept-Language": lang,
      },
    });
    if (res.data) {
      setCompetitionsData(res.data);
    }
  }

  React.useEffect(() => {
    getAlls();
  }, [lang]);

  const competitions = competitionData && competitionData.data;
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      {/* <BreadCrumbTitle
        title={translateds('result_text')}
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: translateds('result_text'),
          },
        ]}
      /> */}

      <section className="my-8 pt-[118px]">
        <div className="main-container">
          <div className="flex flex-col gap-4">
            {competitions &&
              competitions.map((item: any) => (
                <div
                  onClick={() => navigate(`/result/${item.slug}`)}
                  key={item.id}
                  className="flex cursor-pointer flex-col rounded-[12px] justify-between bg-[#FFFFFF0A] py-[40px] px-[40px]">
                  <div className="text-sm text-gray-400">
                    {moment(item.competition_start_date).format('DD.MM.YYYY')}
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-base text-white">{item.name}</h2>
                    <Link
                      to={String(item.id)}
                      className="flex items-center gap-2 text-[#53C5D7] transition-colors hover:text-[#53C5D7]/80">
                      {translateds('see_more')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Results;
