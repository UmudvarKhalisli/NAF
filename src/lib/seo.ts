import { Metadata } from "next";

export const SITE_URL = "https://naftexnika.az";
export const SITE_NAME = "NAF Texnika";

export function constructMetadata({
  title,
  description,
  image = "/icon.png",
  noIndex = false,
  canonical = SITE_URL,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  const defaultTitle = "Tikinti Texnikası İcarəsi Bakı | Kran, Ekskavator, Səbət Maşını - NAF Texnika";
  const defaultDesc = "Bakı və ətraf bölgələrdə tikinti texnikası icarəsi xidməti. Kran, ekskavator, avtokran, səbət maşını və digər texnikalar üçün NAF Texnika ilə əlaqə saxlayın.";

  return {
    title: title ? `${title} | ${SITE_NAME}` : defaultTitle,
    description: description || defaultDesc,
    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDesc,
      url: SITE_URL,
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
      title: title || defaultTitle,
      description: description || defaultDesc,
      images: [image],
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical,
    },
    verification: {
      google: "9ZpZjOt1jjfndBksCT2eNtccK34O1HRcwXe6Qh1xM7c",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
