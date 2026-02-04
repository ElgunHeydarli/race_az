import { useQuery } from '@tanstack/react-query';
import { getSeoByKey } from '@/services/seo/seoPage';
import { getCompetitionSchema, getProductSchema, getBreadcrumbSchema } from '@/services/seo/schema';
import { useSeoSettings } from '@/context/SeoContext';

export interface DynamicSeoOptions {
  seoKey: string;
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  schemaType?: 'competition' | 'product';
  slug?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const useDynamicSeo = (options: DynamicSeoOptions) => {
  const { settings } = useSeoSettings();
  const { seoKey, schemaType, slug, breadcrumbs } = options;

  // Load base SEO data
  const { data: seoData, isLoading } = useQuery({
    queryKey: ['seo', seoKey],
    queryFn: () => getSeoByKey(seoKey),
    enabled: !!settings,
    staleTime: Infinity,
  });

  // Load specific schema if needed
  const { data: schema } = useQuery({
    queryKey: ['schema', schemaType, slug],
    queryFn: () => {
      if (schemaType === 'competition' && slug) {
        return getCompetitionSchema(slug);
      } else if (schemaType === 'product' && slug) {
        return getProductSchema(slug);
      }
      return null;
    },
    enabled: !!schemaType && !!slug && !!settings,
  });

  // Load breadcrumb schema if needed
  const { data: breadcrumbSchema } = useQuery({
    queryKey: ['schema', 'breadcrumb', JSON.stringify(breadcrumbs)],
    queryFn: () => {
      if (breadcrumbs && breadcrumbs.length > 0) {
        return getBreadcrumbSchema(breadcrumbs);
      }
      return null;
    },
    enabled: !!breadcrumbs && breadcrumbs.length > 0 && !!settings,
  });

  return {
    seoData,
    schema,
    breadcrumbSchema,
    isLoading,
  };
};
