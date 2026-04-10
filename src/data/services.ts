export interface ServicePageContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: {
    title: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  category: string; // To filter equipment
}

export const servicePages: Record<string, ServicePageContent> = {
  "kran-icaresi": {
    slug: "kran-icaresi",
    title: "Kran İcarəsi Bakı | Saatlıq və Günlük Kran Sifarişi",
    description: "Bakı və ətraf bölgələrdə saatlıq və günlük kran icarəsi. Yükqaldırma işləri üçün etibarlı və operativ kran sifarişi xidməti.",
    h1: "Kran İcarəsi Bakı",
    category: "Kranlar",
    intro: "NAF Texnika yüksək tonnajlı yükqaldırma işləri üçün peşəkar kran icarəsi xidməti təklif edir. Bizim kran parkımız müasir və saz vəziyyətdə olan texnikalardan ibarətdir.",
    sections: [
      {
        title: "Kran İcarəsi Hansı İşlər üçün Uyğundur?",
        content: "Kranlar ağır yüklərin qaldırılması, hündürmərtəbəli binaların tikintisi, sənaye avadanlıqlarının montajı və iri həcmli konstruksiyaların yerləşdirilməsi üçün əvəzolunmazdır."
      },
      {
        title: "Saatlıq və Günlük Kran Sifarişi",
        content: "Layihənizin ehtiyacına uyğun olaraq kranlarımızı saatlıq, günlük və ya uzunmüddətli (aylıq) icarəyə götürə bilərsiniz. Çevik qiymət siyasətimizlə hər bir büdcəyə uyğun həllər təqdim edirik."
      }
    ],
    faqs: [
      {
        question: "Ən kiçik icarə müddəti nə qədərdir?",
        answer: "Kranlar üçün minimum icarə müddəti adətən 4 saatdan başlayır."
      }
    ]
  },
  "avtokran-icaresi": {
    slug: "avtokran-icaresi",
    title: "Avtokran İcarəsi Bakı | Operativ və Etibarlı Xidmət",
    description: "Tikinti və yükqaldırma işləri üçün avtokran icarəsi xidməti. Bakı və ətraf bölgələrdə operativ sifariş və sərfəli şərtlər.",
    h1: "Avtokran İcarəsi Bakı",
    category: "Avtokranlar",
    intro: "Avtokranlar mobilliyi və sürəti ilə fərqlənir. Şəhərdaxili və dar sahələrdə işləmək üçün NAF Texnika-nın avtokran parkı ideal seçimdir.",
    sections: [
      {
        title: "Mobil Yükqaldırma Həlləri",
        content: "Bizim avtokranlarımız müxtəlif tonnajlarda (16 tondan 200 tona qədər) mövcuddur. Hər bir texnika peşəkar operator tərəfindən idarə olunur."
      }
    ],
    faqs: []
  },
  "ekskavator-icaresi": {
    slug: "ekskavator-icaresi",
    title: "Ekskavator İcarəsi Bakı | Qazıntı və Tikinti İşləri",
    description: "Qazıntı, söküntü və torpaq işləri üçün ekskavator icarəsi. Bakı və ətrafında münasib qiymət və sürətli sifariş imkanı.",
    h1: "Ekskavator İcarəsi Bakı",
    category: "Ekskavatorlar",
    intro: "Torpaq qazıntı, söküntü və bünövrə işlərində NAF Texnika-nın müasir ekskavatorları səmərəliliyi artırır.",
    sections: [
      {
        title: "Qazıntı və Torpaq İşləri üçün Həll",
        content: "İstər tırtıllı, istərsə də təkərli ekskavatorlarımızla ən çətin relyeflərdə belə yüksək performans vəd edirik."
      }
    ],
    faqs: []
  },
  "sebet-masini-icaresi": {
    slug: "sebet-masini-icaresi",
    title: "Səbət Maşını İcarəsi Bakı | Hündürlük İşləri üçün Texnika",
    description: "Hündürlükdə işlər, montaj və servis üçün səbət maşını icarəsi. Bakı və ətrafında etibarlı və çevik xidmət.",
    h1: "Səbət Maşını İcarəsi Bakı",
    category: "Qaldırıcılar",
    intro: "Hündürlük işlərində təhlükəsizlik və sürət üçün səbət maşınları (avtokule) əvəzolunmazdır.",
    sections: [
      {
        title: "Hündürlük İşləri üçün Təhlükəsiz Texnika",
        content: "Fasad işləri, reklam montajı və işıqlandırma sistemlərinin quraşdırılması üçün müxtəlif hündürlüklərə (18 metrdən 45 metrə qədər) çatan səbət maşınlarımız var."
      }
    ],
    faqs: []
  }
};
