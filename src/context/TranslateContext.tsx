// 1.
// import { apiMainRoutes } from '@/api/routes';
// import { BaseResponseType, Entity } from '@/types';
// import { useFetch } from '@/utils/reactQuery';
// import { pathToUrl } from '@/utils/router';
// import { Loader2 } from 'lucide-react';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// const TranslateContext = createContext<any | undefined>(undefined);

// type Translations = Entity<{
//   key: string;
//   value: string;
// }>;

// export type GetTranslatesResponse = BaseResponseType<Translations[]>;

// export const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
//   const { data, isLoading } = useFetch<GetTranslatesResponse>(
//     pathToUrl(apiMainRoutes.getTranslates),
//     {},
//     {
//       staleTime: 1000 * 60 * 5,
//     }
//   );

//   const [translations, setTranslations] = useState<Record<string, string>>({});

//   useEffect(() => {
//     if (data?.data) {
//       const transformed = data.data.reduce((acc, item) => Object.assign(acc, { [item.key]: item.value }, {}), {});
//       setTranslations(transformed);
//     }
//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[100vh]">
//         <Loader2 color="#000" className=" animate-spin" />
//       </div>
//     );
//   }

//   return <TranslateContext.Provider value={translations}>{children}</TranslateContext.Provider>;
// };

// export const translateds = (key: string) => {
//   const translations = useContext(TranslateContext);

//   if (!translations) {
//     return key;
//   }

//   return translations[key] || key;
// };

// 2.
import { apiMainRoutes } from '@/api/routes';
import { BaseResponseType, Entity } from '@/types';
import { useFetch } from '@/utils/reactQuery';
import { pathToUrl } from '@/utils/router';
import { Loader2 } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

const TranslateContext = createContext<Record<string, string> | undefined>(undefined);

type Translations = Entity<{
  key: string;
  value: string;
}>;

export type GetTranslatesResponse = BaseResponseType<Translations[]>;

let _lastTranslations: Record<string, string> = {};

export const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useFetch<GetTranslatesResponse>(
    pathToUrl(apiMainRoutes.getTranslates),
    {},
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data?.data) {
      const transformed = data.data.reduce(
        (acc, item) => ({ ...acc, [item.key]: item.value }),
        {}
      );
      setTranslations(transformed);
      _lastTranslations = transformed;
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader2 color="#000" className="animate-spin" />
      </div>
    );
  }

  return (
    <TranslateContext.Provider value={translations}>
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslationsContext = () => {
  return useContext(TranslateContext) || {};
};

export const translateds = (key: string): string => {
  try {
    const contextTranslations = useContext(TranslateContext);
    if (contextTranslations && key in contextTranslations) {
      return contextTranslations[key];
    }
  } catch (err) {
  }

  if (_lastTranslations && key in _lastTranslations) {
    return _lastTranslations[key];
  }

  return key;
};
