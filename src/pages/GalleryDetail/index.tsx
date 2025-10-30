import { useGetCompetitionGallery } from '@/services/competitions';
import { useGetSeoOfPage } from '@/services/seo';
import { Link2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

const GalleryDetail = () => {
  const { data: homeData } = useGetSeoOfPage('galleryDetail');
  const seoData = homeData?.data.find((item) => item.key === 'galleryDetail');

  const { slug } = useParams<{ slug: string }>();
  const { data: galleriesData } = useGetCompetitionGallery(slug);

  const galleries = galleriesData && galleriesData?.gallery_years;

  const [activeYear, setActiveYear] = useState<string | null>(
    galleries ? galleries[0].year : null
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const activeButton = scrollContainer.querySelector(
        `[data-year="${activeYear}"]`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeYear]);

  useEffect(() => {
    setActiveYear(galleries ? galleries[0].year : null);
  }, [galleries]);

  const findLinksByYear = galleries?.find((item) => item.year === activeYear);


  return (
    <>
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData?.meta_title} />
      </Helmet>
      {/* <BreadCrumbTitle
        title={competitionName}
        breadcrumbs={[
          {
            title: translateds('home_page'),
            link: '/',
          },
          {
            title: translateds('gallery_text'),
          },
        ]}
      /> */}
      <section className="pt-[122px] pb-[100px]">
        <div className="main-container">
          <div className="flex flex-col gap-[40px]">
            <div className="bg-[#FFFFFF0D] rounded-[12px] p-[24px] overflow-x-auto scrollbar-hide">
              <div ref={scrollRef} className="flex gap-6 min-w-max">
                {galleries &&
                  galleries.map(({ year }, index) => {
                    return (
                      <button
                        key={index}
                        data-year={year}
                        onClick={() => setActiveYear(year)}
                        className={`px-[24px]  cursor-pointer py-[14px] rounded-[12px] transition-colors whitespace-nowrap ${
                          activeYear === year
                            ? 'bg-white text-[#04848C]'
                            : 'bg-[#FFFFFF3D] text-white'
                        }`}>
                        {year}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {findLinksByYear?.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg bg-white p-4 text-[#04848C] transition-colors hover:bg-white/90">
                  <Link2 className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{link.url}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryDetail;
