import { Helmet } from "react-helmet-async";

const DEFAULT = {
  title: "Coach Lady Wassa Traoré | Cabinet Mindset Coaching — Neurosciences Appliquées",
  description:
    "MasterCoach ICI certifié, Life & Corporate Coach. Formations, coaching et quiz fondés sur les neurosciences pour dirigeants, femmes actives et étudiants. Ouagadougou, Burkina Faso.",
  image: "https://www.coachladywassa.com/og-image.jpg",
  url: "https://www.coachladywassa.com",
  type: "website",
  keywords:
    "coach neurosciences, Lady Wassa, mindset coaching, développement personnel, Burkina Faso, Ouagadougou, gestion stress, confiance en soi, peur, neuroplasticité, coaching Afrique, Voix de Reine",
};

export default function SEO({
  title,
  description,
  image,
  url,
  type,
  keywords,
  article,
  noindex = false,
}) {
  const pageTitle = title ? `${title} | Coach Lady Wassa` : DEFAULT.title;
  const pageDesc = description || DEFAULT.description;
  const pageImage = image || DEFAULT.image;
  const pageUrl = url || DEFAULT.url;
  const pageType = type || DEFAULT.type;
  const pageKeywords = keywords || DEFAULT.keywords;

  // JSON-LD structured data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lady Wassa Traoré",
    alternateName: "Coach Lady Wassa",
    jobTitle: "MasterCoach ICI, Life & Corporate Coach",
    worksFor: {
      "@type": "Organization",
      name: "Cabinet Mindset Coaching",
    },
    url: "https://www.coachladywassa.com",
    image: pageImage,
    sameAs: [
      "https://www.facebook.com/coachladywassa",
      "https://www.instagram.com/coachladywassa",
    ],
    knowsAbout: [
      "Neurosciences appliquées",
      "Coaching de dirigeants",
      "Développement personnel",
      "Gestion du stress",
      "Confiance en soi",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ouagadougou",
      addressCountry: "BF",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Cabinet Mindset Coaching",
    founder: { "@type": "Person", name: "Lady Wassa Traoré" },
    url: "https://www.coachladywassa.com",
    logo: "https://www.coachladywassa.com/logo-mindset-coaching.jpg",
    image: pageImage,
    description: DEFAULT.description,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ouagadougou",
      addressCountry: "BF",
    },
    areaServed: ["BF", "CI", "SN", "FR", "CA", "BE"],
    serviceType: [
      "Coaching en neurosciences",
      "Formation en développement personnel",
      "Webinaires",
    ],
  };

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: pageDesc,
        image: pageImage,
        author: {
          "@type": "Person",
          name: "Lady Wassa Traoré",
        },
        publisher: {
          "@type": "Organization",
          name: "Cabinet Mindset Coaching",
          logo: {
            "@type": "ImageObject",
            url: "https://www.coachladywassa.com/logo-mindset-coaching.jpg",
          },
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        mainEntityOfPage: pageUrl,
      }
    : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={pageUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={pageType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="fr_BF" />
      <meta property="og:site_name" content="Coach Lady Wassa" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
}
