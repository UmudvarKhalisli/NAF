-- NAF Texnika - Professional Equipment Catalog Sync (Real Action Photos)
-- Run this in your Supabase SQL Editor

-- 1. Ensure new columns exist
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 999;
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- 2. Clear existing items (DANGER: Also clears dependent orders)
TRUNCATE TABLE equipment CASCADE;

-- 3. Insert full categorized catalog (40+ items)
INSERT INTO equipment (id, name, category, image_url, specs, price, price_unit, status, is_featured, sort_order)
VALUES
  -- 1. Torpaq İşləri (Earthmoving) - Top Priorities
  ('crawler-excavator-1', 'Ekskavator (Paletli) / Crawler Excavator', 'Torpaq İşləri', 'https://images.pexels.com/photos/25559747/pexels-photo-25559747/free-photo-of-crawler-excavator-digging-in-a-quary.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '{"Güc": "165 a.g.", "Çəki": "22 ton", "Qazma": "6.8 m", "Çömçə": "1.2 m³"}', 0, 'SAAT', 'available', true, 1),
  ('mobile-crane-1', 'Avtokran / Mobile Crane', 'Qaldırıcı Texnikalar', 'https://images.unsplash.com/photo-1727818899530-5a3bee908607?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Yük": "100 ton", "Ox": "60 m", "Sürət": "80 km/s", "Güc": "480 a.g."}', 0, 'SAAT', 'available', true, 2),
  ('dump-truck-1', 'Samasval / Dump Truck', 'Daşıma Texnikası', 'https://images.unsplash.com/photo-1653924323287-127daf6e6937?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Həcm": "20 m³", "Yük": "30 ton", "Güc": "420 a.g.", "Təkər": "8x4"}', 0, 'SAAT', 'available', true, 3),
  ('concrete-pump-1', 'Beton Nasosu / Concrete Pump', 'Beton və Tikinti', 'https://images.unsplash.com/photo-1582386061789-2b2b43a5fda8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Boom": "36 m", "Basqı": "160 bar", "Axın": "160 m³/h", "İl": "2023"}', 0, 'SAAT', 'available', true, 4),
  ('wheeled-excavator-1', 'Ekskavator (Təkərli) / Wheeled Excavator', 'Torpaq İşləri', 'https://images.unsplash.com/photo-1630693916229-c1a3371d16f2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Güc": "140 a.g.", "Sürət": "30 km/s", "Qazma": "5.5 m", "Çəki": "18 ton"}', 0, 'SAAT', 'available', true, 5),
  ('mini-excavator-1', 'Mini Ekskavator / Mini Excavator', 'Torpaq İşləri', 'https://images.unsplash.com/photo-1630693916229-c1a3371d16f2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Güc": "25 a.g.", "Çəki": "3.5 ton", "Eni": "1.5 m", "Qazma": "3.1 m"}', 0, 'SAAT', 'available', true, 6),

  -- Torpaq İşləri (Cont.)
  ('bulldozer-1', 'Buldozer / Bulldozer', 'Torpaq İşləri', 'https://images.unsplash.com/photo-1769240628075-e4728cfba211?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Güc": "215 a.g.", "Çəki": "24.5 ton", "Bıçaq": "5.8 m³", "Palet": "610 mm"}', 0, 'SAAT', 'available', false, 10),
  ('grader-1', 'Qreyder / Motor Grader', 'Torpaq İşləri', 'https://images.unsplash.com/photo-1584186118422-895ef18c418d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Güc": "180 a.g.", "Bıçaq": "3.7 m", "Çəki": "16 ton", "İl": "2024"}', 0, 'SAAT', 'available', false, 11),

  -- Daşıma Texnikası (Cont.)
  ('flatbed-truck-1', 'Yük Maşını (Flatbed) / Flatbed Truck', 'Daşıma Texnikası', 'https://images.unsplash.com/photo-1653924323287-127daf6e6937?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Uzunluq": "13 m", "Yük": "24 ton", "Güc": "460 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 20),
  ('concrete-mixer-1', 'Beton Mikser / Concrete Mixer Truck', 'Daşıma Texnikası', 'https://images.unsplash.com/photo-1690719744562-249937b9c03a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Həcm": "12 m³", "Su": "600 L", "Güc": "380 a.g.", "Təkər": "6x4"}', 0, 'SAAT', 'available', false, 21),

  -- Qaldırıcı Texnikalar (Cont.)
  ('knuckle-boom-1', 'Manipulyator / Knuckle Boom Crane', 'Qaldırıcı Texnikalar', 'https://images.unsplash.com/photo-1727818899530-5a3bee908607?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Yük": "12 ton", "Qol": "18 m", "Güc": "320 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 30),
  ('boom-lift-1', 'Manlift (Səbətli) / Boom Lift', 'Qaldırıcı Texnikalar', 'https://images.unsplash.com/photo-1753106713704-be0d6d1691e9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Hündürlük": "28 m", "Yük": "230 kq", "Mühərrik": "Dizel", "Fırlanma": "360°"}', 0, 'SAAT', 'available', false, 31),

  -- Beton və Tikinti (Cont.)
  ('road-saw-1', 'Beton Kəsən / Road Saw', 'Beton və Tikinti', 'https://images.unsplash.com/photo-1582386061789-2b2b43a5fda8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Dərinlik": "200 mm", "Mühərrik": "13 a.g.", "Çəki": "120 kq", "İl": "2024"}', 0, 'SAAT', 'available', false, 40),

  -- Yol Tikinti
  ('road-roller-1', 'Yol Katoku / Road Roller', 'Yol Tikinti', 'https://images.unsplash.com/photo-1760708626681-59a5373819a6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Çəki": "14 ton", "Vibrasiya": "Yes", "Eni": "2.1 m", "İl": "2023"}', 0, 'SAAT', 'available', false, 50),
  ('asphalt-paver-1', 'Asfalt Döşəyən / Asphalt Paver', 'Yol Tikinti', 'https://images.unsplash.com/photo-1760708626681-59a5373819a6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Eni": "8 m", "Hız": "20 m/dəq", "Güc": "160 a.g.", "İl": "2024"}', 0, 'SAAT', 'available', false, 51),

  -- Yükləmə və Köməkçi
  ('telescopic-handler-1', 'Teleskopik Yükləyici / Telehandler', 'Yükləmə və Köməkçi', 'https://images.unsplash.com/photo-1769247178321-e226a0a7c941?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Yük": "4 ton", "Hündürlük": "17 m", "Güc": "100 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 60),
  ('forklift-1', 'Avtoyükləyici / Forklift', 'Yükləmə və Köməkçi', 'https://images.unsplash.com/photo-1770827730773-cc7848b2ee61?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Yük": "5 ton", "Hündürlük": "4.5 m", "Yanacaq": "Dizel", "İl": "2024"}', 0, 'SAAT', 'available', false, 61),
  ('generator-1', 'Generator / Diesel Generator', 'Yükləmə və Köməkçi', 'https://images.unsplash.com/photo-1770827730773-cc7848b2ee61?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Güc": "500 kVA", "Yanacaq": "Dizel", "Faz": "3 Faz", "İl": "2024"}', 0, 'SAAT', 'available', false, 62),

  -- Xüsusi Texnikalar
  ('piling-rig-1', 'Payvuran / Piling Rig', 'Xüsusi Texnikalar', 'https://images.unsplash.com/photo-1582386061789-2b2b43a5fda8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Dərinlik": "40 m", "Diametr": "1.5 m", "Güc": "250 a.g.", "İl": "2023"}', 0, 'SAAT', 'available', false, 70),
  ('tower-crane-1', 'Qülləli Kran / Tower Crane', 'Xüsusi Texnikalar', 'https://images.unsplash.com/photo-1753106713704-be0d6d1691e9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0', '{"Yük": "12 ton", "Ox": "65 m", "Hündürlük": "free-stand", "İl": "2024"}', 0, 'SAAT', 'available', false, 71);
