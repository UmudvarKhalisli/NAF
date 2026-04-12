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
    id: "a53b4b09-2d69-4762-81c1-0f6bf5a4b2af",
    name: "Ekskavator (Paletli) / Crawler Excavator",
    category: "Torpaq İşləri",
    image: "/machines/crawler_excavator_premium.png",
    specs: { "Güc": "165 a.g.", "Çəki": "22 ton", "Qazma": "6.8 m", "Çömçə": "1.2 m³" },
    price: "0",
    available: true,
    description_az: "Ağır torpaq qazma və xəndək açma işləri üçün ən vacib texnika. Güclü hidravlik sistemi və paletləri ilə çətin ərazilərdə sabit hərəkət edir.",
  },
  {
    id: "b9bb07f7-28a3-4932-86a8-84f477889203",
    name: "Ekskavator (Təkərli) / Wheeled Excavator",
    category: "Torpaq İşləri",
    image: "/machines/wheeled_excavator_premium.png",
    specs: { "Güc": "140 a.g.", "Sürət": "30 km/s", "Qazma": "5.5 m", "Çəki": "18 ton" },
    price: "0",
    available: true,
    description_az: "Şəhər daxili tikinti sahələrində sürətli mobillik və manevr qabiliyyəti təmin edir. Asfalt və beton səthlərə zərər vermədən hərəkət edir.",
  },
  {
    id: "88d77c06-4c95-49be-adde-63ee2e904ed7",
    name: "Mini Ekskavator / Mini Excavator",
    category: "Torpaq İşləri",
    image: "/machines/mini_excavator_premium.png",
    specs: { "Güc": "25 a.g.", "Çəki": "3.5 ton", "Eni": "1.5 m", "Qazma": "3.1 m" },
    price: "0",
    available: true,
  },
  {
    id: "73647305-3e46-4f0d-97e0-17d53d06fb7d",
    name: "Buldozer / Bulldozer",
    category: "Torpaq İşləri",
    image: "/machines/bulldozer_premium.png",
    specs: { "Güc": "215 a.g.", "Çəki": "24.5 ton", "Bıçaq": "5.8 m³", "Palet": "610 mm" },
    price: "0",
    available: true,
  },
  {
    id: "a5103dbd-62f0-45ce-80f2-2623431174d5",
    name: "Qreyder / Motor Grader",
    category: "Torpaq İşləri",
    image: "/machines/motor_grader_premium.png",
    specs: { "Güc": "180 a.g.", "Bıçaq": "3.7 m", "Çəki": "16 ton", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 2. Daşıma Texnikası (Transport) - PREMIUM SET
  {
    id: "daa7da63-f3b4-4d80-867e-5fc2f50f4292",
    name: "Samasval / Dump Truck",
    category: "Daşıma Texnikası",
    image: "/machines/dump_truck_premium.png",
    specs: { "Həcm": "20 m³", "Yük": "30 ton", "Güc": "420 a.g.", "Təkər": "8x4" },
    price: "0",
    available: true,
  },
  {
    id: "2093c646-2151-406f-ac1f-332424dcf485",
    name: "Yük Maşını (Flatbed) / Flatbed Truck",
    category: "Daşıma Texnikası",
    image: "/machines/truck.png",
    specs: { "Uzunluq": "13 m", "Yük": "24 ton", "Güc": "460 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "0c4e2e5c-f0b4-45dd-81fd-4fc0a76dbe90",
    name: "Beton Mikser / Concrete Mixer Truck",
    category: "Daşıma Texnikası",
    image: "/machines/mixer.png",
    specs: { "Həcm": "12 m³", "Su": "600 L", "Güc": "380 a.g.", "Təkər": "6x4" },
    price: "0",
    available: true,
  },

  // 3. Qaldırıcı Texnikalar (Lifting) - PREMIUM SET
  {
    id: "f34a8c8d-8958-4891-b657-ca90ba19d5b8",
    name: "Avtokran / Mobile Crane",
    category: "Qaldırıcı Texnikalar",
    image: "/machines/mobile_crane_premium.png",
    specs: { "Yük": "100 ton", "Ox": "60 m", "Sürət": "80 km/s", "Güc": "480 a.g." },
    price: "0",
    available: true,
  },
  {
    id: "acd9545f-56ab-4035-9e00-956efad71e8f",
    name: "Manipulyator / Knuckle Boom Crane",
    category: "Qaldırıcı Texnikalar",
    image: "/machines/knuckle_boom_premium.png",
    specs: { "Yük": "12 ton", "Qol": "18 m", "Güc": "320 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "4df3eba7-1836-43ab-8fd9-57bd13921407",
    name: "Manlift (Səbətli) / Boom Lift",
    category: "Qaldırıcı Texnikalar",
    image: "/machines/boom_lift_premium.png",
    specs: { "Hündürlük": "28 m", "Yük": "230 kq", "Mühərrik": "Dizel", "Fırlanma": "360°" },
    price: "0",
    available: true,
  },

  // 4. Beton və Tikinti (Concrete) - PREMIUM SET
  {
    id: "f3d3130d-52b4-4856-a7f9-3d4ebecd924e",
    name: "Beton Nasosu / Concrete Pump",
    category: "Beton və Tikinti",
    image: "/machines/concrete_pump_premium.png",
    specs: { "Boom": "36 m", "Basqı": "160 bar", "Axın": "160 m³/h", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "69938821-c267-4219-9cd7-b19c1a6dc903",
    name: "Beton Kəsən / Road Saw",
    category: "Beton və Tikinti",
    image: "/machines/road_saw.png",
    specs: { "Dərinlik": "200 mm", "Mühərrik": "13 a.g.", "Çəki": "120 kq", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 5. Yol Tikinti (Road Construction) - PREMIUM SET (Road Roller)
  {
    id: "d5502348-5368-49ff-9399-f2207827be07",
    name: "Yol Katoku / Road Roller",
    category: "Yol Tikinti",
    image: "/machines/road_roller_premium.png",
    specs: { "Çəki": "14 ton", "Vibrasiya": "Yes", "Eni": "2.1 m", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "5b568334-6068-4f71-abe9-1f5c661af86f",
    name: "Asfalt Döşəyən / Asphalt Paver",
    category: "Yol Tikinti",
    image: "/machines/asphalt_paver.png",
    specs: { "Eni": "8 m", "Hız": "20 m/dəq", "Güc": "160 a.g.", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 6. Yükləmə və Köməkçi (Loading & Utility) - PREMIUM SET (Telehandler)
  {
    id: "4f71673b-6fd3-4d5b-b7a4-4f79a91a578b",
    name: "Teleskopik Yükləyici / Telehandler",
    category: "Yükləmə və Köməkçi",
    image: "/machines/telehandler_premium.png",
    specs: { "Yük": "4 ton", "Hündürlük": "17 m", "Güc": "100 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "c8e50f61-f2b9-4dd0-bac5-802675b2b9ab",
    name: "Avtoyükləyici / Forklift",
    category: "Yükləmə və Köməkçi",
    image: "/machines/forklift.png",
    specs: { "Yük": "5 ton", "Hündürlük": "4.5 m", "Yanacaq": "Dizel", "İl": "2024" },
    price: "0",
    available: true,
  },
  {
    id: "b26a27d9-76ac-4783-b0fa-843fc8ad818e",
    name: "Generator / Diesel Generator",
    category: "Yükləmə və Köməkçi",
    image: "/machines/generator.png",
    specs: { "Güc": "500 kVA", "Yanacaq": "Dizel", "Faz": "3 Faz", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 7. Xüsusi Texnikalar (Specialized)
  {
    id: "be28b4dc-b502-4f2d-97f1-7552491ec9ac",
    name: "Payvuran / Piling Rig",
    category: "Xüsusi Texnikalar",
    image: "/machines/piling_rig.png",
    specs: { "Dərinlik": "40 m", "Diametr": "1.5 m", "Güc": "250 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },
  {
    id: "3597644e-e817-4951-8bf4-da2be352aa2e",
    name: "Qülləli Kran / Tower Crane",
    category: "Xüsusi Texnikalar",
    image: "/machines/tower_crane.png",
    specs: { "Yük": "12 ton", "Ox": "65 m", "Hündürlük": "free-stand", "İl": "2024" },
    price: "0",
    available: true,
  },

  // 8. Yeraltı və Kommunikasiya (Underground)
  {
    id: "15c031e9-56a5-4a09-a7a7-5d4b9a2a0260",
    name: "Xəndəkqazan / Trencher",
    category: "Yeraltı və Kommunikasiya",
    image: "/machines/trencher.png",
    specs: { "Dərinlik": "1.5 m", "Eni": "300 mm", "Güc": "120 a.g.", "İl": "2023" },
    price: "0",
    available: true,
  },

  // 9. Dağıtma (Demolition)
  {
    id: "3343bfd2-34fd-45d7-8817-a123e281d77a",
    name: "Hidravlik Çəkic / Hydraulic Breaker",
    category: "Dağıtma (Demolition)",
    image: "/machines/breaker.png",
    specs: { "Zərbə": "2500 J", "Çəki": "1.8 ton", "Uyğunluq": "20-25t", "İl": "2024" },
    price: "0",
    available: true,
  },
];
