import { Helmet } from "react-helmet";

type SEOProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
};

const SEOHead = ({
  title = "EllowDigital | Empowering Digital Transformation for Businesses",
  description = "EllowDigital specializes in digital transformation, offering SEO services, web development, UI/UX design, and digital marketing solutions to boost your business growth.",
  canonicalUrl = "https://ellowdigitals.me/",
  ogType = "website",
  ogImage = "https://ellowdigital.netlify.app/favicon/share.jpg",
  ogImageAlt = "EllowDigital logo and branding",
  twitterCard = "summary_large_image",
  structuredData,
  children,
}: SEOProps) => {
  // Default structured data for the organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EllowDigital",
    url: "https://ellowdigitals.me",
    logo: "https://ellowdigitals.netlify.app/assets/favicon/share.jpg",
    sameAs: [
      "https://www.facebook.com/ellowdigitals",
      "https://twitter.com/ellowdigitals",
      "https://www.linkedin.com/company/ellowdigitals",
      "https://www.instagram.com/ellowdigitals",
    ],
    description:
      "EllowDigital provides digital transformation services including SEO, web development, and digital marketing solutions designed to accelerate business growth.",
  };

  // Use custom structured data or default
  const jsonLd = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="EllowDigital" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:site" content="@EllowDigital" />
      <meta name="twitter:creator" content="@EllowDigital" />

      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Additional meta tags can be passed as children */}
      {children}
    </Helmet>
  );
};

export default SEOHead;
