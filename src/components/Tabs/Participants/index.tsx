import FilterButtons from '@/components/UI/FilterButtons';
import ParticipantTable from '@/components/UI/ParticipantTable';
import { usePartCol } from '@/data/participants';
import { useChangeLang } from '@/hooks/useChangeLang';
import { useGetResult } from '@/services/results';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router';

const Participants = () => {
  const { slug } = useParams();
  const { lang } = useChangeLang();
  const { participantsColumns } = usePartCol();
  const { data: resultData } = useGetResult(slug ?? '');
  const isCompetitionPage = useMatch('/competition/:slug');

  const [value, setValue] = useState('');

  const [selectedGender] = useState('');
  const [selectedCategory] = useState('');
  // const [setCategories] = useState<{ id: number; name: string }[]>([]);
  const [distances, setDistances] = useState<{ id: number; name: string }[]>([]);
  const [selectedDistanceId, setSelectedDistanceId] = useState<number | null>(null);
  const [resultsNew, setResultsNew] = useState<any[]>([]);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const res = await axios.get('https://admin.race.az/api/categories', {
  //       headers: { 'Accept-Language': lang },
  //     });
  //     if (Array.isArray(res.data)) setCategories(res.data);
  //   };
  //   getCategories();
  // }, [lang]);

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
        if (Array.isArray(res.data)) setResultsNew(res.data);
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
      <section className="pt-[18px]">
        <div className="main-container">
          <div>
            <div></div>
            <div className="pt-[28px] pb-[20px]">
              <div className="flex flex-wrap gap-4 pb-[20px] items-center">
                <FilterButtons onChangeValue={setValue} />
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
        // @ts-expect-error isCompetitionPage prop
        isCompetitionPage={isCompetitionPage}
        competitionSlug={slug ? slug : ''}
      />
    </>
  );
};

export default Participants;
