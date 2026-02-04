import React from 'react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { TranslateProvider } from '@/context/TranslateContext';
import { SeoProvider } from '@/context/SeoContext';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 20,
      },
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <SeoProvider>
            <TranslateProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster />
            </TranslateProvider>
          </SeoProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Provider;
