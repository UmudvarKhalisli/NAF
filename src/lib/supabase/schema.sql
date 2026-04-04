-- TEXNİKALAR CƏDVƏLİ
CREATE TABLE IF NOT EXISTS equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_unit VARCHAR(20) DEFAULT 'SAAT', -- SAAT / GÜN / AY
  status VARCHAR(20) DEFAULT 'available', -- available / rented / maintenance
  year INTEGER,
  image_url TEXT,
  video_url TEXT,
  specs JSONB DEFAULT '{}',
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LAYİHƏLƏR CƏDVƏLİ
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  client VARCHAR(255),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'ongoing', -- ongoing / completed / upcoming
  cover_image_url TEXT,
  images JSONB DEFAULT '[]',
  videos JSONB DEFAULT '[]',
  equipment_used JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SİFARİŞLƏR CƏDVƏLİ
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255),
  equipment_id UUID REFERENCES equipment(id),
  equipment_name VARCHAR(255),
  rental_start DATE,
  rental_end DATE,
  rental_days INTEGER,
  daily_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending', -- pending / confirmed / active / completed / cancelled
  notes TEXT,
  source VARCHAR(50) DEFAULT 'website', -- website / whatsapp / phone / direct
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GƏLİR CƏDVƏLİ
CREATE TABLE IF NOT EXISTS revenue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(50) DEFAULT 'rental', -- rental / deposit / extra / refund
  date DATE DEFAULT CURRENT_DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADMIN LOG CƏDVƏLİ
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action VARCHAR(255) NOT NULL,
  entity VARCHAR(100),
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category);
CREATE INDEX IF NOT EXISTS idx_equipment_status ON equipment(status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_revenue_date ON revenue(date);

-- ROW LEVEL SECURITY
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue ENABLE ROW LEVEL SECURITY;

-- Public read for equipment and projects
CREATE POLICY "Public can read equipment" ON equipment FOR SELECT USING (true);
CREATE POLICY "Public can read published projects" ON projects FOR SELECT USING (is_published = true);

-- Service role has full access (admin)
CREATE POLICY "Service role full access equipment" ON equipment USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access projects" ON projects USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access orders" ON orders USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access revenue" ON revenue USING (auth.role() = 'service_role');