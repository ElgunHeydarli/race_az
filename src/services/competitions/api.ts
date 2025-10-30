import { apiMainRoutes } from '@/api/routes';
import { pathToUrl } from '@/utils/router';

type CompetitionApiType = {
  getAll: () => string;
  getDetail: (slug: string) => string;
  getTerms: (slug: string) => string;
  getRules: (slug: string) => string;
  getParticipants: (slug: string) => string;
  getBanner: () => string;
  getGallery: (slug: string) => string;
};

export const competitionApi: CompetitionApiType = {
  getAll: () => pathToUrl(apiMainRoutes.getCompetitions),

  getDetail: (slug) => pathToUrl(apiMainRoutes.getCompetitionDetail, { slug }),

  getTerms: (slug) => pathToUrl(apiMainRoutes.getCompetitionTerms, { slug }),

  getRules: (slug) => pathToUrl(apiMainRoutes.getCompetitionRules, { slug }),

  getParticipants: (slug) => pathToUrl(apiMainRoutes.getParticipants, { slug }),

  getBanner: () => pathToUrl(apiMainRoutes.getCompetitionBanner),

  getGallery: (slug) =>
    pathToUrl(apiMainRoutes.getCompetitionGallery, { slug }),
};
