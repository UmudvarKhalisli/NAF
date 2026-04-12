-- NAF Texnika - Professional Equipment Catalog Sync (UUID Compatible)
-- Run this in your Supabase SQL Editor

-- 1. Ensure new columns exist
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 999;
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- 2. Clear existing items (DANGER: Also clears dependent orders)
TRUNCATE TABLE equipment CASCADE;

-- 3. Insert full categorized catalog (40+ items)
-- Using valid UUIDs to match the database schema
INSERT INTO equipment (id, name, category, image_url, specs, price, price_unit, status, is_featured, sort_order)
VALUES
  -- 1. Torpaq İşləri (Earthmoving) - Top Priorities
  ('a53b4b09-2d69-4762-81c1-0f6bf5a4b2af', 'Ekskavator (Paletli) / Crawler Excavator', 'Torpaq İşləri', '/machines/crawler_excavator_premium.png', '{"Güc": "165 a.g.", "Çəki": "22 ton", "Qazma": "6.8 m", "Çömçə": "1.2 m³"}', 0, 'SAAT', 'available', true, 1),
  ('f34a8c8d-8958-4891-b657-ca90ba19d5b8', 'Avtokran / Mobile Crane', 'Qaldırıcı Texnikalar', '/machines/mobile_crane_premium.png', '{"Yük": "100 ton", "Ox": "60 m", "Sürət": "80 km/s", "Güc": "480 a.g."}', 0, 'SAAT', 'available', true, 2),
  ('daa7da63-f3b4-4d80-867e-5fc2f50f4292', 'Samasval / Dump Truck', 'Daşıma Texnikası', '/machines/dump_truck_premium.png', '{"Həcm": "20 m³", "Yük": "30 ton", "Güc": "420 a.g.", "Təkər": "8x4"}', 0, 'SAAT', 'available', true, 3),
  ('f3d3130d-52b4-4856-a7f9-3d4ebecd924e', 'Beton Nasosu / Concrete Pump', 'Beton və Tikinti', '/machines/concrete_pump_premium.png', '{"Boom": "36 m", "Basqı": "160 bar", "Axın": "160 m³/h", "İl": "2023"}', 0, 'SAAT', 'available', true, 4),
  ('b9bb07f7-28a3-4932-86a8-84f477889203', 'Ekskavator (Təkərli) / Wheeled Excavator', 'Torpaq İşləri', '/machines/wheeled_excavator_premium.png', '{"Güc": "140 a.g.", "Sürət": "30 km/s", "Qazma": "5.5 m", "Çəki": "18 ton"}', 0, 'SAAT', 'available', true, 5),
  ('88d77c06-4c95-49be-adde-63ee2e904ed7', 'Mini Ekskavator / Mini Excavator', 'Torpaq İşləri', '/machines/mini_excavator_premium.png', '{"Güc": "25 a.g.", "Çəki": "3.5 ton", "Eni": "1.5 m", "Qazma": "3.1 m"}', 0, 'SAAT', 'available', true, 6),

  -- Torpaq İşləri (Cont.)
  ('73647305-3e46-4f0d-97e0-17d53d06fb7d', 'Buldozer / Bulldozer', 'Torpaq İşləri', '/machines/bulldozer_premium.png', '{"Güc": "215 a.g.", "Çəki": "24.5 ton", "Bıçaq": "5.8 m³", "Palet": "610 mm"}', 0, 'SAAT', 'available', false, 10),
  ('a5103dbd-62f0-45ce-80f2-2623431174d5', 'Qreyder / Motor Grader', 'Torpaq İşləri', '/machines/motor_grader_premium.png', '{"Güc": "180 a.g.", "Bıçaq": "3.7 m", "Çəki": "16 ton", "İl": "2024"}', 0, 'SAAT', 'available', false, 11),

  -- Daşıma Texnikası (Cont.)
  ('2093c646-2151-406f-ac1f-332424dcf485', 'Yük Maşını (Flatbed) / Flatbed Truck', 'Daşıma Texnikası', '/machines/truck.png', '{"Uzunluq": "13 m", "Yük": "24 ton", "Güc": "460 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 20),
  ('0c4e2e5c-f0b4-45dd-81fd-4fc0a76dbe90', 'Beton Mikser / Concrete Mixer Truck', 'Daşıma Texnikası', '/machines/mixer.png', '{"Həcm": "12 m³", "Su": "600 L", "Güc": "380 a.g.", "Təkər": "6x4"}', 0, 'SAAT', 'available', false, 21),

  -- Qaldırıcı Texnikalar (Cont.)
  ('acd9545f-56ab-4035-9e00-956efad71e8f', 'Manipulyator / Knuckle Boom Crane', 'Qaldırıcı Texnikalar', '/machines/knuckle_boom_premium.png', '{"Yük": "12 ton", "Qol": "18 m", "Güc": "320 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 30),
  ('4df3eba7-1836-43ab-8fd9-57bd13921407', 'Manlift (Səbətli) / Boom Lift', 'Qaldırıcı Texnikalar', '/machines/boom_lift_premium.png', '{"Hündürlük": "28 m", "Yük": "230 kq", "Mühərrik": "Dizel", "Fırlanma": "360°"}', 0, 'SAAT', 'available', false, 31),

  -- Beton və Tikinti (Cont.)
  ('69938821-c267-4219-9cd7-b19c1a6dc903', 'Beton Kəsən / Road Saw', 'Beton və Tikinti', '/machines/road_saw.png', '{"Dərinlik": "200 mm", "Mühərrik": "13 a.g.", "Çəki": "120 kq", "İl": "2024"}', 0, 'SAAT', 'available', false, 40),

  -- Yol Tikinti
  ('d5502348-5368-49ff-9399-f2207827be07', 'Yol Katoku / Road Roller', 'Yol Tikinti', '/machines/road_roller_premium.png', '{"Çəki": "14 ton", "Vibrasiya": "Yes", "Eni": "2.1 m", "İl": "2023"}', 0, 'SAAT', 'available', false, 50),
  ('5b568334-6068-4f71-abe9-1f5c661af86f', 'Asfalt Döşəyən / Asphalt Paver', 'Yol Tikinti', '/machines/asphalt_paver.png', '{"Eni": "8 m", "Hız": "20 m/dəq", "Güc": "160 a.g.", "İl": "2024"}', 0, 'SAAT', 'available', false, 51),

  -- Yükləmə və Köməkçi
  ('4f71673b-6fd3-4d5b-b7a4-4f79a91a578b', 'Teleskopik Yükləyici / Telehandler', 'Yükləmə və Köməkçi', '/machines/telehandler_premium.png', '{"Yük": "4 ton", "Hündürlük": "17 m", "Güc": "100 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 60),
  ('c8e50f61-f2b9-4dd0-bac5-802675b2b9ab', 'Avtoyükləyici / Forklift', 'Yükləmə və Köməkçi', '/machines/forklift.png', '{"Yük": "5 ton", "Hündürlük": "4.5 m", "Yanacaq": "Dizel", "İl": "2024"}', 0, 'SAAT', 'available', false, 61),
  ('b26a27d9-76ac-4783-b0fa-843fc8ad818e', 'Generator / Diesel Generator', 'Yükləmə və Köməkçi', '/machines/generator.png', '{"Güc": "500 kVA", "Yanacaq": "Dizel", "Faz": "3 Faz", "İl": "2024"}', 0, 'SAAT', 'available', false, 62),

  -- Xüsusi Texnikalar
  ('be28b4dc-b502-4f2d-97f1-7552491ec9ac', 'Payvuran / Piling Rig', 'Xüsusi Texnikalar', '/machines/piling_rig.png', '{"Dərinlik": "40 m", "Diametr": "1.5 m", "Güc": "250 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 70),
  ('3597644e-e817-4951-8bf4-da2be352aa2e', 'Qülləli Kran / Tower Crane', 'Xüsusi Texnikalar', '/machines/tower_crane.png', '{"Yük": "12 ton", "Ox": "65 m", "Hündürlük": "free-stand", "İl": "2024"}', 0, 'SAAT', 'available', false, 71),

  -- Yeraltı və Kommunikasiya
  ('15c031e9-56a5-4a09-a7a7-5d4b9a2a0260', 'Xəndəkqazan / Trencher', 'Yeraltı və Kommunikasiya', '/machines/trencher.png', '{"Dərinlik": "1.5 m", "Eni": "300 mm", "Güc": "120 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 80),

  -- Dağıtma
  ('3343bfd2-34fd-45d7-8817-a123e281d77a', 'Hidravlik Çəkic / Hydraulic Breaker', 'Dağıtma (Demolition)', '/machines/breaker.png', '{"Zərbə": "2500 J", "Çəki": "1.8 ton", "Uyğunluq": "20-25t", "İl": "2024"}', 0, 'SAAT', 'available', false, 90);
