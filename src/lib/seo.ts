import { Metadata } from "next";

export const SITE_URL = "https://naftexnika.az";
export const SITE_NAME = "NAF Texnika";

export function constructMetadata({
  title,
  description,
  image = "/icon.png",
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  const defaultTitle = "Tikinti Texnikası İcarəsi Bakı | Kran, Ekskavator, Səbət Maşını - NAF Texnika";
  const defaultDesc = "Bakı və ətraf bölgələrdə tikinti texnikası icarəsi xidməti. Kran, ekskavator, avtokran, səbət maşını və digər texnikalar üçün NAF Texnika ilə əlaqə saxlayın.";

  const finalTitle = title ? `${title} | ${SITE_NAME}` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalCanonical = canonical || SITE_URL;

  return {
    title: finalTitle,
    description: finalDesc,
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url: finalCanonical,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
        },
      ],
      type: "website",
      locale: "az_AZ",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDesc,
      images: [image],
      creator: "@naftexnika",
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: finalCanonical,
    },
    verification: {
      google: "9ZpZjOt1jjfndBksCT2eNtccK34O1HRcwXe6Qh1xM7c",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
