import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSeoSettings, SeoSettings } from '@/services/seo/seoSettings';

interface SeoContextType {
  settings: SeoSettings | null;
  loading: boolean;
  error: Error | null;
}

const SeoContext = createContext<SeoContextType | undefined>(undefined);

export const SeoProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SeoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSeoSettings = async () => {
      try {
        setLoading(true);
        const data = await getSeoSettings();
        setSettings(data);

        // Apply global SEO settings to document
        if (data.favicon) {
          const link = document.querySelector("link[rel='icon']") || document.createElement('link');
          link.setAttribute('rel', 'icon');
          link.setAttribute('href', data.favicon);
          if (!document.querySelector("link[rel='icon']")) {
            document.head.appendChild(link);
          }
        }

        // Apply Google Verification
        if (data.google_verification) {
          const meta = document.querySelector("meta[name='google-site-verification']") || document.createElement('meta');
          meta.setAttribute('name', 'google-site-verification');
          meta.setAttribute('content', data.google_verification);
          if (!document.querySelector("meta[name='google-site-verification']")) {
            document.head.appendChild(meta);
          }
        }

        // Apply custom head code
        if (data.custom_head_code) {
          const div = document.createElement('div');
          div.innerHTML = data.custom_head_code;
          const elements = div.querySelectorAll('*');
          elements.forEach(el => {
            document.head.appendChild(el.cloneNode(true));
          });
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load SEO settings'));
        // Set default values on error
        setSettings({
          success: false,
          site_name: 'Race.az',
          title_separator: '|',
          default_og_image: '',
          google_analytics_id: '',
          google_tag_manager_id: '',
          google_verification: '',
          custom_head_code: '',
          favicon: '',
          social_profiles: [],
        });
      } finally {
        setLoading(false);
      }
    };

    loadSeoSettings();
  }, []);

  return <SeoContext.Provider value={{ settings, loading, error }}>{children}</SeoContext.Provider>;
};

export const useSeoSettings = () => {
  const context = useContext(SeoContext);
  if (context === undefined) {
    throw new Error('useSeoSettings must be used within a SeoProvider');
  }
  return context;
};
