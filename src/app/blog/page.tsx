import { getSortedPostsData } from '@/lib/blog';
import { constructMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import BackButton from '@/components/ui/BackButton';

export const metadata = constructMetadata({
  title: "Bloq | Tikinti Texnikası Haqqında Faydalı Məlumatlar",
  description: "Tikinti texnikası icarəsi, kranlar, ekskavatorlar və bazardakı ən son texnologiyalar haqqında faydalı bloq yazılarımızı oxuyun.",
  canonical: "https://naftexnika.az/blog"
});

export default function BlogListingPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-6">
            <BackButton href="/" />
          </div>
          <div className="mb-16 border-b border-black/5 pb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-6">
              NAF Texnika Bloq
            </h1>
            <p className="text-xl text-black/60 max-w-2xl font-medium">
              Sənaye və tikinti texnikası sahəsində peşəkar məsləhətlər, yeniliklər və faydalı bələdçilər.
            </p>
          </div>

          {allPostsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {allPostsData.map((post, idx) => (
                <FadeIn key={post.slug} delay={idx * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full bg-white border border-black/5 hover:border-black transition-all duration-500 rounded-3xl overflow-hidden hover:shadow-2xl">
                    <div className="aspect-[16/9] bg-neutral-100 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      {/* Placeholder for real images */}
                      <div className="w-full h-full flex items-center justify-center text-black/20 font-black text-2xl bg-neutral-200">
                        {post.category || "NAF"}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">{post.date}</span>
                        <span className="w-4 h-[1px] bg-neutral-200" />
                        <span className="text-[10px] font-black tracking-widest text-[#f59e0b] uppercase">{post.category}</span>
                      </div>
                      <h2 className="text-2xl font-black text-black group-hover:text-neutral-700 transition-colors mb-4 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-black/60 font-medium line-clamp-3 mb-8">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] font-black tracking-widest text-black uppercase">
                        Ardını Oxu
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-black/10 text-black/40 font-bold uppercase tracking-widest">
              Tezliklə yeni yazılarımız burada olacaq.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
