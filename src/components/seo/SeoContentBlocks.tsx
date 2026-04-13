import React from 'react';
import FadeIn from '../FadeIn';

interface SeoContentBlocksProps {
  primaryKeyword: string;
  usage: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

const SeoContentBlocks: React.FC<SeoContentBlocksProps> = ({
  primaryKeyword,
  usage,
  benefits,
  faqs
}) => {
  return (
    <div className="space-y-24 py-12">
      {/* Usage Section */}
      <section>
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-black tracking-tight text-black leading-tight uppercase">
                Bu texnika nə üçün <br /> <span className="text-black/30 text-2xl">istifadə olunur?</span>
              </h2>
              <div className="w-12 h-1 bg-black mt-6" />
            </div>
            <div className="md:w-2/3">
              <p className="text-xl text-black/60 font-medium leading-relaxed italic border-l-4 border-black/10 pl-8">
                {usage}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Benefits Section */}
      <section className="bg-neutral-50 -mx-6 md:-mx-12 px-6 md:px-12 py-24 rounded-3xl border border-black/5">
        <FadeIn>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-black tracking-tight text-black mb-12 uppercase leading-none">
              NAF Texnika ilə <br /> <span className="text-black/30 italic text-4xl">İcarə Üstünlükləri</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">
                    {idx + 1}
                  </div>
                  <p className="font-bold text-black/80 leading-snug">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section>
          <FadeIn>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-black tracking-tight text-black mb-12 uppercase">
                Tez-tez Verilən <span className="text-black/30 italic">Suallar</span>
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="group border-b border-black/10 pb-8">
                    <h3 className="text-xl font-black text-black mb-4 group-hover:text-black/60 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-lg text-black/60 font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* CTA Block */}
      <section className="bg-black text-white rounded-3xl p-12 md:p-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
        <FadeIn className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
              Layihəniz üçün <br /> <span className="text-white/40 italic">Texnika Sifariş Edin</span>
            </h2>
            <p className="text-white/60 text-lg font-medium max-w-md">
              Bakı və ətraf bölgələr üzrə ən sürətli çatdırılma və münasib qiymətlərlə {primaryKeyword} xidmətindən yararlanın.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center bg-white text-black py-4 px-10 font-black uppercase tracking-widest text-sm rounded-xl hover:bg-neutral-200 transition-colors"
            >
              İndi Təklif Al
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default SeoContentBlocks;
