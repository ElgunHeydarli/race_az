import { Outlet, useLocation } from "react-router";
import { Navbar, Footer } from "..";
import { useEffect } from "react";
import { useChangeLang } from "@/hooks/useChangeLang";
import { Helmet } from "react-helmet-async";
import { SnowEffect } from "@/components/SnowEffect";

const Root = () => {
  const location = useLocation();
  const { lang } = useChangeLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <html lang={lang} />
      </Helmet>

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
