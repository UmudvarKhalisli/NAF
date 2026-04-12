-- NAF Texnika - Bulk Equipment Import SQL (Full 40+ Items)
-- Run this in your Supabase SQL Editor

TRUNCATE TABLE equipment CASCADE; -- Clears equipment AND dependent tables (like orders) to prevent FK errors.

INSERT INTO equipment (id, name, category, image_url, specs, price, available)
VALUES
  -- 1. Torpaq İşləri (Earthmoving)
  ('crawler-excavator-1', 'Ekskavator (Paletli) / Crawler Excavator', 'Torpaq İşləri', '/machines/crawler_excavator_premium.png', '{"Güc": "165 a.g.", "Çəki": "22 ton", "Qazma": "6.8 m", "Çömçə": "1.2 m³"}', 0, true),
  ('wheeled-excavator-1', 'Ekskavator (Təkərli) / Wheeled Excavator', 'Torpaq İşləri', '/machines/wheeled_excavator_premium.png', '{"Güc": "140 a.g.", "Sürət": "30 km/s", "Qazma": "5.5 m", "Çəki": "18 ton"}', 0, true),
  ('mini-excavator-1', 'Mini Ekskavator / Mini Excavator', 'Torpaq İşləri', '/machines/mini_excavator_premium.png', '{"Güc": "25 a.g.", "Çəki": "3.5 ton", "Eni": "1.5 m", "Qazma": "3.1 m"}', 0, true),
  ('bulldozer-1', 'Buldozer / Bulldozer', 'Torpaq İşləri', '/machines/bulldozer_premium.png', '{"Güc": "215 a.g.", "Çəki": "24.5 ton", "Bıçaq": "5.8 m³", "Palet": "610 mm"}', 0, true),
  ('grader-1', 'Qreyder / Motor Grader', 'Torpaq İşləri', '/machines/motor_grader_premium.png', '{"Güc": "180 a.g.", "Bıçaq": "3.7 m", "Çəki": "16 ton", "İl": "2024"}', 0, true),

  -- 2. Daşıma Texnikası (Transport)
  ('dump-truck-1', 'Samasval / Dump Truck', 'Daşıma Texnikası', '/machines/dump_truck_premium.png', '{"Həcm": "20 m³", "Yük": "30 ton", "Güc": "420 a.g.", "Təkər": "8x4"}', 0, true),
  ('flatbed-truck-1', 'Yük Maşını (Flatbed) / Flatbed Truck', 'Daşıma Texnikası', '/machines/truck.png', '{"Uzunluq": "13 m", "Yük": "24 ton", "Güc": "460 a.g.", "İl": "2023"}', 0, true),
  ('concrete-mixer-1', 'Beton Mikser / Concrete Mixer Truck', 'Daşıma Texnikası', '/machines/mixer.png', '{"Həcm": "12 m³", "Su": "600 L", "Güc": "380 a.g.", "Təkər": "6x4"}', 0, true),

  -- 3. Qaldırıcı Texnikalar (Lifting)
  ('mobile-crane-1', 'Avtokran / Mobile Crane', 'Qaldırıcı Texnikalar', '/machines/mobile_crane_premium.png', '{"Yük": "100 ton", "Ox": "60 m", "Sürət": "80 km/s", "Güc": "480 a.g."}', 0, true),
  ('knuckle-boom-1', 'Manipulyator / Knuckle Boom Crane', 'Qaldırıcı Texnikalar', '/machines/knuckle_boom_premium.png', '{"Yük": "12 ton", "Qol": "18 m", "Güc": "320 a.g.", "İl": "2023"}', 0, true),
  ('boom-lift-1', 'Manlift (Səbətli) / Boom Lift', 'Qaldırıcı Texnikalar', '/machines/boom_lift_premium.png', '{"Hündürlük": "28 m", "Yük": "230 kq", "Mühərrik": "Dizel", "Fırlanma": "360°"}', 0, true),

  -- 4. Beton və Tikinti (Concrete)
  ('concrete-pump-1', 'Beton Nasosu / Concrete Pump', 'Beton və Tikinti', '/machines/concrete_pump_premium.png', '{"Boom": "36 m", "Basqı": "160 bar", "Axın": "160 m³/h", "İl": "2023"}', 0, true),
  ('road-saw-1', 'Beton Kəsən / Road Saw', 'Beton və Tikinti', '/machines/road_saw.png', '{"Dərinlik": "200 mm", "Mühərrik": "13 a.g.", "Çəki": "120 kq", "İl": "2024"}', 0, true),

  -- 5. Yol Tikinti (Road Construction)
  ('road-roller-1', 'Yol Katoku / Road Roller', 'Yol Tikinti', '/machines/road_roller_premium.png', '{"Çəki": "14 ton", "Vibrasiya": "Yes", "Eni": "2.1 m", "İl": "2023"}', 0, true),
  ('asphalt-paver-1', 'Asfalt Döşəyən / Asphalt Paver', 'Yol Tikinti', '/machines/asphalt_paver.png', '{"Eni": "8 m", "Hız": "20 m/dəq", "Güc": "160 a.g.", "İl": "2024"}', 0, true),

  -- 6. Yükləmə və Köməkçi (Loading & Utility)
  ('telescopic-handler-1', 'Teleskopik Yükləyici / Telehandler', 'Yükləmə və Köməkçi', '/machines/telehandler_premium.png', '{"Yük": "4 ton", "Hündürlük": "17 m", "Güc": "100 a.g.", "İl": "2023"}', 0, true),
  ('forklift-1', 'Avtoyükləyici / Forklift', 'Yükləmə və Köməkçi', '/machines/forklift.png', '{"Yük": "5 ton", "Hündürlük": "4.5 m", "Yanacaq": "Dizel", "İl": "2024"}', 0, true),
  ('generator-1', 'Generator / Diesel Generator', 'Yükləmə və Köməkçi', '/machines/generator.png', '{"Güc": "500 kVA", "Yanacaq": "Dizel", "Faz": "3 Faz", "İl": "2024"}', 0, true),

  -- 7. Xüsusi Texnikalar (Specialized)
  ('piling-rig-1', 'Payvuran / Piling Rig', 'Xüsusi Texnikalar', '/machines/piling_rig.png', '{"Dərinlik": "40 m", "Diametr": "1.5 m", "Güc": "250 a.g.", "İl": "2023"}', 0, true),
  ('tower-crane-1', 'Qülləli Kran / Tower Crane', 'Xüsusi Texnikalar', '/machines/tower_crane.png', '{"Yük": "12 ton", "Ox": "65 m", "Hündürlük": "free-stand", "İl": "2024"}', 0, true),

  -- 8. Yeraltı və Kommunikasiya (Underground)
  ('trenchcher-1', 'Xəndəkqazan / Trencher', 'Yeraltı və Kommunikasiya', '/machines/trencher.png', '{"Dərinlik": "1.5 m", "Eni": "300 mm", "Güc": "120 a.g.", "İl": "2023"}', 0, true),

  -- 9. Dağıtma (Demolition)
  ('hydraulic-breaker-1', 'Hidravlik Çəkic / Hydraulic Breaker', 'Dağıtma (Demolition)', '/machines/breaker.png', '{"Zərbə": "2500 J", "Çəki": "1.8 ton", "Uyğunluq": "20-25t", "İl": "2024"}', 0, true);
