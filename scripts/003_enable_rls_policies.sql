-- Enable Row Level Security (RLS) and create policies for PT. Bakti Karya Teknik

-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and authenticated write access

-- Contacts table policies (Admin only for read/write, public can insert)
CREATE POLICY "Public can insert contacts" ON contacts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts" ON contacts
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts" ON contacts
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contacts" ON contacts
  FOR DELETE TO authenticated
  USING (true);

-- Services table policies (Public read, authenticated write)
CREATE POLICY "Public can view active services" ON services
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services" ON services
  FOR ALL TO authenticated
  USING (true);

-- Portfolio table policies (Public read, authenticated write)
CREATE POLICY "Public can view portfolios" ON portfolios
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage portfolios" ON portfolios
  FOR ALL TO authenticated
  USING (true);

-- Testimonials table policies (Public read, authenticated write)
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL TO authenticated
  USING (true);

-- Pricing packages table policies (Public read, authenticated write)
CREATE POLICY "Public can view active pricing packages" ON pricing_packages
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage pricing packages" ON pricing_packages
  FOR ALL TO authenticated
  USING (true);

-- Brand partners table policies (Public read, authenticated write)
CREATE POLICY "Public can view active brand partners" ON brand_partners
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage brand partners" ON brand_partners
  FOR ALL TO authenticated
  USING (true);

-- Company info table policies (Public read, authenticated write)
CREATE POLICY "Public can view company info" ON company_info
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage company info" ON company_info
  FOR ALL TO authenticated
  USING (true);
