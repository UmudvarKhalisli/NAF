export interface EquipmentItem {
  id: string | number;
  name: string;
  category: string;
  image?: string;
  image_url?: string;
  specs: { [key: string]: string };
  price: number | string;
  available: boolean;
  sort_order?: number;
  description_az?: string;
  description_en?: string;
}

export const EQUIPMENT_DATA: EquipmentItem[] = [
  // 1. Torpaq İşləri (Earthmoving) - PREMIUM SET
  {
    id: "crawler-excavator-1",
    name: "Ekskavator (Paletli) / Crawler Excavator",
    category: "Torpaq İşləri",
    image: "https://images.pexels.com/photos/25559747/pexels-photo-25559747/free-photo-of-crawler-excavator-digging-in-a-quary.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    specs: { "Güc": "165 a.g.", "Çəki": "22 ton", "Qazma": "6.8 m", "Çömçə": "1.2 m³" },
    price: "0",
    available: true,
    description_az: "Ağır torpaq qazma və xəndək açma işləri üçün ən vacib texnika. Güclü hidravlik sistemi və paletləri ilə çətin ərazilərdə sabit hərəkət edir.",
  },
  {
    id: "wheeled-excavator-1",
    name: "Ekskavator (Təkərli) / Wheeled Excavator",
    category: "Torpaq İşləri",
    image: "https://images.unsplash.com/photo-1630693916229-c1a3371d16f2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Güc": "140 a.g.", "Sürət": "30 km/s", "Qazma": "5.5 m", "Çəki": "18 ton" },
    price: "0",
    available: true,
    description_az: "Şəhər daxili tikinti sahələrində sürətli mobillik və manevr qabiliyyəti təmin edir. Asfalt və beton səthlərə zərər vermədən hərəkət edir.",
  },
  {
    id: "mini-excavator-1",
    name: "Mini Ekskavator / Mini Excavator",
    category: "Torpaq İşləri",
    image: "https://images.unsplash.com/photo-1630693916229-c1a3371d16f2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Güc": "25 a.g.", "Çəki": "3.5 ton", "Eni": "1.5 m", "Qazma": "3.1 m" },
    price: "0",
    available: true,
  },
  {
    id: "bulldozer-1",
    name: "Buldozer / Bulldozer",
    category: "Torpaq İşləri",
    image: "https://images.unsplash.com/photo-1769240628075-e4728cfba211?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Güc": "215 a.g.", "Çəki": "24.5 ton", "Bıçaq": "5.8 m³", "Palet": "610 mm" },
    price: "0",
    available: true,
  },
  {
    id: "grader-1",
    name: "Qreyder / Motor Grader",
    category: "Torpaq İşləri",
    image: "https://images.unsplash.com/photo-1584186118422-895ef18c418d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Güc": "180 a.g.", "Bıçaq": "3.7 m", "Çəki": "16 ton", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 2. Daşıma Texnikası (Transport) - PREMIUM SET
  {
    id: "dump-truck-1",
    name: "Samasval / Dump Truck",
    category: "Daşıma Texnikası",
    image: "https://images.unsplash.com/photo-1653924323287-127daf6e6937?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Həcm": "20 m³", "Yük": "30 ton", "Güc": "420 a.g.", "Təkər": "8x4" },
    price: "0",
    available: true,
  },
  {
    id: "flatbed-truck-1",
    name: "Yük Maşını (Flatbed) / Flatbed Truck",
    category: "Daşıma Texnikası",
    image: "/machines/truck.png",
    specs: { "Uzunluq": "13 m", "Yük": "24 ton", "Güc": "460 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "concrete-mixer-1",
    name: "Beton Mikser / Concrete Mixer Truck",
    category: "Daşıma Texnikası",
    image: "/machines/mixer.png",
    specs: { "Həcm": "12 m³", "Su": "600 L", "Güc": "380 a.g.", "Təkər": "6x4" },
    price: "0",
    available: true,
  },

  // 3. Qaldırıcı Texnikalar (Lifting) - PREMIUM SET
  {
    id: "mobile-crane-1",
    name: "Avtokran / Mobile Crane",
    category: "Qaldırıcı Texnikalar",
    image: "https://images.unsplash.com/photo-1727818899530-5a3bee908607?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Yük": "100 ton", "Ox": "60 m", "Sürət": "80 km/s", "Güc": "480 a.g." },
    price: "0",
    available: true,
  },
  {
    id: "knuckle-boom-1",
    name: "Manipulyator / Knuckle Boom Crane",
    category: "Qaldırıcı Texnikalar",
    image: "https://images.unsplash.com/photo-1727818899530-5a3bee908607?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Yük": "12 ton", "Qol": "18 m", "Güc": "320 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "boom-lift-1",
    name: "Manlift (Səbətli) / Boom Lift",
    category: "Qaldırıcı Texnikalar",
    image: "https://images.unsplash.com/photo-1753106713704-be0d6d1691e9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Hündürlük": "28 m", "Yük": "230 kq", "Mühərrik": "Dizel", "Fırlanma": "360°" },
    price: "0",
    available: true,
  },

  // 4. Beton və Tikinti (Concrete) - PREMIUM SET
  {
    id: "concrete-pump-1",
    name: "Beton Nasosu / Concrete Pump",
    category: "Beton və Tikinti",
    image: "https://images.unsplash.com/photo-1582386061789-2b2b43a5fda8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Boom": "36 m", "Basqı": "160 bar", "Axın": "160 m³/h", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "road-saw-1",
    name: "Beton Kəsən / Road Saw",
    category: "Beton və Tikinti",
    image: "/machines/road_saw.png",
    specs: { "Dərinlik": "200 mm", "Mühərrik": "13 a.g.", "Çəki": "120 kq", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 5. Yol Tikinti (Road Construction) - PREMIUM SET (Road Roller)
  {
    id: "road-roller-1",
    name: "Yol Katoku / Road Roller",
    category: "Yol Tikinti",
    image: "https://images.unsplash.com/photo-1760708626681-59a5373819a6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Çəki": "14 ton", "Vibrasiya": "Yes", "Eni": "2.1 m", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "asphalt-paver-1",
    name: "Asfalt Döşəyən / Asphalt Paver",
    category: "Yol Tikinti",
    image: "/machines/asphalt_paver.png",
    specs: { "Eni": "8 m", "Hız": "20 m/dəq", "Güc": "160 a.g.", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 6. Yükləmə və Köməkçi (Loading & Utility) - PREMIUM SET (Telehandler)
  {
    id: "telescopic-handler-1",
    name: "Teleskopik Yükləyici / Telehandler",
    category: "Yükləmə və Köməkçi",
    image: "https://images.unsplash.com/photo-1769247178321-e226a0a7c941?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
    specs: { "Yük": "4 ton", "Hündürlük": "17 m", "Güc": "100 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "forklift-1",
    name: "Avtoyükləyici / Forklift",
    category: "Yükləmə və Köməkçi",
    image: "/machines/forklift.png",
    specs: { "Yük": "5 ton", "Hündürlük": "4.5 m", "Yanacaq": "Dizel", "İl": "2024" },
    price: "0",
    available: true,
  },
  {
    id: "generator-1",
    name: "Generator / Diesel Generator",
    category: "Yükləmə və Köməkçi",
    image: "/machines/generator.png",
    specs: { "Güc": "500 kVA", "Yanacaq": "Dizel", "Faz": "3 Faz", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 7. Xüsusi Texnikalar (Specialized)
  {
    id: "piling-rig-1",
    name: "Payvuran / Piling Rig",
    category: "Xüsusi Texnikalar",
    image: "/machines/piling_rig.png",
    specs: { "Dərinlik": "40 m", "Diametr": "1.5 m", "Güc": "250 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "tower-crane-1",
    name: "Qülləli Kran / Tower Crane",
    category: "Xüsusi Texnikalar",
    image: "/machines/tower_crane.png",
    specs: { "Yük": "12 ton", "Ox": "65 m", "Hündürlük": "free-stand", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 8. Yeraltı və Kommunikasiya (Underground)
  {
    id: "trenchcher-1",
    name: "Xəndəkqazan / Trencher",
    category: "Yeraltı və Kommunikasiya",
    image: "/machines/trencher.png",
    specs: { "Dərinlik": "1.5 m", "Eni": "300 mm", "Güc": "120 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },

  // 9. Dağıtma (Demolition)
  {
    id: "hydraulic-breaker-1",
    name: "Hidravlik Çəkic / Hydraulic Breaker",
    category: "Dağıtma (Demolition)",
    image: "/machines/breaker.png",
    specs: { "Zərbə": "2500 J", "Çəki": "1.8 ton", "Uyğunluq": "20-25t", "İl": "2024" },
    price: "0",
    available: true,
  },
];
