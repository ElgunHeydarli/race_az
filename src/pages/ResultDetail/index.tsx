import ParticipantTable from '@/components/UI/ParticipantTable';
import { translateds } from '@/context/TranslateContext';
import { usePartCol } from '@/data/participants';
import { useChangeLang } from '@/hooks/useChangeLang';
import { useGetResult } from '@/services/results';
import { useGetSeoOfPage } from '@/services/seo';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

const ResultDetail = () => {
  const { participantsColumns } = usePartCol();
  const { data: resultDetailData } = useGetSeoOfPage('resultDetail');
  const { lang } = useChangeLang();
  const seoData = resultDetailData?.data.find(item => item.key === 'resultDetail');

  const { slug } = useParams();
  const { data: resultData } = useGetResult(slug ?? '');

  // const results = resultData?.results;

  const [value] = useState('');
  // const handleChange = (val: string) => setValue(val);

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [distances, setDistances] = useState<{ id: number; name: string }[]>([]);
  const [selectedDistanceId, setSelectedDistanceId] = useState<number | null>(null);
  const [resultsNew, setResultsNew] = useState<any[]>([]);

  useEffect(() => {
    if (!resultData?.competition?.id) return;
    const getDistances = async () => {
      const res = await axios.get(`https://admin.race.az/api/competitions/${resultData.competition.id}/distances`, {
        headers: { 'Accept-Language': lang },
      });
      if (Array.isArray(res.data)) setDistances(res.data);
    };
    getDistances();
  }, [resultData?.competition?.id, lang]);

  useEffect(() => {
    if (!selectedDistanceId) return;
    const getDistanceResults = async () => {
      try {
        const res = await axios.get(
          `https://admin.race.az/api/competition-distances/${selectedDistanceId}/results`,
          { headers: { 'Accept-Language': lang } }
        );
        if (res.data) {
          setResultsNew(res.data?.results);
          setCategories(res.data?.categories);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getDistanceResults();
  }, [selectedDistanceId, lang]);

  useEffect(() => {
    if (distances.length > 0 && selectedDistanceId === null) {
      setSelectedDistanceId(distances[0].id);
    }
  }, [distances, selectedDistanceId]);

  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>

      <section className="pt-[140px]">
        <div className="center w-full p-12 align-center flex justify-center">
          <h1 className="text-white text-3xl">{resultData?.competition?.name ?? ''}</h1>
        </div>

        <div className="main-container">
          <div>
            {/* <h2 className="text-white text-2xl mb-6">
              {translateds('Participants_List')}
            </h2> */}

            <div className="pt-[28px] pb-[20px]">
              <div className="flex flex-wrap gap-4 pb-[20px] items-center">
                {/* <FilterButtons onChangeValue={handleChange} /> */}

                <select
                  onChange={e => setSelectedGender(e.target.value)}
                  value={selectedGender}
                  className="appearance-none bg-white text-sm text-gray-700 border border-gray-300 rounded-xl px-4 py-4 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">{translateds('for_gender')}</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>

                <select
                  onChange={e => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                  className="appearance-none bg-white text-sm text-gray-700 border border-gray-300 rounded-xl px-4 py-4 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">{translateds('for_cat')}</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  {distances.map(d => {
                    const isActive = d.id === selectedDistanceId;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDistanceId(d.id === selectedDistanceId ? null : d.id)}
                        className={`text-sm px-4 py-2 rounded-xl transition-all border font-medium
                          ${
                            isActive
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                          }`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ParticipantTable
        searchValue={value}
        columns={participantsColumns}
        tableData={resultsNew}
        selectedGender={selectedGender}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default ResultDetail;
