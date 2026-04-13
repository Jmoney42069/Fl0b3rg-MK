import type { Property } from "@/types/property";

const SITE_URL = "https://www.floberg.nl";

// ─── LocalBusiness / RealEstateAgent ────────────────────────────────────────

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Floberg Makelaardij",
    alternateName: "Floberg.nl Makelaardij",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description:
      "NVM-makelaar in Huizen en Bussum. Specialist in verkoop, aankoop en taxatie van woningen in het Gooi.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Achterbaan 40",
      addressLocality: "Huizen",
      postalCode: "1271 TZ",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.2957,
      longitude: 5.2332,
    },
    telephone: "+31355262960",
    email: "info@floberg.nl",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:30",
      },
    ],
    priceRange: "€€",
    areaServed: [
      "Huizen",
      "Bussum",
      "Naarden",
      "Blaricum",
      "Laren",
      "Hilversum",
    ],
    memberOf: {
      "@type": "Organization",
      name: "NVM",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.1",
      reviewCount: "200",
      bestRating: "10",
      worstRating: "1",
    },
  };
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── RealEstateListing (per property) ────────────────────────────────────────

export function generatePropertySchema(property: Property) {
  const statusMap: Record<string, string> = {
    beschikbaar: "https://schema.org/ForSale",
    "onder-bod": "https://schema.org/ForSale",
    "open-huis": "https://schema.org/ForSale",
    verkocht: "https://schema.org/Sold",
  };

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/aanbod/${property.slug}`,
    image: property.images[0] ?? "",
    datePosted: property.listedDate,
    price: property.price,
    priceCurrency: "EUR",
    businessFunction: statusMap[property.status] ?? "https://schema.org/ForSale",
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address.street,
      addressLocality: property.address.city,
      postalCode: property.address.postalCode,
      addressCountry: "NL",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.surfaceArea,
      unitCode: "MTK",
    },
    numberOfRooms: property.bedrooms,
    seller: {
      "@type": "RealEstateAgent",
      name: "Floberg Makelaardij",
      url: SITE_URL,
    },
  };
}
