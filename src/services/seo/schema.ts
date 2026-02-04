import { api } from '@/api/axiosClient';

export interface SchemaOrganization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  [key: string]: any;
}

export interface SchemaWebsite {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  potentialAction: any;
  [key: string]: any;
}

export interface SchemaBreadcrumb {
  '@context': string;
  '@type': string;
  itemListElement: any[];
  [key: string]: any;
}

export interface SchemaCompetition {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface SchemaProduct {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export const getOrganizationSchema = async (): Promise<SchemaOrganization> => {
  const response = await api.get<SchemaOrganization>('/schema/organization');
  return response.data;
};

export const getWebsiteSchema = async (): Promise<SchemaWebsite> => {
  const response = await api.get<SchemaWebsite>('/schema/website');
  return response.data;
};

export const getBreadcrumbSchema = async (items: Array<{ name: string; url: string }>): Promise<SchemaBreadcrumb> => {
  const response = await api.get<SchemaBreadcrumb>('/schema/breadcrumb', {
    params: { items: JSON.stringify(items) },
  });
  return response.data;
};

export const getCompetitionSchema = async (slug: string): Promise<SchemaCompetition> => {
  const response = await api.get<SchemaCompetition>(`/schema/competition/${slug}`);
  return response.data;
};

export const getProductSchema = async (slug: string): Promise<SchemaProduct> => {
  const response = await api.get<SchemaProduct>(`/schema/product/${slug}`);
  return response.data;
};
