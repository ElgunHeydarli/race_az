import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { languages } from '@/types/languages';
import { useChangeLang } from '@/hooks/useChangeLang';

export function LanguageDropdown() {
  const { lang, changeLang } = useChangeLang();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      <button className="bg-[rgba(255,255,255,0.12)] flex items-center gap-[8px] rounded-[12px] py-[8px] px-[12px]">
        {languages[0].code.toUpperCase()}
        <ChevronDown className="h-4 w-4" />
      </button>
    );
  }

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  return (
    <div
      className="relative flex align-center justify-center"
      ref={dropdownRef}
    >
      <button
        className="bg-[rgba(255,255,255,0.12)] flex items-center gap-[8px] cursor-pointer rounded-[12px] py-[8px] px-[12px] hover:bg-[rgba(255,255,255,0.18)] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLanguage.code.toUpperCase()}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[65px] bg-white border border-gray-200 shadow-md rounded-md overflow-hidden z-10">
          {languages.map(language => (
            <div
              key={language.code}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-50 ${
                lang === language.code ? 'font-medium bg-gray-100' : ''
              }`}
              onClick={() => {
                changeLang(language);
                setIsOpen(false);
              }}
            >
              <span className="uppercase text-gray-900">{language.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
