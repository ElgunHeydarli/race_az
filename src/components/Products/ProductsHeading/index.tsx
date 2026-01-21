import { BUTTON_STYLES, ProductCategory } from '@/data/filters';
import { useFilterProduct } from '@/hooks/useFilterProduct';
import { cn } from '@/lib/utils';
import { useGetCategories } from '@/services/categories';
import { useEffect, useRef, useState } from 'react';

const ProductsHeading = () => {
  const { data: categoryData } = useGetCategories();
  const { filterProduct } = useFilterProduct();
  const categoriesFilters = categoryData?.product_types ?? [];

  const [activeFilter, setActiveFilter] = useState<string>(ProductCategory.ALL);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const activeButton = scrollContainer.querySelector(
        `[data-filter="${activeFilter}"]`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeFilter]);

  const handleClickCategory = (filter: string) => {
    setActiveFilter(filter);
    filterProduct(filter);
  };

  const categoriesNames = categoriesFilters.flatMap((item) =>
    Object.keys(item)
  );



  return (
    <>
      <section className="pt-[48px] pb-[0px]">
        <div className="main-container">
          <div className="flex flex-col gap-[40px]">
            <div className="bg-[#FFFFFF0D] rounded-[12px] p-[24px] overflow-x-auto scrollbar-hide">
              <div ref={scrollRef} className="flex gap-6 min-w-max">
                <button
                  onClick={() => handleClickCategory(ProductCategory.ALL)}
                  className={cn(
                    BUTTON_STYLES.buttonBase,
                    activeFilter === ProductCategory.ALL
                      ? BUTTON_STYLES.buttonActive
                      : BUTTON_STYLES.buttonInactive
                  )}
                  type="button">
                  All
                </button>
                {categoriesNames?.map((filter) => (
                  <button
                    key={filter}
                    data-filter={filter}
                    onClick={() => handleClickCategory(filter)}
                    className={cn(
                      BUTTON_STYLES.buttonBase,
                      activeFilter === filter
                        ? BUTTON_STYLES.buttonActive
                        : BUTTON_STYLES.buttonInactive
                    )}
                    type="button">
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsHeading;
