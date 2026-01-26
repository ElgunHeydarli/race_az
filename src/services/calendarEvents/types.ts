import { BaseResponseType } from '@/types';

export type CalendarEvent = {
  id: number;
  event_date: string;
  event_date_formatted: string;
  name: string;
  name_az: string;
  name_en: string;
  name_ru: string;
  event_type: string | null;
  event_type_az: string | null;
  event_type_en: string | null;
  event_type_ru: string | null;
  organizer: string;
  organizer_az: string;
  organizer_en: string;
  organizer_ru: string;
  distance: string | null;
  registration_link: string | null;
  location: string | null;
  location_az: string | null;
  location_en: string | null;
  location_ru: string | null;
  status: boolean;
};

export type BaseCalendarEventsResponse = BaseResponseType<CalendarEvent[]>;
