-- NAF Texnika - Bulk Equipment Import SQL
-- Run this in your Supabase SQL Editor

TRUNCATE TABLE equipment CASCADE; -- Clears equipment AND dependent tables (like orders) to prevent FK errors.

INSERT INTO equipment (id, name, category, image_url, specs, price, available)
VALUES
  -- Torpaq İşləri
  ('crawler-excavator-1', 'Ekskavator (Paletli) / Crawler Excavator', 'Torpaq İşləri', '/machines/crawler_excavator_premium.png', '{"Güc": "165 a.g.", "Çəki": "22 ton", "Qazma": "6.8 m"}', 0, true),
  ('wheeled-excavator-1', 'Ekskavator (Təkərli) / Wheeled Excavator', 'Torpaq İşləri', '/machines/wheeled_excavator.png', '{"Güc": "140 a.g.", "Sürət": "30 km/s", "Qazma": "5.5 m"}', 0, true),
  ('mini-excavator-1', 'Mini Ekskavator / Mini Excavator', 'Torpaq İşləri', '/machines/mini_excavator.png', '{"Güc": "25 a.g.", "Çəki": "3.5 ton", "Eni": "1.5 m"}', 0, true),
  ('bulldozer-1', 'Buldozer / Bulldozer', 'Torpaq İşləri', '/machines/bulldozer.png', '{"Güc": "215 a.g.", "Çəki": "24.5 ton", "Bıçaq": "5.8 m³"}', 0, true),
  
  -- Daşıma Texnikası
  ('dump-truck-1', 'Samasval / Dump Truck', 'Daşıma Texnikası', '/machines/dump_truck_premium.png', '{"Həcm": "20 m³", "Yük": "30 ton", "Güc": "420 a.g."}', 0, true),
  ('concrete-mixer-1', 'Beton Mikser / Concrete Mixer Truck', 'Daşıma Texnikası', '/machines/mixer.png', '{"Həcm": "12 m³", "Su": "600 L", "Güc": "380 a.g."}', 0, true),
  
  -- Qaldırıcı Texnikalar
  ('mobile-crane-1', 'Avtokran / Mobile Crane', 'Qaldırıcı Texnikalar', '/machines/mobile_crane_premium.png', '{"Yük": "100 ton", "Ox": "60 m", "Sürət": "80 km/s"}', 0, true),
  ('boom-lift-1', 'Manlift (Səbətli) / Boom Lift', 'Qaldırıcı Texnikalar', '/machines/manlift.png', '{"Hündürlük": "28 m", "Yük": "230 kq", "Mühərrik": "Dizel"}', 0, true),
  
  -- Beton və Tikinti
  ('concrete-pump-1', 'Beton Nasosu / Concrete Pump', 'Beton və Tikinti', '/machines/concrete_pump_premium.png', '{"Boom": "36 m", "Basqı": "160 bar", "Axın": "160 m³/h"}', 0, true),
  
  -- Yol Tikinti
  ('road-roller-1', 'Yol Katoku / Road Roller', 'Yol Tikinti', '/machines/roller.png', '{"Çəki": "14 ton", "Eni": "2.1 m", "İl": "2023"}', 0, true),
  
  -- Yükləmə və Köməkçi
  ('telehandler-1', 'Teleskopik Yükləyici / Telehandler', 'Yükləmə və Köməkçi', '/machines/telehandler.png', '{"Yük": "4 ton", "Hündürlük": "17 m", "Güc": "100 a.g."}', 0, true),
  ('generator-1', 'Generator / Diesel Generator', 'Yükləmə və Köməkçi', '/machines/generator.png', '{"Güc": "500 kVA", "Yanacaq": "Dizel", "Faz": "3 Faz"}', 0, true);
