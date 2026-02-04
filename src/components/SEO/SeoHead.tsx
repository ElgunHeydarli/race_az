import { Helmet } from 'react-helmet-async';
import { useSeoSettings } from '@/context/SeoContext';
import { useMemo } from 'react';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterImage?: string;
  robots?: string;
  canonical?: string;
  type?: string;
  children?: React.ReactNode;
}

export const SeoHead = ({
  title = '',
  description = '',
  keywords = '',
  ogImage = '',
  ogUrl = '',
  twitterImage = '',
  robots = 'index, follow',
  canonical = '',
  type = 'website',
  children,
}: SeoHeadProps) => {
  const { settings } = useSeoSettings();

  const seoData = useMemo(() => {
    if (!settings) return null;

    const finalTitle = title ? `${title} ${settings.title_separator} ${settings.site_name}` : settings.site_name;
    const finalOgImage = ogImage || settings.default_og_image;
    const finalTwitterImage = twitterImage || ogImage || settings.default_og_image;
    const currentUrl = ogUrl || window.location.href;

    return {
      title: finalTitle,
      description,
      keywords,
      ogImage: finalOgImage,
      twitterImage: finalTwitterImage,
      ogUrl: currentUrl,
      robots,
      canonical: canonical || currentUrl,
      type,
    };
  }, [settings, title, description, keywords, ogImage, ogUrl, twitterImage, robots, canonical, type]);

  if (!seoData) return null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      <meta name="robots" content={seoData.robots} />

      {/* Canonical */}
      <link rel="canonical" href={seoData.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content={seoData.type} />
      <meta property="og:url" content={seoData.ogUrl} />
      {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
      <meta property="og:site_name" content={settings?.site_name || 'Race.az'} />
      <meta property="og:locale" content="az_AZ" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="ru_RU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.twitterImage && <meta name="twitter:image" content={seoData.twitterImage} />}

      {children}
    </Helmet>
  );
};
