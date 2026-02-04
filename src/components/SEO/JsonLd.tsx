import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  schema: Record<string, any>;
}

export const JsonLd = ({ schema }: JsonLdProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface MultiJsonLdProps {
  schemas: Record<string, any>[];
}

export const MultiJsonLd = ({ schemas }: MultiJsonLdProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': schemas,
        })}
      </script>
    </Helmet>
  );
};

// Helper function to create breadcrumb schema
export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// Helper function to create organization schema
export const createOrganizationSchema = (org: {
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    sameAs: org.sameAs,
  };
};

// Helper function to create website schema
export const createWebsiteSchema = (website: { name: string; url: string; potentialAction?: any }) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: website.name,
    url: website.url,
    ...(website.potentialAction && { potentialAction: website.potentialAction }),
  };
};
