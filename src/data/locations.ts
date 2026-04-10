export interface LocationPageContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export const locationPages: Record<string, LocationPageContent> = {
  "baki": {
    slug: "baki",
    title: "Bakı Tikinti Texnikası İcarəsi | Kran, Ekskavator Sifarişi",
    description: "Bakı şəhəri üzrə bütün növ tikinti texnikasının icarəsi. Operativ çatdırılma, peşəkar operatorlar və münasib qiymətlər NAF Texnika-da.",
    h1: "Bakıda Tikinti Texnikası İcarəsi",
    intro: "Bakı şəhərinin bütün nöqtələrinə və tikinti sahələrinə peşəkar ağır texnikaların icarəsini təşkil edirik.",
    sections: [
      {
        title: "Bakı üzrə Operativ Xidmət",
        content: "Şəhərdaxili layihələriniz üçün ən qısa zamanda texnika çatdırılmasını təmin edirik. Dar küçələrdən böyük tikinti meydançalarına qədər hər bir məkana uyğun texnika parkımız var."
      }
    ]
  },
  "absheron": {
    slug: "absheron",
    title: "Abşeron Tikinti Texnikası İcarəsi | Xırdalan, Masazır",
    description: "Abşeron yarımadası, Xırdalan və Masazır bölgələrində tikinti texnikası icarəsi xidməti. Etibarlı texnika və mühəndis dəstəyi.",
    h1: "Abşeron Bölgəsində Texnika İcarəsi",
    intro: "Abşeron yarımadası və ətraf kəndlərdə aparılan tikinti işləri üçün geniş çeşiddə texnika parkımızla xidmətinizdəyik.",
    sections: [
      {
        title: "Xırdalan və Ətraf Bölgələr",
        content: "Xırdalan şəhəri və ətraf bölgələrdəki fərdi yaşayış binası və ya kommersiya layihələriniz üçün ekskavator, kran və digər texnikalarımızı təklif edirik."
      }
    ]
  },
  "sumqayit": {
    slug: "sumqayit",
    title: "Sumqayıt Tikinti Texnikası İcarəsi | Sənaye və Tikinti Üçün",
    description: "Sumqayıt şəhərində ağır texnika icarəsi. Sənaye obyektləri və tikinti sahələri üçün kran, ekskavator və digər xüsusi texnikalar.",
    h1: "Sumqayıtda Tikinti Texnikası İcarəsi",
    intro: "Sumqayıt sənaye zonası və şəhər ərazisindəki hər növ tikinti-quraşdırma işləri üçün peşəkar həllər.",
    sections: [
      {
        title: "Sənaye Layihələri Üçün Texnika",
        content: "Sumqayıtdakı sənaye müəssisələrinin ehtiyaclarını nəzərə alaraq, yüksək tonnajlı kranlar və sənaye tipli generatorlarımızı icarəyə təqdim edirik."
      }
    ]
  }
};
