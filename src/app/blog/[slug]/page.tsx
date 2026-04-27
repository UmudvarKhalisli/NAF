import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { constructMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';
import JsonLd from '@/components/JsonLd';
import BackButton from '@/components/ui/BackButton';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return constructMetadata({
      title: post.title,
      description: post.excerpt,
      canonical: `https://naftexnika.az/blog/${slug}`
    });
  } catch (e) {
    return {};
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const post = await getPostData(slug);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "image": `https://naftexnika.az${post.featuredImage || '/icon.png'}`,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": "NAF Texnika"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NAF Texnika",
        "logo": {
          "@type": "ImageObject",
          "url": "https://naftexnika.az/icon.png"
        }
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
          "name": "Bloq",
          "item": "https://naftexnika.az/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://naftexnika.az/blog/${slug}`
        }
      ]
    };

    return (
      <div className="bg-white min-h-screen">
        <JsonLd data={articleSchema} />
        <JsonLd data={breadcrumbSchema} />
        <div className="bg-black">
          <Navbar />
        </div>

        <main className="pt-32">
          {/* Post Header */}
          <section className="bg-neutral-50 py-24 border-b border-black/5">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <FadeIn direction="up">
                <div className="mb-12">
                  <BackButton href="/blog" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-black tracking-widest text-neutral-400 uppercase">{post.date}</span>
                  <span className="w-6 h-[1px] bg-neutral-200" />
                  <span className="text-xs font-black tracking-widest text-[#f59e0b] uppercase">{post.category}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-8 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl md:text-2xl text-black/60 font-medium leading-relaxed italic border-l-4 border-black/10 pl-8">
                  {post.excerpt}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Featured Image */}
          {post.featuredImage && (
            <section className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
              <Image 
                src={post.featuredImage} 
                alt={`NAF Texnika ${post.title} İcarəsi Bakı`} 
                fill 
                priority 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-black/5" />
            </section>
          )}

          {/* Post Content */}
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <FadeIn className="prose prose-lg prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:text-black/70 prose-strong:font-black">
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
              </FadeIn>

              {/* Dynamic CTA for Blog */}
              <FadeIn className="mt-24 bg-black text-white rounded-3xl p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Layihəniz üçün <span className="text-white/40 italic">Texnika Lazımdır?</span></h3>
                  <p className="text-white/60 mb-8 font-medium max-w-xl">
                    Bu yazıda bəhs etdiyimiz texnikaların və daha çoxunun icarəsi üçün NAF Texnika sizə ən sərfəli şərtləri təklif edir.
                  </p>
                  <Link href="/texnikalar" className="inline-flex items-center justify-center bg-white text-black py-3 px-8 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-neutral-200 transition-colors">
                    Texnikalara Baxın
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>

          <ContactForm />
        </main>

        <Footer />
      </div>
    );
  } catch (e) {
    notFound();
  }
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
