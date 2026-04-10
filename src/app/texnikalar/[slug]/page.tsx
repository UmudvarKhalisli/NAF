import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { servicePages } from '@/data/services';
import { constructMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EquipmentGrid from '@/components/equipment/EquipmentGrid';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';
import JsonLd from '@/components/JsonLd';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages[slug];
  if (!service) return {};

  return constructMetadata({
    title: service.title,
    description: service.description,
    canonical: `https://naftexnika.az/texnikalar/${slug}`
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicePages[slug];

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.h1,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "NAF Texnika",
      "url": "https://naftexnika.az"
    },
    "areaServed": [
      { "@type": "City", "name": "Baku" },
      { "@type": "City", "name": "Sumqayit" },
      { "@type": "City", "name": "Khirdalan" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.category,
      "itemListElement": []
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
        "name": "Texnikalar",
        "item": "https://naftexnika.az/texnikalar"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.h1,
        "item": `https://naftexnika.az/texnikalar/${slug}`
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="bg-black">
        <Navbar />
      </div>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-neutral-50 py-24 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn direction="up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black mb-8">
                {service.h1}
              </h1>
              <p className="text-xl md:text-2xl text-black/60 max-w-3xl font-medium leading-relaxed">
                {service.intro}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {service.sections.map((section, idx) => (
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

        {/* Equipment Grid for this category */}
        <section className="py-24 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn className="mb-12">
              <h2 className="text-3xl font-black text-black mb-4">Mövcud Texnikalar</h2>
              <div className="w-12 h-1 bg-black" />
            </FadeIn>
            {/* @ts-ignore - Async Component */}
            <EquipmentGrid category={service.category} />
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({
    slug,
  }));
}
