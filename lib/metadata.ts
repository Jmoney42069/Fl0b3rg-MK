import type { Metadata } from "next";

const SITE_URL = "https://www.floberg.nl";
const SITE_NAME = "Floberg Makelaardij";
const DEFAULT_TITLE =
  "Floberg Makelaardij — Makelaar in Huizen & Bussum";
const DEFAULT_DESCRIPTION =
  "Floberg Makelaardij is dé NVM-makelaar in Huizen en Bussum. Verkoop, aankoop en taxatie van woningen in het Gooi. Bel 035-5262960 voor een vrijblijvend gesprek.";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "makelaar Huizen",
    "makelaar Bussum",
    "NVM makelaar Gooi",
    "huis verkopen Huizen",
    "huis kopen Bussum",
    "taxatie Gooi",
    "Floberg makelaardij",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Makelaar in Huizen & Bussum`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

interface GeneratePageMetadataOptions {
  pageTitle: string;
  pageDescription: string;
  pagePath: string;
  ogImage?: string;
}

export function generatePageMetadata({
  pageTitle,
  pageDescription,
  pagePath,
  ogImage = DEFAULT_OG_IMAGE,
}: GeneratePageMetadataOptions): Metadata {
  const canonicalUrl = `${SITE_URL}${pagePath}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: pagePath },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: `${pageTitle} | ${SITE_NAME}`,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${pageTitle} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${SITE_NAME}`,
      description: pageDescription,
      images: [ogImage],
    },
  };
}
