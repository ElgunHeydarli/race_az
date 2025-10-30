import { apiMainRoutes } from '@/api/routes';
import { BaseResponseType, Entity } from '@/types';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';

export type Contact = Entity<{
  value: string;
  image: string;
}>;

type BaseContactResponse = BaseResponseType<Contact[]>;

export const useGetContacts = () => {
  return useFetch<BaseContactResponse>(pathToUrl(apiMainRoutes.getContacts));
};
