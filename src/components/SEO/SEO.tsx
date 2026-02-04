import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { getSeoByKey } from '@/services/seo/seoPage';
import { useSeoSettings } from '@/context/SeoContext';
import { useChangeLang } from '@/hooks/useChangeLang';
import { useMemo } from 'react';

interface SEOProps {
  seoKey: string;
  ogImage?: string;
  ogUrl?: string;
  children?: React.ReactNode;
}

export const SEO = ({ seoKey, ogImage, ogUrl, children }: SEOProps) => {
  const { settings } = useSeoSettings();
  const { lang } = useChangeLang();

  const { data: seoData } = useQuery({
    queryKey: ['seo', seoKey, lang],
    queryFn: () => getSeoByKey(seoKey),
    enabled: !!settings,
    staleTime: Infinity,
  });

  const seoContent = useMemo(() => {
    if (!seoData || !settings) return null;

    const {
      meta_title,
      meta_description,
      meta_keywords,
      og_image,
      canonical_url,
      meta_robots = 'index, follow',
    } = seoData;

    const finalTitle = `${meta_title} ${settings.title_separator} ${settings.site_name}`;
    const finalOgImage = ogImage || og_image || settings.default_og_image;
    const currentUrl = ogUrl || canonical_url || window.location.href;

    return {
      title: finalTitle,
      description: meta_description,
      keywords: meta_keywords,
      ogImage: finalOgImage,
      robots: meta_robots,
      canonical: canonical_url || currentUrl,
      currentUrl,
    };
  }, [seoData, settings, ogImage, ogUrl, lang]);

  if (!seoContent || !settings) return null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoContent.title}</title>
      <meta name="description" content={seoContent.description} />
      {seoContent.keywords && <meta name="keywords" content={seoContent.keywords} />}
      <meta name="robots" content={seoContent.robots} />

      {/* Canonical */}
      <link rel="canonical" href={seoContent.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={seoContent.title} />
      <meta property="og:description" content={seoContent.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoContent.currentUrl} />
      {seoContent.ogImage && <meta property="og:image" content={seoContent.ogImage} />}
      <meta property="og:site_name" content={settings.site_name} />
      <meta property="og:locale" content="az_AZ" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="ru_RU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoContent.title} />
      <meta name="twitter:description" content={seoContent.description} />
      {seoContent.ogImage && <meta name="twitter:image" content={seoContent.ogImage} />}

      {children}
    </Helmet>
  );
};

export default SEO;
