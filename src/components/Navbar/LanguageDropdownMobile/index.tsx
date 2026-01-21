import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { languages } from '@/types/languages';
import { useChangeLang } from '@/hooks/useChangeLang';

export function LanguageDropdownMobile() {
  const { lang, changeLang } = useChangeLang();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 mt-auto">
        <button className="w-full bg-[rgba(255,255,255,0.12)] flex items-center justify-center gap-2 cursor-pointer rounded-[12px] py-3 px-4 text-white transition-colors duration-200">
          {languages[0].code.toUpperCase()}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 mt-auto relative" ref={dropdownRef}>

      {isOpen && (
        <div className="absolute left-6 right-6 bottom-20 bg-[#1A1A1A] border border-gray-800 shadow-lg rounded-[12px] overflow-hidden z-10">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`flex items-center justify-center gap-2 cursor-pointer px-3 py-3 hover:bg-white/10 transition-colors ${
                lang === language.code ? 'bg-white/5' : ''
              }`}
              onClick={() => {
                changeLang(language);
                setIsOpen(false);
              }}>
              <span className="uppercase text-white">{language.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
