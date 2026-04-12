export interface FallbackProject {
  id: string;
  title: string;
  location: string;
  status: 'ongoing' | 'completed';
  cover_image_url: string;
  description: string;
  client?: string;
  start_date?: string;
  is_featured?: boolean;
  sort_order?: number;
}

export const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    id: 'absheron-gas',
    title: 'Abşeron Qaz Layihəsi',
    location: 'Bakı, Səngəçal',
    status: 'ongoing',
    cover_image_url: '/images/projects/absheron.png',
    client: 'JOCAP (Absheron Petroleum)',
    start_date: '2023-03-15',
    is_featured: true,
    sort_order: 1,
    description: 'Xəzər dənizinin Azərbaycan sektorunda yerləşən "Abşeron" qaz-kondensat yatağının tam miqyaslı işlənməsi çərçivəsində quruda yerləşən terminalın genişləndirilməsi və infrastrukturun qurulması layihəsi. Ağır texnikalarımız torpaq işləri, bünövrə hazırlanması və ağır yüklərin qaldırılması prosesində aktiv iştirak edir.'
  },
  {
    id: 'fizuli-airport',
    title: 'Füzuli Beynəlxalq Hava Limanı',
    location: 'Füzuli, Qarabağ',
    status: 'completed',
    cover_image_url: '/images/projects/fizuli-airport.png',
    client: 'Azərbaycan Hava Yolları (AZAL)',
    start_date: '2021-01-14',
    is_featured: true,
    sort_order: 2,
    description: 'Qarabağın hava qapısı sayılan Füzuli Beynəlxalq Hava Limanının rekord müddətdə inşası. NAF Texnika tərəfindən təmin edilən qreyderlər, buldozerlər və yol katokları uçuş-enmə zolağının torpaq yatağının hazırlanması və asfaltlanma işlərində peşəkar şəkildə istifadə olunmuşdur.'
  },
  {
    id: 'zafar-yolu',
    title: 'Zəfər Yolu İnşası',
    location: 'Səngəçal-Şuşa yolu',
    status: 'completed',
    cover_image_url: '/images/projects/zafar-yolu.png',
    client: 'AAYDA',
    start_date: '2020-11-17',
    is_featured: true,
    sort_order: 3,
    description: 'Dağlıq və çətin relyef şəraitində Şuşaya çəkilən Zəfər Yolunun inşası. Layihə çərçivəsində yüksək performanslı ekskavatorlarımız və qaya parçalayan avadanlıqlarımız yol yatağının açılması və genişləndirilməsi işlərini uğurla icra etmişdir.'
  },
  {
    id: 'aghdam-industrial',
    title: 'Ağdam Sənaye Parkı',
    location: 'Ağdam, Qarabağ',
    status: 'ongoing',
    cover_image_url: '/images/projects/aghdam.png',
    client: 'Qarabağ Dirçəliş Fondu',
    start_date: '2022-08-10',
    description: 'Ağdam şəhərinin yenidən qurulması proqramı çərçivəsində Sənaye Parkının infrastrukturunun qurulması. Ərazinin təmizlənməsi, mühəndis kommunikasiya xətlərinin çəkilməsi və yeni zavodların bünövrə qazıntıları NAF Texnikanın ağır texnika parkı ilə həyata keçirilir.'
  },
  {
    id: 'port-baku-2',
    title: 'Port Baku Towers 2',
    location: 'Bakı, Neftçilər Pr.',
    status: 'ongoing',
    cover_image_url: '/images/projects/port-baku.png',
    client: 'Pasha Construction',
    start_date: '2021-06-05',
    description: 'Bakının ən müasir biznes mərkəzlərindən biri olan Port Baku Towers kompleksinin ikinci mərhələsinin tikintisi. Qülləli kranlarımızın və beton nasoslarımızın yüksək stabilliyi bu möhtəşəm göydələnin tikinti prosesinin sürətlənməsinə birbaşa töhfə verir.'
  },
  {
    id: 'white-city-foundation',
    title: 'Ağ Şəhər Bünövrə Qazıntı İşləri',
    location: 'Bakı, Ağ Şəhər',
    status: 'completed',
    cover_image_url: '/images/projects/white-city.png',
    client: 'White City Development',
    description: 'Bakı Ağ Şəhər layihəsi çərçivəsində yaşayış binasının bünövrə qazıntı işləri şirkətimiz tərəfindən uğurla tamamlanmışdır. Texnikalarımızın məhsuldarlığı layihənin vaxtından əvvəl yekunlaşmasına imkan vermişdir.'
  }
];
