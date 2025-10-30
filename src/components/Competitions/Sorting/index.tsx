// import Dropdown from '@/assets/svgs/dropdown.svg';
// import { translateds } from '@/context/TranslateContext';
import type { SortOption } from '@/data/sorts';
// import { useFilterProduct } from '@/hooks/useFilterProduct';
// import { useState, useMemo } from 'react';

interface SortingProps {
  sortOptions?: SortOption[];
  sortType?: string;
  lengthNumber?: number;
}

const Sorting: React.FC<SortingProps> = () => {
  // const { sortProduct } = useFilterProduct();

  // const [, setOpenSort] = useState<boolean>(false);

  // const translatedSortOptions = useMemo(() => {
  //   if (!sortOptions) return [];
  //   return sortOptions.map((option) => ({
  //     ...option,
  //     translatedLabel: translateds(option.value as string),
  //   }));
  // }, [sortOptions, translateds]);

  // const [, setSelectedSort] = useState<string>(
  //   translatedSortOptions.length > 0
  //     ? translatedSortOptions[0].translatedLabel
  //     : ''
  // );

  // const handleSelectLabel = (option: SortOption) => {
  //   const translatedOption = translatedSortOptions.find(
  //     (translatedOption) => translatedOption.value === option.value
  //   );

  //   if (translatedOption) {
  //     setSelectedSort(translatedOption.translatedLabel);

  //     sortProduct(option);

  //     setOpenSort(false);
  //   }
  // };

  return (
    <section className="bg-[#07080D] mt-[40px] py-[0]">
      <div className="main-container">
        {/* <div className="flex justify-between items-center py-[15px]">
          <span className="text-[#FFFFFF99] text-[14px]">
            {lengthNumber}{' '}
            {sortType === 'competition'
              ? translateds('race')
              : translateds('product_text')}
          </span>
          <div className="relative">
            <div
              onClick={() => setOpenSort(!openSort)}
              className="text-white flex items-center gap-2 bg-[#FFFFFF1F] py-[14px] px-[24px] rounded-[12px] cursor-pointer">
              <span className="text-[#FFFFFF99]">
                {translateds('sort_text')}
              </span>
              : {selectedSort}
              <span
                className={`${
                  openSort ? 'rotate-180' : ''
                } w-5 h-5 flex items-center transition-transform duration-300 justify-center`}>
                <img
                  src={Dropdown || '/placeholder.svg'}
                  alt="Dropdown"
                  className="w-full h-auto"
                />
              </span>
            </div>
            {openSort && (
              <div className="absolute z-20 text-white right-0 mt-2 w-full bg-[#FFFFFF1F] backdrop-blur-lg rounded-xl shadow-lg text-[14px] md:text-base overflow-hidden transition-all duration-300 ease-in-out">
                {translatedSortOptions.map((option, index) => (
                  <div
                    key={
                      typeof option.value === 'boolean' ? index : option.value
                    }
                    className="px-6 py-3 hover:bg-[#FFFFFF1F]/40 cursor-pointer transition-colors duration-200"
                    onClick={() => handleSelectLabel(option)}>
                    {option.translatedLabel}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Sorting;
