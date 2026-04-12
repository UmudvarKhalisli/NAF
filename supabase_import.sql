-- NAF Texnika - Professional Equipment Catalog Sync (Final Unique Photos)
-- Run this in your Supabase SQL Editor

-- 1. Ensure new columns exist
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 999;
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- 2. Clear existing items (DANGER: Also clears dependent orders)
TRUNCATE TABLE equipment CASCADE;

-- 3. Insert full categorized catalog (20+ items) with UNIQUE photos
INSERT INTO equipment (name, category, image_url, specs, price, price_unit, status, is_featured, sort_order)
VALUES
  -- 1. Torpaq İşləri (Earthmoving)
  ('Ekskavator (Paletli) / Crawler Excavator', 'Torpaq İşləri', '/machines/crawler_excavator_real.jpg', '{"Güc": "165 a.g.", "Çəki": "22 ton", "Qazma": "6.8 m", "Çömçə": "1.2 m³"}', 0, 'SAAT', 'available', true, 1),
  ('Avtokran / Mobile Crane', 'Qaldırıcı Texnikalar', '/machines/mobile_crane_real.jpg', '{"Yük": "100 ton", "Ox": "60 m", "Sürət": "80 km/s", "Güc": "480 a.g."}', 0, 'SAAT', 'available', true, 2),
  ('Samasval / Dump Truck', 'Daşıma Texnikası', '/machines/dump_truck_real.jpg', '{"Həcm": "20 m³", "Yük": "30 ton", "Güc": "420 a.g.", "Təkər": "8x4"}', 0, 'SAAT', 'available', true, 3),
  ('Beton Nasosu / Concrete Pump', 'Beton və Tikinti', '/machines/concrete_pump_real.jpg', '{"Boom": "36 m", "Basqı": "160 bar", "Axın": "160 m³/h", "İl": "2023"}', 0, 'SAAT', 'available', true, 4),
  ('Ekskavator (Təkərli) / Wheeled Excavator', 'Torpaq İşləri', '/machines/wheeled_excavator_real.jpg', '{"Güc": "140 a.g.", "Sürət": "30 km/s", "Qazma": "5.5 m", "Çəki": "18 ton"}', 0, 'SAAT', 'available', true, 5),
  ('Mini Ekskavator / Mini Excavator', 'Torpaq İşləri', '/machines/mini_excavator_real.jpg', '{"Güc": "25 a.g.", "Çəki": "3.5 ton", "Eni": "1.5 m", "Qazma": "3.1 m"}', 0, 'SAAT', 'available', true, 6),

  -- Torpaq İşləri (Cont.)
  ('Buldozer / Bulldozer', 'Torpaq İşləri', '/machines/bulldozer_real.jpg', '{"Güc": "215 a.g.", "Çəki": "24.5 ton", "Bıçaq": "5.8 m³", "Palet": "610 mm"}', 0, 'SAAT', 'available', false, 10),
  ('Qreyder / Motor Grader', 'Torpaq İşləri', '/machines/motor_grader_real.jpg', '{"Güc": "180 a.g.", "Bıçaq": "3.7 m", "Çəki": "16 ton", "İl": "2024"}', 0, 'SAAT', 'available', false, 11),

  -- Daşıma Texnikası (Cont.)
  ('Yük Maşını (Flatbed) / Flatbed Truck', 'Daşıma Texnikası', '/machines/flatbed_truck_real.jpg', '{"Uzunluq": "13 m", "Yük": "24 ton", "Güc": "460 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 20),
  ('Beton Mikser / Concrete Mixer Truck', 'Daşıma Texnikası', '/machines/concrete_mixer_real.jpg', '{"Həcm": "12 m³", "Su": "600 L", "Güc": "380 a.g.", "Təkər": "6x4"}', 0, 'SAAT', 'available', false, 21),

  -- Qaldırıcı Texnikalar (Cont.)
  ('Manipulyator / Knuckle Boom Crane', 'Qaldırıcı Texnikalar', '/machines/knuckle_boom_real.jpg', '{"Yük": "12 ton", "Qol": "18 m", "Güc": "320 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 30),
  ('Manlift (Səbətli) / Boom Lift', 'Qaldırıcı Texnikalar', '/machines/boom_lift_real.jpg', '{"Hündürlük": "28 m", "Yük": "230 kq", "Mühərrik": "Dizel", "Fırlanma": "360°"}', 0, 'SAAT', 'available', false, 31),

  -- Beton və Tikinti (Cont.)
  ('Beton Kəsən / Road Saw', 'Beton və Tikinti', '/machines/road_saw_real.jpg', '{"Dərinlik": "200 mm", "Mühərrik": "13 a.g.", "Çəki": "120 kq", "İl": "2024"}', 0, 'SAAT', 'available', false, 40),

  -- Yol Tikinti
  ('Yol Katoku / Road Roller', 'Yol Tikinti', '/machines/road_roller_real.jpg', '{"Çəki": "14 ton", "Vibrasiya": "Yes", "Eni": "2.1 m", "İl": "2023"}', 0, 'SAAT', 'available', false, 50),
  ('Asfalt Döşəyən / Asphalt Paver', 'Yol Tikinti', '/machines/asphalt_paver_real.jpg', '{"Eni": "8 m", "Hız": "20 m/dəq", "Güc": "160 a.g.", "İl": "2024"}', 0, 'SAAT', 'available', false, 51),

  -- Yükləmə və Köməkçi (Cont.)
  ('Teleskopik Yükləyici / Telehandler', 'Yükləmə və Köməkçi', '/machines/telehandler_real.jpg', '{"Yük": "4 ton", "Hündürlük": "17 m", "Güc": "100 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 60),
  ('Avtoyükləyici / Forklift', 'Yükləmə və Köməkçi', '/machines/forklift_real.jpg', '{"Yük": "5 ton", "Hündürlük": "4.5 m", "Yanacaq": "Dizel", "İl": "2024"}', 0, 'SAAT', 'available', false, 61),
  ('Generator / Diesel Generator', 'Yükləmə və Köməkçi', '/machines/generator_real.jpg', '{"Güc": "500 kVA", "Yanacaq": "Dizel", "Faz": "3 Faz", "İl": "2024"}', 0, 'SAAT', 'available', false, 62),

  -- Xüsusi Texnikalar (Cont.)
  ('Payvuran / Piling Rig', 'Xüsusi Texnikalar', '/machines/piling_rig_real.jpg', '{"Dərinlik": "40 m", "Diametr": "1.5 m", "Güc": "250 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 70),
  ('Qülləli Kran / Tower Crane', 'Xüsusi Texnikalar', '/machines/tower_crane_real.jpg', '{"Yük": "12 ton", "Ox": "65 m", "Hündürlük": "free-stand", "İl": "2024"}', 0, 'SAAT', 'available', false, 71),

  -- Yeraltı və Kommunikasiya
  ('Xəndəkqazan / Trencher', 'Yeraltı və Kommunikasiya', '/machines/trencher_real.jpg', '{"Dərinlik": "1.5 m", "Eni": "300 mm", "Güc": "120 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 80),

  -- Dağıtma
  ('Hidravlik Çəkic / Hydraulic Breaker', 'Dağıtma (Demolition)', '/machines/breaker_real.jpg', '{"Zərbə": "2500 J", "Çəki": "1.8 ton", "Uyğunluq": "20-25t", "İl": "2024"}', 0, 'SAAT', 'available', false, 90);
