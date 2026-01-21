import {  Search } from 'lucide-react';
// import PrimaryButton from '../PrimaryButton';
import { translateds } from '@/context/TranslateContext';

const FilterButtons = ({
  onChangeValue,
}: {
  onChangeValue: (value: string) => void;
}) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-6">
        <div className="">
          <div className="relative md:col-span-2 lg:col-span-1">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              onChange={(e) => onChangeValue(e.target.value)}
              name="search"
              placeholder={translateds('Search')}
              className="w-full bg-[#FFFFFF14] text-white placeholder:text-white/60 py-4 pl-[52px] pr-5 rounded-[12px] outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterButtons;
