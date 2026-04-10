import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { constructMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

          {/* Post Content */}
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <FadeIn className="prose prose-lg prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:text-black/70 prose-strong:font-black">
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
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
