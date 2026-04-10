import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locationPages } from '@/data/locations';
import { constructMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';
import JsonLd from '@/components/JsonLd';
import BackButton from '@/components/ui/BackButton';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locationPages[slug];
  if (!location) return {};

  return constructMetadata({
    title: location.title,
    description: location.description,
    canonical: `https://naftexnika.az/xidmet-bolgeleri/${slug}`
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = locationPages[slug];

  if (!location) {
    notFound();
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `NAF Texnika - ${location.h1}`,
    "description": location.description,
    "url": `https://naftexnika.az/xidmet-bolgeleri/${slug}`,
    "areaServed": {
      "@type": "City",
      "name": location.slug === 'baki' ? 'Baku' : location.slug === 'sumqayit' ? 'Sumqayıt' : 'Abşeron'
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "NAF Texnika",
      "url": "https://naftexnika.az"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Səhifə",
        "item": "https://naftexnika.az"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Xidmət Bölgələri",
        "item": `https://naftexnika.az/xidmet-bolgeleri/${slug}`
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="bg-black">
        <Navbar />
      </div>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-neutral-50 py-24 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn direction="up">
              <div className="mb-12">
                <BackButton href="/" />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black mb-8">
                {location.h1}
              </h1>
              <p className="text-xl md:text-2xl text-black/60 max-w-3xl font-medium leading-relaxed">
                {location.intro}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {location.sections.map((section, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <h2 className="text-2xl md:text-3xl font-black text-black mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-black/60 leading-relaxed font-medium">
                    {section.content}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black mb-8">
                {location.slug === 'baki' ? 'Bakıda' : location.slug === 'sumqayit' ? 'Sumqayıtda' : 'Abşeronda'} Texnika Sifarişi Vermək
              </h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                Bizimlə əlaqə saxlayın və layihəniz üçün ən uyğun texnikanı ən qısa zamanda əldə edin.
              </p>
            </FadeIn>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(locationPages).map((slug) => ({
    slug,
  }));
}
