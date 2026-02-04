import { Outlet, useLocation } from "react-router";
import { Navbar, Footer } from "..";
import { useEffect } from "react";
import { useChangeLang } from "@/hooks/useChangeLang";
import { Helmet } from "react-helmet-async";
import { SnowEffect } from "@/components/SnowEffect";
import { SeoScripts, JsonLd } from "@/components/SEO";
import { getOrganizationSchema, getWebsiteSchema } from "@/services/seo/schema";
import { useSeoSettings } from "@/context/SeoContext";
import { useRedirectCheck } from "@/hooks/useRedirectCheck";
import { useQuery } from "@tanstack/react-query";

const Root = () => {
  const location = useLocation();
  const { lang } = useChangeLang();
  const { settings } = useSeoSettings();

  // Check for redirects
  useRedirectCheck();

  // Load default schemas
  const { data: orgSchema } = useQuery({
    queryKey: ['schema', 'organization', lang],
    queryFn: getOrganizationSchema,
    staleTime: Infinity,
    enabled: !!settings,
  });

  const { data: websiteSchema } = useQuery({
    queryKey: ['schema', 'website', lang],
    queryFn: getWebsiteSchema,
    staleTime: Infinity,
    enabled: !!settings,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <html lang={lang} />
      </Helmet>

      <SeoScripts />

      {orgSchema && <JsonLd schema={orgSchema} />}
      {websiteSchema && <JsonLd schema={websiteSchema} />}

      <SnowEffect />

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Root;
