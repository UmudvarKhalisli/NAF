export interface SeoMapping {
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  usage: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const equipmentSeoMapping: Record<string, SeoMapping> = {
  "kran-icaresi": {
    primaryKeyword: "kran icarəsi azərbaycan",
    secondaryKeywords: ["kran sifarişi bakı", "mobil kran kirayəsi", "qarabağda kran icarəsi"],
    metaTitle: "Kran İcarəsi Bakı və Azərbaycan | Bütün Rayonlar üzrə Xidmət",
    metaDescription: "Bütün Azərbaycan ərazisində saatlıq və günlük kran icarəsi xidməti. Bakıdan Qarabağa qədər operativ kran sifarişi, peşəkar operator xidməti ilə.",
    h1: "Kran İcarəsi Azərbaycan",
    intro: "NAF Texnika bütün Azərbaycan ərazisində, o cümlədən Qarabağ və ətraf rayonlarda yüksək tonnajlı kran icarəsi xidməti təklif edir.",
    usage: "Kranlar ağır yüklərin qaldırılması, hündürmərtəbəli binaların tikintisi, sənaye avadanlıqlarının montajı və iri həcmli konstruksiyaların yerləşdirilməsi üçün əvəzolunmazdır.",
    benefits: [
      "Müxtəlif tonnajlı kran seçimi",
      "Peşəkar və təcrübəli operatorlar",
      "Saatlıq, günlük və aylıq icarə imkanı",
      "7/24 texniki dəstək və operativ xidmət"
    ],
    faqs: [
      {
        question: "Ən kiçik icarə müddəti nə qədərdir?",
        answer: "Kranlar üçün minimum icarə müddəti adətən 4 saatdan başlayır."
      },
      {
        question: "Sifariş üçün nə qədər əvvəl əlaqə saxlamalıyıq?",
        answer: "Təcili hallarda 2 saat əvvəl xəbər verməyiniz kifayətdir, lakin 1 gün əvvəldən bron etmək daha zəmanətlidir."
      }
    ]
  },
  "avtokran-icaresi": {
    primaryKeyword: "avtokran icarəsi azərbaycan",
    secondaryKeywords: ["avtokran sifarişi bakı", "mobil kran icarəsi", "regionlarda yükqaldırma"],
    metaTitle: "Avtokran İcarəsi Azərbaycan | Bakı və Bütün Bölgələr",
    metaDescription: "Bütün Azərbaycan üzrə, o cümlədən Qarabağda hər tonnajda avtokranların icarəsi. Tikinti və sənaye işləri üçün sürətli və etibarlı texnika.",
    h1: "Avtokran İcarəsi Azərbaycan",
    intro: "Avtokranlarımız Azərbaycanın istənilən nöqtəsinə, şəhərdaxili və çətin relyefli bölgələrə sürətli çatdırılma imkanı ilə fərqlənir.",
    usage: "Avtokranlar əsasən tikinti konstruksiyalarının quraşdırılması, ağır avadanlıqların daşınması və qısa müddətli yükqaldırma işləri üçün istifadə olunur.",
    benefits: [
      "Yüksək manevr qabiliyyəti",
      "Sürətli quraşdırılma və işə hazır vəziyyət",
      "Geniş tonnaj seçimi (16 tondan 200 tona qədər)",
      "Şəhər mərkəzində rahat hərəkət"
    ],
    faqs: [
      {
        question: "Avtokranların tonnajı necə müəyyən edilir?",
        answer: "Layihənizdə qaldırılacaq yükün çəkisinə və hündürlüyünə uyğun olaraq mütəxəssislərimiz sizə ən uyğun avtokranı tövsiyə edəcək."
      }
    ]
  },
  "ekskavator-icaresi": {
    primaryKeyword: "ekskavator icarəsi azərbaycan",
    secondaryKeywords: ["qazıntı işləri bakı", "tırtıllı ekskavator icarəsi", "regionlarda ekskavator kirayəsi"],
    metaTitle: "Ekskavator İcarəsi Azərbaycan | Qazıntı və Söküntü İşləri",
    metaDescription: "Bütün Azərbaycan ərazisində bünövrə qazıntısı və torpaq işləri üçün ekskavator icarəsi. Bakı, Gəncə və Qarabağda professional xidmət.",
    h1: "Ekskavator İcarəsi Azərbaycan",
    intro: "Azərbaycanın bütün bölgələrində torpaq qazıntı, söküntü və bünövrə işlərində NAF Texnika-nın müasir ekskavatorları xidmətinizdədir.",
    usage: "Ekskavatorlar xəndəklərin qazılması, binaların bünövrə işləri, ərazinin təmizlənməsi və köhnə tikililərin sökülməsi üçün istifadə olunur.",
    benefits: [
      "Güclü mühərrik və hidravlik sistem",
      "Dəyişdirilə bilən ucluqlar (qazan, çəkic)",
      "Tırtıllı və təkərli model seçimləri",
      "Yanacaq sərfiyyatında səmərəlilik"
    ],
    faqs: [
      {
        question: "Söküntü işləri üçün çəkic (hidroçəkic) əlavə olunur?",
        answer: "Bəli, ehtiyac olduqda ekskavatorlarımızı hidroçəkic ucluqları ilə təmin edirik."
      }
    ]
  },
  "buldozer-icaresi": {
    primaryKeyword: "buldozer icarəsi azərbaycan",
    secondaryKeywords: ["torpaq hamarlama bakı", "dozer kirayəsi", "qarabağda yol tikintisi"],
    metaTitle: "Buldozer İcarəsi Azərbaycan | Torpaq Hamarlama və Yol İşləri",
    metaDescription: "Bütün Azərbaycan üzrə torpaq işləri və ərazi hamarlanması üçün buldozer icarəsi. Müasir texnika və təcrübəli operatorlar.",
    h1: "Buldozer İcarəsi Azərbaycan",
    intro: "Azərbaycanın bütün bölgələrində yol tikintisi və böyük ərazilərin hamarlanması üçün NAF Texnika-nın güclü buldozerləri ən yaxşı seçimdir.",
    usage: "Buldozerlər əsasən torpağın qat-qat yayılması, ərazinin təmizlənməsi, daş və qayaların itələnməsi üçün istifadə olunur.",
    benefits: [
      "Yüksək itələmə gücü",
      "Geniş bıçaq ölçüləri",
      "Çətin relyefdə yüksək keçicilik",
      "Dəqiq hamarlama qabiliyyəti"
    ],
    faqs: [
      {
        question: "Buldozer saatlıq yoxsa günlük icarəyə verilir?",
        answer: "Biz həm saatlıq, həm də günlük icarə seçimləri təklif edirik, lakin uzunmüddətli işlər üçün daha xüsusi endirimlərimiz var."
      }
    ]
  },
  "mini-ekskavator-icaresi": {
    primaryKeyword: "mini ekskavator icarəsi",
    secondaryKeywords: ["dar sahə qazıntısı", "mini texnika kirayəsi", "kiçik ekskavator"],
    metaTitle: "Mini Ekskavator İcarəsi | Bakıda Kompakt Qazıntı Həlləri",
    metaDescription: "Həyətyanı sahələr və dar məkanlarda qazıntı işləri üçün mini ekskavator icarəsi. Çevik, sürətli və səmərəli texnika sifarişi.",
    h1: "Mini Ekskavator İcarəsi",
    intro: "Dar məkanlarda və böyük texnikaların daxil ola bilmədiyi yerlərdə mini ekskavatorlarımız köməyinizə çatır.",
    usage: "Kabel kanallarının qazılması, ağac əkilməsi, daxili söküntü işləri və landşaft dizaynında geniş istifadə olunur.",
    benefits: [
      "Kompakt ölçülər və yüksək çeviklik",
      "Rezin tırtıllar (asfaltı və otluğu zədələmir)",
      "Aşağı səslə işləmə",
      "Rahat nəql olunma"
    ],
    faqs: [
      {
        question: "Mini ekskavator neçə tona qədər olur?",
        answer: "Bizim mini ekskavator parkımız 1 tondan 5 tona qədər müxtəlif modelləri əhatə edir."
      }
    ]
  },
  "front-loader-icaresi": {
    primaryKeyword: "front loader icarəsi",
    secondaryKeywords: ["frontal yükləyici kirayəsi", "paqruzçik icarəsi", "yükləyici Bakı"],
    metaTitle: "Frontal Yükləyici İcarəsi Bakı | Yükləmə və Daşıma İşləri",
    metaDescription: "Qum, çınqıl və digər tikinti materiallarının yüklənməsi üçün front loader icarəsi. Bakı və ətrafında 24/7 operativ xidmət.",
    h1: "Frontal Yükləyici İcarəsi Bakı",
    intro: "İnşaat sahəsində materialların sürətli yüklənməsi və daşınması üçün mərkəzi frontal yükləyicilərimiz xidmətinizdədir.",
    usage: "Torpaq, qum, çınqıl kimi materialların yük maşınlarına doldurulması və qısa məsafəyə daşınması üçün nəzərdə tutulub.",
    benefits: [
      "Böyük qazan həcmi",
      "Sürətli hərəkət və yükləmə",
      "Davamlı təkər bazası",
      "Operator üçün geniş görüş bucağı"
    ],
    faqs: [
      {
        question: "Qazanın həcmi nə qədərdir?",
        answer: "Modellərimizdən asılı olaraq qazan həcmi 1.5 m³-dən 4 m³-ə qədər dəyişir."
      }
    ]
  },
  "backhoe-loader-icaresi": {
    primaryKeyword: "backhoe loader icarəsi",
    secondaryKeywords: ["jcb icarəsi", "ekskavator-yükləyici kirayəsi", "ekskavator paqruzçik"],
    metaTitle: "Backhoe Loader İcarəsi (JCB) | Çoxfunksiyalı Texnika",
    metaDescription: "Həm qazıntı, həm də yükləmə işləri üçün universal backhoe loader (JCB) icarəsi. Bakıda ən sərfəli qiymətlərlə texnika sifarişi.",
    h1: "Backhoe Loader İcarəsi (JCB)",
    intro: "Universal imkanları ilə seçilən backhoe loader-lər kiçik və orta həcmli layihələrin ən çox tələb olunan texnikasıdır.",
    usage: "Eyni vaxtda həm qazıntı, həm də yükləmə işləri icra etmək üçün idealdır. Yol təmiri və kommunal xidmətlərdə geniş istifadə olunur.",
    benefits: [
      "İkisi birində (Ekskavator + Yükləyici)",
      "Yüksək mobillik",
      "Müxtəlif ucluqların (çəkic, burğu) qoşulma imkanı",
      "Effektiv yanacaq sərfiyyatı"
    ],
    faqs: [
      {
        question: "JCB texnikası operatorla birlikdə verilir?",
        answer: "Bəli, bütün backhoe loader-lərimiz təcrübəli operatorlar tərəfindən idarə olunur."
      }
    ]
  },
  "qreyder-icaresi": {
    primaryKeyword: "qreyder icarəsi bakı",
    secondaryKeywords: ["yol hamarlama", "qreyder sifarişi", "yol tikintisi texnikası"],
    metaTitle: "Qreyder İcarəsi Bakı | Yol Tikintisi və Hamarlama",
    metaDescription: "Yol yatağının hazırlanması və ərazilərin dəqiq hamarlanması üçün müasir qreyderlərin icarəsi. Peşəkar operator xidməti ilə.",
    h1: "Qreyder İcarəsi Bakı",
    intro: "Yol tikintisi və geniş kvadratlı ərazilərin sıfır nöqtəsinə qədər hamarlanması üçün qreyderlərimiz ən dəqiq həlli təqdim edir.",
    usage: "Yol yatağının hamarlanması, yamacların kəsilməsi, qar təmizləmə və torpaq qatlarının dəqiq paylanması üçün istifadə olunur.",
    benefits: [
      "Ultra-dəqiq bıçaq idarəetməsi",
      "Uzun təkər bazası ilə stabil işləmə",
      "Yüksək sürət və səmərəlilik",
      "Mürəkkəb proyeksiya işləri üçün uyğunluq"
    ],
    faqs: [
      {
        question: "Qreyder üçün GPS idarəetmə sistemi varmı?",
        answer: "Bəzi modellərimizdə 3D GPS hamarlama dəstəyi mövcuddur, bu da işin dəqiqliyini maksimuma qaldırır."
      }
    ]
  },
  "vibrokatok-icaresi": {
    primaryKeyword: "vibrokatok icarəsi bakı",
    secondaryKeywords: ["torpaq kipləşdirmə", "katok kirayəsi", "yol katoku"],
    metaTitle: "Vibrokatok İcarəsi Bakı | Torpaq Kipləşdirmə və Yol İşləri",
    metaDescription: "Asfalt və torpaq kipləşdirmə işləri üçün müxtəlif tonnajlı vibrokatokların icarəsi. Münasib qiymət, sürətli çatdırılma.",
    h1: "Vibrokatok İcarəsi Bakı",
    intro: "Zəminlərin möhkəmləndirilməsi və asfaltın döşənməsi üçün yüksək vibrasiya gücünə malik katoklarımız xidmətinizdədir.",
    usage: "Yol tikintisi, anbar bünövrələri və parkinqlərin zəmin kipləşdirilməsi işlərində istifadə olunur.",
    benefits: [
      "Yüksək kipləşdirmə dərəcəsi",
      "Müxtəlif tonnaj seçimləri (3 tondan 20 tona qədər)",
      "Pnevmatik və hamar barabanlı modellər",
      "Daxili vibrasiya tənzimlənməsi"
    ],
    faqs: [
      {
        question: "Torpaq üçün hansı katok daha yaxşıdır?",
        answer: "Torpaq və çınqıl üçün adətən vibrolu (keçi ayağı və ya hamar) katoklar tövsiyə olunur."
      }
    ]
  },
  "manlift-icaresi": {
    primaryKeyword: "manlift icarəsi bakı",
    secondaryKeywords: ["səbətli qaldırıcı kirayəsi", "hündürlük texnikası", "pikkansel icarəsi"],
    metaTitle: "Manlift İcarəsi Bakı | Hündürlük İşləri üçün Təhlükəsizlik",
    metaDescription: "İnsanların hündürlüyə qaldırılması və montaj işləri üçün müasir manliftlərin icarəsi. Bakı daxilində təhlükəsiz və sertifikatlı texnikalar.",
    h1: "Manlift İcarəsi Bakı",
    intro: "Hündürlükdə montaj, boya və təmir işlərini təhlükəsiz yerinə yetirmək üçün NAF Texnika sizə geniş manlift seçimi təklif edir.",
    usage: "Fasad işləri, reklam montajı, elektrik xətlərinin çəkilməsi və daxili anbar işləri üçün istifadə olunur.",
    benefits: [
      "Yüksək təhlükəsizlik standartları",
      "Elektrikli və dizel model seçimi",
      "Müxtəlif hündürlüklər (8 metrdən 45 metrə qədər)",
      "Kompakt və çevik hərəkət"
    ],
    faqs: [
      {
        question: "Manliftlər daxili məkanlarda istifadə oluna bilər?",
        answer: "Bəli, qapalı məkanlar üçün səssiz və tüstüsüz işləyən elektrikli manliftlərimiz mövcuddur."
      }
    ]
  },
  "generator-icaresi": {
    primaryKeyword: "generator icarəsi bakı",
    secondaryKeywords: ["dizel generator kirayəsi", "elektrik generatoru", "generator qiyməti"],
    metaTitle: "Generator İcarəsi Bakı | Kəsilməz Enerji Təminatı",
    metaDescription: "Tikinti sahələri, tədbirlər və sənaye obyektləri üçün müxtəlif gücdə dizel generatorların icarəsi. 24/7 kəsilməz enerji.",
    h1: "Generator İcarəsi Bakı",
    intro: "Enerji kəsintilərinin qarşısını almaq və kəsilməz iş rejimini təmin etmək üçün yüksək keyfiyyətli generatorlarımızı icarəyə götürə bilərsiniz.",
    usage: "Şəbəkə enerjisi olmayan yerlərdə tikinti işlərini davam etdirmək, böyük tədbirləri enerji ilə təmin etmək üçün istifadə olunur.",
    benefits: [
      "Geniş güc diapazonu (20 kVA - 1000 kVA)",
      "Səs izolyasiyalı korpus",
      "Yanacaq səmərəliliyi",
      "Tam avtomatlaşdırılmış idarəetmə"
    ],
    faqs: [
      {
        question: "Generatorun gücünü necə seçməliyik?",
        answer: "Bizim texniki heyətimiz istifadə edəcəyiniz cihazların cəmi gücünü hesablayaraq sizə ən uyğun modeli seçməyə kömək edəcək."
      }
    ]
  }
};
