import { Helmet } from 'react-helmet-async';
import { useGetSeoByKey } from '@/services/seo';
import { useGetSettings } from '@/services/settings';

interface SEOProps {
  seoKey: string;
}

export const SEO = ({ seoKey }: SEOProps) => {
  const { data: seoData } = useGetSeoByKey(seoKey);
  const { data: settings } = useGetSettings();

  if (!seoData?.data) return null;

  const { meta_title, meta_description, meta_keywords } = seoData.data;
  const favicon = settings?.favicon || '/favicon.ico';

  return (
    <Helmet>
      {/* Title and Basic Meta Tags */}
      <title>{meta_title}</title>
      <meta name="description" content={meta_description} />
      {meta_keywords && <meta name="keywords" content={meta_keywords} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={meta_title} />
      <meta property="og:description" content={meta_description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta_title} />
      <meta name="twitter:description" content={meta_description} />

      {/* Favicon */}
      <link rel="icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
    </Helmet>
  );
};
