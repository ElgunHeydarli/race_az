import { translateds } from '@/context/TranslateContext';
import { useGetCompetitions } from '@/services/competitions';
import { Competition, Distance } from '@/services/competitions/types';
import { useGetCalendarEvents } from '@/services/calendarEvents';
import { CalendarEvent } from '@/services/calendarEvents/types';
import { useGetSeoOfPage } from '@/services/seo';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

type ViewMode = 'list' | 'calendar';
type FilterType = 'all' | 'upcoming' | 'past';

type UnifiedEvent = {
  id: string;
  date: string;
  name: string;
  organizer: string;
  distance: string | null;
  location: string | null;
  link: string | null;
  isRaceAz: boolean;
  eventType: string | null;
};

const Calendar = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filterType, setFilterType] = useState<FilterType>('upcoming');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const { data: competitionsData, isLoading: competitionsLoading } = useGetCompetitions();
  const { data: calendarEventsData, isLoading: eventsLoading, error: eventsError } = useGetCalendarEvents();

  const competitions = competitionsData?.data || [];
  // Əgər calendar-events API 404 qaytarırsa, boş array istifadə et
  const calendarEvents = eventsError ? [] : (calendarEventsData?.data || []);

  const { data: calendarData } = useGetSeoOfPage('calendar');
  const seoData = calendarData?.data.find((item) => item.key === 'calendar');

  // Birləşdirilmiş tədbirlər
  const unifiedEvents = useMemo(() => {
    const events: UnifiedEvent[] = [];

    // Yalnız is_race_az_event = true olan yarışlar göstərilir
    competitions
      .filter((comp: Competition) => comp.is_race_az_event === true)
      .forEach((comp: Competition) => {
        events.push({
          id: `comp-${comp.id}`,
          date: comp.competition_start_date,
          name: comp.name,
          organizer: comp.organizer_name,
          distance: [...(comp.distances || [])]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((v: Distance) => v.distance)
            .join(', '),
          location: comp.location || null,
          link: `/competition/${comp.slug}`,
          isRaceAz: true,
          eventType: null,
        });
      });

    // Xarici tədbirlər
    calendarEvents.forEach((event: CalendarEvent) => {
      events.push({
        id: `event-${event.id}`,
        date: event.event_date,
        name: event.name_az || event.name,
        organizer: event.organizer_az || event.organizer,
        distance: event.distance,
        location: event.location_az || event.location,
        link: event.registration_link,
        isRaceAz: false,
        eventType: event.event_type_az || event.event_type,
      });
    });

    return events;
  }, [competitions, calendarEvents]);

  // Filtrlənmiş tədbirlər
  const filteredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return unifiedEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        if (filterType === 'upcoming') {
          return eventDate >= today;
        } else if (filterType === 'past') {
          return eventDate < today;
        }
        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [unifiedEvents, filterType]);

  // Aylara görə qruplaşdırılmış
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: UnifiedEvent[] } = {};

    filteredEvents.forEach((event) => {
      const date = new Date(event.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
    });

    return groups;
  }, [filteredEvents]);

  const getMonthName = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const monthNames = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
      'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const getMonthShort = (dateStr: string) => {
    const date = new Date(dateStr);
    const monthsShort = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'];
    return monthsShort[date.getMonth()];
  };

  // Əgər calendar-events API xəta verərsə, loading-i dayandır
  const isLoading = competitionsLoading || (eventsLoading && !eventsError);

  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title || translateds('Calendar')}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>

      <section className="pb-[100px] pt-[118px]">
        <div className="main-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              {translateds('Calendar')}
            </h1>

            {/* Filters & View Toggle */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Filter Buttons */}
              <div className="flex bg-[#FFFFFF0A] rounded-lg p-1">
                {(['upcoming', 'past', 'all'] as FilterType[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterType(filter)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      filterType === filter
                        ? 'bg-[#0B98A1] text-white'
                        : 'text-[#FFFFFF99] hover:text-white'
                    }`}
                  >
                    {filter === 'upcoming' && translateds('upcoming_events')}
                    {filter === 'past' && translateds('past_events')}
                    {filter === 'all' && translateds('all_events')}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-[#FFFFFF0A] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#0B98A1] text-white'
                      : 'text-[#FFFFFF99] hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-2 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'calendar'
                      ? 'bg-[#0B98A1] text-white'
                      : 'text-[#FFFFFF99] hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0B98A1]"></span>
                <span className="text-sm text-[#FFFFFF99]">Race.az</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6B7280]"></span>
                <span className="text-sm text-[#FFFFFF99]">{translateds('external_events')}</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B98A1]"></div>
            </div>
          )}

          {/* No Events */}
          {!isLoading && filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <svg className="mx-auto h-16 w-16 text-[#FFFFFF40]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-[#FFFFFF80]">Heç bir tədbir tapılmadı</p>
            </div>
          )}

          {/* Content */}
          {!isLoading && filteredEvents.length > 0 && viewMode === 'list' && (
            <ListView
              groupedByMonth={groupedByMonth}
              getMonthName={getMonthName}
              getMonthShort={getMonthShort}
            />
          )}

          {!isLoading && filteredEvents.length > 0 && viewMode === 'calendar' && (
            <CalendarView
              events={filteredEvents}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />
          )}
        </div>
      </section>
    </>
  );
};

// List View Component
const ListView = ({
  groupedByMonth,
  getMonthName,
  getMonthShort,
}: {
  groupedByMonth: { [key: string]: UnifiedEvent[] };
  getMonthName: (dateStr: string) => string;
  getMonthShort: (dateStr: string) => string;
}) => {
  return (
    <div className="space-y-8">
      {Object.entries(groupedByMonth)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([monthKey, monthEvents]) => (
          <div key={monthKey}>
            <h2 className="text-xl font-semibold text-white mb-4 sticky top-0 bg-[#0a0a0a] py-2 z-10">
              {getMonthName(monthKey)}
            </h2>

            <div className="space-y-4">
              {monthEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  getMonthShort={getMonthShort}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

// Event Card Component
const EventCard = ({
  event,
  getMonthShort,
}: {
  event: UnifiedEvent;
  getMonthShort: (dateStr: string) => string;
}) => {
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <div
      className={`bg-[#FFFFFF0A] border border-[#FFFFFF1A] rounded-[16px] overflow-hidden hover:border-[#FFFFFF30] transition-all ${
        isPast ? 'opacity-60' : ''
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Date Section */}
        <div
          className={`${
            event.isRaceAz ? 'bg-[#0B98A1]' : 'bg-[#4B5563]'
          } text-white p-4 md:p-6 flex flex-row md:flex-col items-center justify-center md:min-w-[120px] gap-2 md:gap-0`}
        >
          <span className="text-3xl md:text-4xl font-bold">
            {eventDate.getDate()}
          </span>
          <span className="text-sm uppercase tracking-wide">
            {getMonthShort(event.date)}
          </span>
        </div>

        {/* Info Section */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {event.name}
                </h3>
                {event.isRaceAz && (
                  <span className="px-2 py-0.5 text-xs bg-[#0B98A1]/20 text-[#0B98A1] rounded-full">
                    Race.az
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#FFFFFF99]">
                {/* Organizer */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{event.organizer}</span>
                </div>

                {/* Event Type */}
                {event.eventType && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>{event.eventType}</span>
                  </div>
                )}

                {/* Distance */}
                {event.distance && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>{event.distance}</span>
                  </div>
                )}

                {/* Location */}
                {event.location && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Link Button */}
            {event.link && !isPast && (
              event.isRaceAz ? (
                <Link
                  to={event.link}
                  className="inline-flex items-center gap-2 bg-[#0B98A1] hover:bg-[#0a8890] text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  {translateds('see_more')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4B5563] hover:bg-[#374151] text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  {translateds('registration')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Calendar View Component
const CalendarView = ({
  events,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}: {
  events: UnifiedEvent[];
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
}) => {
  const monthNames = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];

  const dayNames = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === selectedMonth &&
        eventDate.getFullYear() === selectedYear
      );
    });
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="bg-[#FFFFFF0A] border border-[#FFFFFF1A] rounded-[16px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#FFFFFF1A]">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-[#FFFFFF14] rounded-lg transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-lg font-semibold text-white">
          {monthNames[selectedMonth]} {selectedYear}
        </h3>

        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#FFFFFF14] rounded-lg transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-[#FFFFFF1A]">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-[#FFFFFF80]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {emptyDays.map((_, index) => (
          <div
            key={`empty-${index}`}
            className="min-h-[100px] p-2 border-b border-r border-[#FFFFFF0A] bg-[#FFFFFF05]"
          />
        ))}

        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isToday =
            day === new Date().getDate() &&
            selectedMonth === new Date().getMonth() &&
            selectedYear === new Date().getFullYear();

          return (
            <div
              key={day}
              className={`min-h-[100px] p-2 border-b border-r border-[#FFFFFF0A] ${
                isToday ? 'bg-[#0B98A1]/10' : ''
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${
                  isToday
                    ? 'bg-[#0B98A1] text-white font-bold'
                    : 'text-[#FFFFFF99]'
                }`}
              >
                {day}
              </span>

              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate cursor-pointer transition-colors ${
                      event.isRaceAz
                        ? 'bg-[#0B98A1]/20 text-[#0B98A1] hover:bg-[#0B98A1]/30'
                        : 'bg-[#6B7280]/20 text-[#9CA3AF] hover:bg-[#6B7280]/30'
                    }`}
                    title={event.name}
                  >
                    {event.name}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-[#FFFFFF60]">
                    +{dayEvents.length - 2}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
