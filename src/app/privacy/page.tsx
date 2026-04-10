import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/ui/BackButton";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Məxfilik Siyasəti | NAF Texnika",
  description: "NAF Texnika müştəri məlumatlarının qorunmasına və məxfiliyinə tam zəmanət verir. Məlumatların toplanması və istifadəsi qaydaları ilə tanış olun.",
  canonical: "https://naftexnika.az/privacy"
});

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="bg-black">
        <Navbar />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
        <div className="mb-12">
          <BackButton href="/" />
        </div>
        
        <FadeIn>
          <span className="text-[12px] tracking-[0.4em] font-bold text-black/40 uppercase mb-8 block font-sans">HÜQUQİ SƏNƏD</span>
          <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-black uppercase mb-16 leading-none">
            MƏXFİLİK <br/> SİYASƏTİ
          </h1>
          
          <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-black prose-p:text-black/70 prose-p:leading-relaxed prose-strong:text-black">
            <p className="text-xl font-medium text-black mb-12 leading-relaxed">
              NAF Texnika olaraq istifadəçilərimizin məxfiliyi və fərdi məlumatlarının təhlükəsizliyi bizim üçün ən yüksək prioritetdir. Bu Məxfilik Siyasəti, saytımızdan istifadə edərkən topladığımız məlumatların növünü, onların necə istifadə olunduğunu və qorunduğunu izah edir.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">1. Giriş və Siyasətin Məqsədi</h2>
            <p>
              Bu siyasət https://naftexnika.az domenində təqdim olunan xidmətlər zamanı fərdi məlumatların emalı prosesini tənzimləyir. Məqsədimiz, NAF Texnika xidmətlərindən istifadə edən hər bir şəxsin məlumatlarının Azərbaycan Respublikasının qanunvericiliyinə və beynəlxalq standartlara uyğun qorunmasını təmin etməkdir.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">2. Hansı Məlumatlar Toplanır?</h2>
            <p>Xidmət keyfiyyətini artırmaq və sorğularınızı cavablandırmaq üçün aşağıdakı məlumatları toplaya bilərik:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Şəxsi məlumatlar:</strong> Ad, soyad.</li>
              <li><strong>Əlaqə məlumatları:</strong> Telefon nömrəsi, e-poçt ünvanı.</li>
              <li><strong>Korporativ məlumatlar:</strong> Şirkət adı, vəzifə.</li>
              <li><strong>Sifariş məlumatları:</strong> Texnika icarəsi ilə bağlı konkret sorğular və xidmət detalları.</li>
              <li><strong>Texniki məlumatlar:</strong> IP ünvanı, brauzer növü, daxil olduğunuz səhifələr və saytda keçirdiyiniz vaxt.</li>
              <li><strong>Cookie (Kuki) məlumatları:</strong> İstifadəçi təcrübəsini fərdiləşdirmək üçün istifadə olunan fayllar.</li>
            </ul>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">3. Məlumatların İstifadə Məqsədləri</h2>
            <p>Toplanılan məlumatlar aşağıdakı məqsədlər üçün istifadə olunur:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Daxil olan icarə sorğularına və suallara operativ cavab vermək;</li>
              <li>Sifariş prosesini dəqiqləşdirmək və müqavilə öhdəliklərini yerinə yetirmək;</li>
              <li>Xidmət keyfiyyətini analiz etmək və saytın funksionallığını artırmaq;</li>
              <li>Yeniliklər, kampaniyalar və xidmət dəyişiklikləri barədə istifadəçini məlumatlandırmaq;</li>
              <li>Təhlükəsizliyi təmin etmək və filtrasiya proseslərini həyata keçirmək.</li>
            </ul>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">4. Məlumatların Emalı və Qorunması</h2>
            <p>
              NAF Texnika müasir proqram təminatı və SSL şifrələmə sistemlərindən istifadə edərək məlumatlarınızın icazəsiz girişlərdən, dəyişdirilmədən və ya itirilmədən qorunmasını təmin edir. Məlumatlara giriş yalnız konkret xidmət üzrə cavabdeh olan səlahiyyətli əməkdaşlarla məhdudlaşdırılır.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">5. Məlumatların Saxlanma Müddəti</h2>
            <p>
              Fərdi məlumatlar toplandığı məqsədə xidmət etdiyi müddətcə və ya qanunvericiliklə nəzərdə tutulmuş müddət ərzində saxlanılır. Xidmət tam başa çatdıqdan və hüquqi tələblər ödənildikdən sonra məlumatlar anonimləşdirilir və ya silinir.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">6. Üçüncü Tərəflərlə Paylaşılma</h2>
            <p>
              Məlumatlarınız sizin razılığınız olmadan heç bir halda üçüncü tərəflərə marketinq məqsədilə satılmır və ya ötürülmür. Məlumatlar yalnız aşağıdakı hallarda paylaşıla bilər:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Xidmətin göstərilməsi üçün zəruri olan tərəfdaşlar və subpodratçılarla (məxfilik qorunmaq şərti ilə);</li>
              <li>Dövlət orqanları tərəfindən rəsmi və qanuni tələb daxil olduqda;</li>
              <li>Şirkətin hüquqlarını və təhlükəsizliyini qorumaq zərurəti yarandıqda.</li>
            </ul>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">7. Cookie (Kuki) və Analitika</h2>
            <p>
              Saytımız kuki fayllarından istifadə edir. Kukilər saytı necə istifadə etdiyinizi anlamağa və sizə daha yaxşı navigasiya təqdim etməyə kömək edir. Siz brauzerinizin tənzimləmələrindən kukiləri rədd edə bilərsiniz, lakin bu zaman saytın bəzi funksiyaları məhdudlaşa bilər.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">8. İstifadəçinin Hüquqları</h2>
            <p>İstifadəçi olaraq aşağıdakı hüquqlara maliksiniz:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Toplanan məlumatlar haqqında məlumat almaq;</li>
              <li>Yanlış məlumatların düzəldilməsini tələb etmək;</li>
              <li>Məlumatların silinməsini və ya dondurulmasını tələb etmək;</li>
              <li>Məlumatların emalına dair razılığı geri çağırmaq.</li>
            </ul>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">9. Yetkinlik Yaşına Çatmayanlar</h2>
            <p>
              Xidmətlərimiz əsasən korporativ və peşəkar istifadəçilər üçün nəzərdə tutulub. Yetkinlik yaşına çatmayan şəxslərdən bilərəkdən məlumat toplamırıq. Əgər belə bir hal aşkar olunarsa, həmin məlumat dərhal silinəcəkdir.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">10. Əlaqə və Müraciət</h2>
            <p>Bu siyasət və ya məlumatlarınızla bağlı hər hansı sualınız olduqda bizimlə əlaqə saxlaya bilərsiniz:</p>
            <div className="bg-neutral-50 p-8 border border-black/5 rounded-2xl space-y-3 not-italic">
              <p><strong>Telefon:</strong> +994 50 962 77 66</p>
              <p><strong>E-poçt:</strong> info@naftexnika.az</p>
              <p><strong>Ünvan:</strong> Bakı, Azərbaycan</p>
            </div>

            <div className="mt-24 pt-12 border-t border-black/5">
              <p className="text-sm font-bold text-black/30 tracking-widest uppercase italic">
                Son yenilənmə tarixi: 04.04.2026
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
