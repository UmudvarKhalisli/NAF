import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/ui/BackButton";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "İstifadə Şərtləri | NAF Texnika",
  description: "NAF Texnika saytından istifadə qaydaları, xidmət şərtləri və hüquqi öhdəliklər haqqında ətraflı məlumat.",
  canonical: "https://naftexnika.az/terms"
});

export default function TermsPage() {
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
            İSTİFADƏ <br/> ŞƏRTLƏRİ
          </h1>
          
          <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-black prose-p:text-black/70 prose-p:leading-relaxed prose-strong:text-black">
            <p className="text-xl font-medium text-black mb-12 leading-relaxed">
              Bu İstifadə Şərtləri https://naftexnika.az saytından (bundan sonra "Sayt") istifadə qaydalarını və NAF Texnika (bundan sonra "Şirkət") tərəfindən təqdim olunan xidmətlərin hüquqi əsaslarını müəyyən edir. Sayta daxil olmaqla, siz bu şərtlərlə razılaşmış hesab olunursunuz.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">1. Saytın İstifadə Qaydaları</h2>
            <p>
              İstifadəçilər Saytı yalnız qanuni məqsədlər üçün istifadə edə bilərlər. Saytda yer alan məlumatlar, texnika kataloqu və xidmət təsvirləri istifadəçilərə seçim etmək və Şirkətlə əlaqə saxlamaq üçün təqdim olunur. Saytın fəaliyyətinə mane olacaq hər hansı müdaxilə, zərərli kodların yerləşdirilməsi və ya saxta sorğuların göndərilməsi qəti qadağandır.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">2. Məlumatların Xarakteri</h2>
            <p>
              Saytda təqdim olunan bütün məzmun (texniki göstəricilər, şəkillər, xidmət növləri) ümumi məlumat xarakteri daşıyır. Şirkət bu məlumatların dəqiqliyinə çalışsa da, texniki parametrlər istehsalçı dəyişikliklərinə və ya parkın yenilənməsinə görə fərqlənə bilər.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">3. Xidmət Sorğusu və Müqavilə</h2>
            <p>
              Sayt üzərindən göndərilən icarə sorğusu və ya əlaqə formunun doldurulması avtomatik olaraq icarə müqaviləsi sayılmır. İdarəetmə və hüquqi öhdəliklər yalnız tərəflər arasında rəsmi müqavilə imzalandıqdan və ya sifariş təsdiq edildikdən sonra yaranır.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">4. Qiymət və Mövcudluq</h2>
            <p>
              Saytda qeyd olunan (əgər varsa) və ya sorğu əsasında təqdim olunan ilkin qiymətlər təxminidir. Yekun qiymət texnikanın növünə, icarə müddətinə, xidmət göstəriləcəyi bölgəyə və operator xidmətinin təfərrüatlarına əsasən ayrıca razılaşdırılır. Texnikanın mövcudluğu (stokda olması) sorğu anındakı vəziyyətə görə dəyişə bilər.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">5. İstifadəçi Öhdəlikləri</h2>
            <p>
              İstifadəçi sorğu formlarını doldurarkən düzgün, aktual və tam məlumat verməyə borcludur. Saxta əlaqə məlumatları ilə göndərilən sorğular Şirkət tərəfindən ləğv edilə bilər.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">6. Əqli Mülkiyyət Hüquqları</h2>
            <p>
              Saytın dizaynı, mətni, loqosu, qrafik təsvirləri və proqram kodu NAF Texnika şirkətinə məxsusdur və müəlliflik hüququ ilə qorunur. Şirkətin yazılı icazəsi olmadan bu materialların kopyalanması, yayılması və ya kommersiya məqsədilə istifadəsi qadağandır.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">7. Məsuliyyətin Məhdudlaşdırılması</h2>
            <p>
              Şirkət Saytın istifadəsi zamanı baş verə biləcək texniki kəsintilərə, məlumat itkisinə və ya dolayı zərərlərə görə məsuliyyət daşımır. Həmçinin, Saytdan keçid verilən üçüncü tərəf resurslarının (sosial media şəbəkələri və s.) məzmununa görə Şirkət cavabdehlik daşımır.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">8. Fors-Major</h2>
            <p>
              Təbii fəlakətlər, müharibə şəraiti, dövlət qərarları və ya digər qarşısıalınmaz qüvvələr (fors-major) səbəbindən xidmətin göstərilməsində və ya Saytın əlçatanlığında yaranan çətinliklərə görə tərəflər məsuliyyət daşımır.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">9. Şərtlərin Dəyişdirilməsi</h2>
            <p>
              Şirkət istənilən vaxt, əvvəlcədən xəbərdarlıq etmədən bu İstifadə Şərtlərini dəyişdirmək hüququnu özündə saxlayır. Yenilənmiş şərtlər Saytda dərc edildiyi andan qüvvəyə minir.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">10. Mübahisələrin Həlli</h2>
            <p>
              Bu şərtlərdən irəli gələn bütün mübahisələr Azərbaycan Respublikasının qanunvericiliyi əsasında, danışıqlar yolu ilə, bu mümkün olmadıqda isə aidiyyəti məhkəmələr tərəfindən həll edilir.
            </p>

            <h2 className="text-2xl mt-16 mb-8 uppercase tracking-tight">11. Əlaqə</h2>
            <p>Şərtlərlə bağlı hər hansı sualınız olduqda bizimlə əlaqə saxlaya bilərsiniz:</p>
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
