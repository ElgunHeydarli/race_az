import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { checkRedirect } from '@/services/seo/redirects';

export const useRedirectCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkForRedirect = async () => {
      try {
        const result = await checkRedirect(location.pathname);
        if (result.redirect && result.destination_url) {
          // Extract path from destination URL
          const url = new URL(result.destination_url);
          navigate(url.pathname, { replace: true });
        }
      } catch (error) {
        // Silently fail - redirect check is non-critical
        console.debug('Redirect check failed:', error);
      }
    };

    checkForRedirect();
  }, [location.pathname, navigate]);
};
