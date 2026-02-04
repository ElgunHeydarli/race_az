import { Helmet } from 'react-helmet-async';
import { useSeoSettings } from '@/context/SeoContext';

export const SeoScripts = () => {
  const { settings } = useSeoSettings();

  if (!settings) return null;

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      {settings.google_analytics_id && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.google_analytics_id}');
            `}
          </script>
        </>
      )}

      {/* Google Tag Manager */}
      {settings.google_tag_manager_id && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${settings.google_tag_manager_id}');
          `}
        </script>
      )}
    </Helmet>
  );
};
