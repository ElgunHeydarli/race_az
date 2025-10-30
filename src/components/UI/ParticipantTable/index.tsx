import { translateds } from '@/context/TranslateContext';
import { ParticipantColumnType } from '@/data/participants';
import { useEffect, useState } from 'react';

interface TableColumn {
  key: string;
  header: string;
  translatedLabel: string;
}

interface ParticipantTableProps {
  tableData: any[];
  columns: TableColumn[] | ParticipantColumnType[];
  participantCount?: number;
  searchValue: string;
  selectedGender?: string;
  selectedCategory?: string;
  isCompetitionPage?: boolean;
  competitionSlug?: string;
}

const ParticipantTable = ({
  tableData,
  columns,
  searchValue,
  selectedCategory,
  selectedGender,
  isCompetitionPage,
  competitionSlug,
}: ParticipantTableProps) => {
  const [participantsFromApi, setParticipantsFromApi] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!isCompetitionPage) return;

      try {
        const res = await fetch(
          `https://admin.race.az/api/competitions/${competitionSlug}/participants`,
        );
        const data = await res.json();
        if (data?.participants) {
          setParticipantsFromApi(data.participants);
        }
      } catch (error) {
        console.error('ERROR:', error);
      }
    };

    fetchParticipants();
  }, [isCompetitionPage, competitionSlug]);

  const rawData = isCompetitionPage
    ? participantsFromApi
    : tableData;

  // ---- helpers (ParticipantTable içinde üst kısımlara ekleyin) ----

  // Türkçe karakter ve diyakritik normalize + lowerCase
  const normalize = (val: unknown) =>
    (val ?? '')
      .toString()
      .normalize('NFD')
      // @ts-ignore - Unicode property escapes
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim();

  // Dot notation destekli derin okuma: 'country.name' gibi
  const deepGet = (obj: any, path: string) => {
    if (!obj || !path) return undefined;
    return path
      .split('.')
      .reduce(
        (acc, key) => (acc ? acc[key] : undefined),
        obj,
      );
  };

  // Bir katılımcı için tüm aranabilir metni toparla
  const buildSearchHaystack = (
    participant: any,
    columns: { key: string }[],
  ) => {
    const values: string[] = [];

    // Kolonlardan gelen hücre değerleri
    columns.forEach(col => {
      if (!col?.key) return;
      if (col.key === 'flag') return; // görsel kolon
      const v = col.key.includes('.')
        ? deepGet(participant, col.key)
        : participant[col.key];
      if (v != null && v !== '' && typeof v !== 'object')
        values.push(String(v));
    });

    // Sık kullanılan/ek alanlar
    values.push(
      `${participant?.name ?? ''} ${
        participant?.surname ?? ''
      }`, // full name
      participant?.name ?? '',
      participant?.surname ?? '',
      participant?.gender ?? '',
      participant?.team_name ?? '',
      participant?.distance ?? '',
      participant?.category ?? '',
      participant?.country?.name ?? '',
      participant?.country?.code ?? '',
      participant?.bib_number != null
        ? String(participant.bib_number)
        : '',
    );

    // Tek bir büyük metin havuzu
    return normalize(values.filter(Boolean).join(' | '));
  };

  const resultFilteredData = rawData.filter(
    (participant: any) => {
      const genderMatch =
        !selectedGender ||
        normalize(participant.gender) ===
          normalize(selectedGender);
      const categoryMatch =
        !selectedCategory ||
        normalize(participant.category) ===
          normalize(selectedCategory);

      // Arama boşsa sadece diğer filtrelerle dön
      if (!searchValue || !searchValue.trim()) {
        return genderMatch && categoryMatch;
      }

      const haystack = buildSearchHaystack(
        participant,
        columns as any[],
      );
      // "ali 10k" gibi çok kelimede AND mantığı
      const tokens = normalize(searchValue)
        .split(/\s+/)
        .filter(Boolean);

      const searchMatch = tokens.every(t =>
        haystack.includes(t),
      );

      return genderMatch && categoryMatch && searchMatch;
    },
  );

  // const RenderResultTables = () => {
  //   return (
  //     <table className="w-full min-w-[800px]">
  //       <thead>
  //         <tr className="border-b border-[#0000001A]">
  //           <th
  //             className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]"
  //             style={{ textTransform: 'capitalize' }}
  //           >
  //             {translateds('yer_title')}
  //           </th>
  //           <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
  //             {translateds('bib_title')}
  //           </th>
  //           {columns.map(column => (
  //             <th
  //               key={column.key}
  //               className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]"
  //             >
  //               {translateds(column.header)}
  //             </th>
  //           ))}
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {resultFilteredData?.map((participant, index) => (
  //           <tr
  //             key={participant.id}
  //             className={`border-b border-[#0000001A] ${
  //               index % 2 === 0 ? 'bg-white' : 'bg-[#0000000A]'
  //             }`}
  //           >
  //             {/* Yer */}
  //             <td className="whitespace-nowrap py-4 px-6">{index + 1}</td>

  //             {/* Bib № */}
  //             <td className="whitespace-nowrap py-4 px-6">
  //               {participant?.bib_number ?? ''}
  //             </td>

  //             {columns.map(column => {
  //               if (column.key === 'flag') {
  //                 return (
  //                   <td
  //                     key={`${participant.id}-${column.key}`}
  //                     style={{
  //                       textAlign: 'center',
  //                       display: 'flex',
  //                       alignItems: 'center',
  //                       height: '50px',
  //                       justifyContent: 'center',
  //                     }}
  //                   >
  //                     {participant?.country?.image && (
  //                       <img
  //                         style={{
  //                           position: 'relative',
  //                           right: '28px',
  //                         }}
  //                         src={participant.country.image}
  //                         alt={`${participant.country.name} flag`}
  //                         width={38}
  //                         height={38}
  //                       />
  //                     )}
  //                   </td>
  //                 );
  //               }

  //               return (
  //                 <td
  //                   key={`${participant.id}-${column.key}`}
  //                   className="whitespace-nowrap py-4 px-6"
  //                 >
  //                   {participant[column.key] ?? '-'}
  //                 </td>
  //               );
  //             })}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );
  // };

  const RenderResultTables = () => {
    const isMobile =
      typeof window !== 'undefined' &&
      window.innerWidth < 768;

    if (isMobile) {
      console.log(resultFilteredData, 'RESFIL');

      return (
        <div className="divide-y divide-gray-200">
          {resultFilteredData?.map((participant, index) => (
            <div
              key={participant.id}
              className="flex items-center justify-between py-6 px-6"
            >
              {/* Sol taraf: sıra + isim + alt detaylar */}
              <div className="flex flex-col">
                <span className="font-semibold">
                  {index + 1}. {participant?.name}{' '}
                  {participant?.surname}{' '}
                  <span className="text-gray-500 text-sm">
                    ({participant?.gender?.charAt(0)})
                  </span>
                </span>
                {/* bib num */}
                <span className="text-gray-500 text-sm">
                  {translateds('bib_title')}:{' '}
                  {participant?.team_name ||
                    participant?.bib_number ||
                    '-'}
                </span>
                {/* category */}
                <span className="text-gray-500 text-sm">
                  {translateds('category_title')}:{' '}
                  {participant?.category || '-'}
                </span>
                {/* netice */}
                <span className="text-blue-500 text-sm">
                  {translateds('netice_title')}:{' '}
                  {participant?.distance ||
                    participant?.result ||
                    '-'}
                </span>
              </div>

              {/* Sağ taraf: Flag */}
              {participant?.country?.image && (
                <div
                  style={{
                    minWidth: '40px',
                    width: '40px',
                    height: '18px',
                    minHeight: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginRight: '12px',
                  }}
                >
                  <img
                    src={participant.country.image}
                    alt={`${participant.country.name} flag`}
                    style={{ objectFit: 'scale-down' }}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-[#0000001A]">
            <th
              className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]"
              style={{ textTransform: 'capitalize' }}
            >
              {translateds('yer_title')}
            </th>
            <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
              {translateds('bib_title')}
            </th>
            {columns.map(column => (
              <th
                key={column.key}
                className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]"
              >
                {translateds(column.header)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {resultFilteredData?.map((participant, index) => (
            <tr
              key={participant.id}
              className={`border-b border-[#0000001A] ${
                index % 2 === 0
                  ? 'bg-white'
                  : 'bg-[#0000000A]'
              }`}
            >
              {/* Yer */}
              <td className="whitespace-nowrap py-4 px-6">
                {index + 1}
              </td>

              {/* Bib № */}
              <td className="whitespace-nowrap py-4 px-6">
                {participant?.bib_number ?? ''}
              </td>

              {columns.map(column => {
                if (column.key === 'flag') {
                  return (
                    <td
                      key={`${participant.id}-${column.key}`}
                      style={{
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        height: '50px',
                        justifyContent: 'center',
                      }}
                    >
                      {participant?.country?.image && (
                        <img
                          style={{
                            position: 'relative',
                            right: '28px',
                          }}
                          src={participant.country.image}
                          alt={`${participant.country.name} flag`}
                          width={38}
                          height={38}
                        />
                      )}
                    </td>
                  );
                }

                return (
                  <td
                    key={`${participant.id}-${column.key}`}
                    className="whitespace-nowrap py-4 px-6"
                  >
                    {participant[column.key] ?? '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const RenderCompetitionTables = () => {
    // Eğer mobil ise kart design
    const isMobile =
      typeof window !== 'undefined' &&
      window.innerWidth < 768;

    if (isMobile) {
      return (
        <div className="divide-y divide-gray-200">
          {(resultFilteredData.length > 0
            ? resultFilteredData
            : rawData
          )?.map((participant, index) => (
            <div
              key={`${participant.name}-${index}`}
              className="flex items-center justify-between py-6 px-6"
            >
              {/* Sol taraf: sıra + isim + alt detaylar */}
              <div className="flex flex-col">
                <span className="font-semibold">
                  {index + 1}. {participant?.name}{' '}
                  {participant?.surname}{' '}
                  <span className="text-gray-500 text-sm">
                    ({participant?.gender?.charAt(0)})
                  </span>
                </span>
                <span className="text-gray-500 text-sm">
                  {participant?.team_name || '-'}
                </span>
                <span className="text-blue-500 text-sm">
                  {participant?.distance || '-'}
                </span>
              </div>

              {participant?.country?.image && (
                <div
                  style={{
                    minWidth: '40px',
                    width: '40px',
                    height: '18px',
                    minHeight: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginRight: '12px',
                  }}
                >
                  <img
                    src={participant.country.image}
                    alt={`${participant.country.name} flag`}
                    style={{ objectFit: 'scale-down' }}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-[#0000001A]">
            <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
              №
            </th>
            <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
              {translateds('fullname_title')}
            </th>
            <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
              {translateds('gender_title')}
            </th>
            <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
              {translateds('country_name')}
            </th>
            <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
              {translateds('team_title')}
            </th>
            <th className="whitespace-nowrap py-5 px-6 text-left font-normal text-[#000000]">
              {translateds('distance_title')}
            </th>
          </tr>
        </thead>

        <tbody>
          {(resultFilteredData.length > 0
            ? resultFilteredData
            : rawData
          )?.map((participant, index) => (
            <tr
              key={`${participant.name}-${index}`}
              className={`border-b border-[#0000001A] ${
                index % 2 === 0
                  ? 'bg-white'
                  : 'bg-[#0000000A]'
              }`}
            >
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6">
                {(participant?.name || '') +
                  ' ' +
                  (participant?.surname || '')}
              </td>
              <td className="py-4 px-6 capitalize">
                {participant?.gender || '-'}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  {participant?.country?.image && (
                    <div
                      style={{
                        minWidth: '100%',
                        width: '100%',
                        height: '21px',
                        minHeight: '21px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={participant.country.image}
                        alt={`${participant.country.name} flag`}
                        style={{ objectFit: 'scale-down' }}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-6">
                {participant?.team_name || '-'}
              </td>
              <td className="py-4 px-6">
                {participant?.distance || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <section>
      <div className="main-container">
        <div className="p-[14px] md:p-[28px] text-base">
          <div className="w-full overflow-x-auto rounded-[20px] bg-white">
            {isCompetitionPage
              ? RenderCompetitionTables()
              : RenderResultTables()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipantTable;
