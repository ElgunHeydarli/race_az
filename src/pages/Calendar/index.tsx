import { translateds } from '@/context/TranslateContext';
import { useGetCompetitions } from '@/services/competitions';
import { Distance } from '@/services/competitions/types';
import { useGetSeoOfPage } from '@/services/seo';
import moment from 'moment';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const Calendar = () => {
  const { data: competitionsData } = useGetCompetitions();
  const competitions = competitionsData && competitionsData?.data;

  React.useEffect(() => {
    console.log(competitions, 'competitions')
  }, []);

  const { data: calendarData } = useGetSeoOfPage('calendar');
  const seoData = calendarData?.data.find((item) => item.key === 'calendar');
  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      {/* <BreadCrumbTitle
        title={translateds('Calendar')}
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: translateds('Calendar'),
            link: '/Kalendar',
          },
        ]}
      /> */}
      <section className="pb-[100px] pt-[118px]">
        <div className="main-container">
          {/* Mobile: Card Layout */}
          <div className="block md:hidden space-y-4">
            {competitions && competitions?.length > 0 ? (
              competitions.map((item) => (
                <div key={item.id} className="bg-[#111216] rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#FFFFFF99] text-xs mb-1">{translateds('date_text')}</p>
                      <p className="text-white font-medium">
                        {moment(item.competition_start_date).format('DD.MM.YYYY')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#FFFFFF99] text-xs mb-1">{translateds('competition_text_cal')}</p>
                    <p className="text-white">{item.name}</p>
                  </div>

                  <div>
                    <p className="text-[#FFFFFF99] text-xs mb-1">{translateds('Organizer_text')}</p>
                    <p className="text-white">{item.organizer_name}</p>
                  </div>

                  <div>
                    <p className="text-[#FFFFFF99] text-xs mb-1">{translateds('Distance_text')}</p>
                    <p className="text-white">{item.distances?.map((v: Distance) => v.distance).join(", ")}</p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`${'/competition'}/${item.slug}`}
                      target="_blank"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm break-all">
                      {'/competition'}/{item.slug}
                    </Link>
                  </div>
                </div>
              ))
            ) : null}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block w-full bg-[#111] text-gray-100 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#191B21]">
                  <tr>
                    <th className="px-6 py-12 text-center text-lg font-medium border-r border-gray-800/50">
                      {translateds('date_text')}
                    </th>
                    <th className="px-6 py-12 text-center text-lg font-medium border-r border-gray-800/50">
                      {translateds('competition_text_cal')}
                    </th>
                    <th className="px-6 py-12 text-center text-lg font-medium border-r border-gray-800/50">
                      {translateds('Organizer_text')}
                    </th>
                    <th className="px-6 py-12 text-center text-lg font-medium border-r border-gray-800/50">
                      {translateds('Distance_text')}
                    </th>
                    <th className="px-6 py-12 text-center text-lg font-medium">
                      {translateds('see_more')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111216] text-[#FFFFFFCC] bg-[#111216]">
                  {competitions && competitions?.length > 0 ?
                    competitions.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-900/50 transition-colors">
                        <td className="px-6 py-12 text-sm text-center border-r border-gray-800/50">
                          {moment(item.competition_start_date).format(
                            'DD.MM.YYYY'
                          )}
                        </td>
                        <td className="px-6 py-12 text-sm text-center border-r border-gray-800/50">
                          {item.name}
                        </td>
                        <td className="px-6 py-12 text-sm text-center border-r border-gray-800/50">
                          {item.organizer_name}
                        </td>
                        <td className="px-6 py-12 text-sm text-center border-r border-gray-800/50">
                          {item.distances?.map((v: Distance) => v.distance).join(", ")}
                        </td>
                        <td className="px-6 py-12 text-sm text-center">
                          <Link
                            to={`${'/competition'}/${item.slug}`}
                            target="_blank"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            {'/competition'}/{item.slug}
                          </Link>
                        </td>
                      </tr>
                    )) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Calendar;
