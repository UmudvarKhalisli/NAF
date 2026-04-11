export interface FallbackProject {
  id: string;
  title: string;
  location: string;
  status: 'ongoing' | 'completed';
  cover_image_url: string;
  description: string;
  client?: string;
  start_date?: string;
}

export const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    id: 'road-reconstruction',
    title: 'Bakı-Quba Yolunun Yenidən Qurulması',
    location: 'Bakı-Quba Şosesi',
    status: 'ongoing',
    cover_image_url: '/images/projects/road.png',
    description: 'Bakı-Quba şosesinin genişləndirilməsi və yol yatağının müasir standartlara uyğun yenidən qurulması layihəsində iştirak edirik. Ağır texnika parkımızdan olan ekskavatorlar, buldozerlər və silindrlər yol yatağının hazırlanması, qazıntı və hamarlanma işlərində aktiv şəkildə istifadə olunur. Layihə çərçivəsində 20-dən çox ağır texnika və 50-dən çox peşəkar heyət tərəfindən işlər yüksək keyfiyyətlə icra edilməkdədir.',
    client: 'Azərbaycan Avtomobil Yolları Dövlət Agentliyi',
    start_date: '2023-01-01'
  },
  {
    id: 'white-city-foundation',
    title: 'Ağ Şəhər Bünövrə Qazıntı İşləri',
    location: 'Bakı, Ağ Şəhər',
    status: 'completed',
    cover_image_url: '/images/projects/white-city.png',
    description: 'Bakı Ağ Şəhər layihəsi çərçivəsində 12 mərtəbəli yaşayış binasının bünövrə qazıntı işləri şirkətimiz tərəfindən uğurla tamamlanmışdır. 15 metr dərinlikdə aparılan qazıntı işləri, torpağın daşınması və svay vurulma prosesindən əvvəl bünövrənin hazırlanması rekord müddətdə başa çatdırılmışdır. Texnikalarımızın məhsuldarlığı layihənin vaxtından əvvəl yekunlaşmasına imkan vermişdir.',
    client: 'White City Development',
    start_date: '2022-06-15'
  },
  {
    id: 'stp-industrial',
    title: 'STP Sənaye Obyektinin Tikintisi',
    location: 'Sumqayıt',
    status: 'completed',
    cover_image_url: '/images/projects/stp.png',
    description: 'Sumqayıt Texnologiyalar Parkı (STP) ərazisində yeni istehsalat sexinin tikintisi üçün lazım olan bütün ağır texnika təminatı NAF Texnika tərəfindən qarşılanmışdır. Kranların quraşdırılması, dəmir karkasların daşınması və beton nasoslarımızın istifadəsi ilə sənaye obyektinin əsas strukturu qısa zamanda qurulmuşdur. Təhlükəsizlik qaydalarına 100% əməl olunmaqla layihə təhvil verilmişdir.',
    client: 'STP - Sumgait Technologies Park',
    start_date: '2022-11-20'
  }
];
