import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, unknown>;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
  children?: React.ReactNode;
};

const SEOHead = ({
  title = "EllowDigital | Digital Transformation Services in India",
  description = "EllowDigital offers expert web development, SEO optimization, and digital marketing solutions. Transform your business with cutting-edge digital services.",
  canonicalUrl = "https://ellowdigital.space/",
  ogType = "website",
  ogImage = "https://ellowdigital.space/favicon/share.jpg",
  ogImageAlt = "EllowDigital - Digital Transformation Services",
  twitterCard = "summary_large_image",
  structuredData,
  keywords = "web development, digital marketing, SEO services, UI/UX design, business websites, India",
  author = "EllowDigital",
  publishedTime,
  modifiedTime,
  section,
  noindex = false,
  children,
}: SEOProps) => {
  // Default BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ellowdigital.space/",
      },
    ],
  };

  // Default organization structured data (Enhanced for E-E-A-T)
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://ellowdigital.space/#organization",
    name: "EllowDigital",
    alternateName: "Ellow Digital",
    url: "https://ellowdigital.space",
    logo: {
      "@type": "ImageObject",
      url: "https://ellowdigital.space/logo.webp",
      width: 512,
      height: 512,
    },
    image: "https://ellowdigital.space/favicon/share.jpg",
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Sarwan Yadav",
      jobTitle: "Founder & Lead Developer",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "ellowdigitalindia@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/ellowdigitals",
      "https://twitter.com/ellowdigitals",
      "https://www.linkedin.com/company/ellowdigitals",
      "https://www.instagram.com/ellowdigitals",
    ],
    description:
      "EllowDigital provides professional digital transformation services including web development, SEO optimization, UI/UX design, and digital marketing solutions for businesses across India.",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    slogan: "Transform Your Digital Presence",
    knowsAbout: [
      "Web Development",
      "SEO Services",
      "Digital Marketing",
      "UI/UX Design",
      "Mobile App Development",
      "E-commerce Solutions",
    ],
  };

  const jsonLd = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="EllowDigital" />
      <meta property="og:locale" content="en_IN" />

      {/* Article specific OG tags */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {section && <meta property="article:section" content={section} />}

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
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Additional meta tags can be passed as children */}
      {children}
    </Helmet>
  );
};

export default SEOHead;
