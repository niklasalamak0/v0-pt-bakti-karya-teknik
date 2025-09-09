-- =====================================================
-- PT. BAKTI KARYA TEKNIK - COMPLETE DATABASE SCHEMA
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CONTACTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_type VARCHAR(100) NOT NULL CHECK (service_type IN ('advertising', 'building_me', 'both')),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('advertising', 'building_me')),
    icon VARCHAR(100),
    features TEXT[], -- Array of features
    price_range VARCHAR(100),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. PORTFOLIOS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('advertising', 'building_me')),
    client_name VARCHAR(255),
    project_date DATE,
    location VARCHAR(255),
    image_url TEXT,
    gallery_urls TEXT[], -- Array of additional images
    technologies TEXT[], -- Array of technologies used
    project_value DECIMAL(15,2),
    duration_months INTEGER,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255),
    client_company VARCHAR(255) NOT NULL,
    testimonial TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_type VARCHAR(100) CHECK (project_type IN ('advertising', 'building_me')),
    client_avatar_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. PRICING PACKAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.pricing_packages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL CHECK (category IN ('advertising', 'building_me')),
    price DECIMAL(15,2) NOT NULL,
    price_unit VARCHAR(50) DEFAULT 'project', -- project, monthly, yearly, sqm
    features TEXT[] NOT NULL, -- Array of features
    is_popular BOOLEAN DEFAULT false,
    is_custom BOOLEAN DEFAULT false,
    min_project_value DECIMAL(15,2),
    max_project_value DECIMAL(15,2),
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. BRAND PARTNERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.brand_partners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    partner_type VARCHAR(100) NOT NULL CHECK (partner_type IN ('client', 'supplier', 'technology', 'certification')),
    description TEXT,
    collaboration_since DATE,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_contacts_service_type ON public.contacts(service_type);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_published ON public.services(is_published);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON public.services(sort_order);

CREATE INDEX IF NOT EXISTS idx_portfolios_category ON public.portfolios(category);
CREATE INDEX IF NOT EXISTS idx_portfolios_is_published ON public.portfolios(is_published);
CREATE INDEX IF NOT EXISTS idx_portfolios_project_date ON public.portfolios(project_date DESC);

CREATE INDEX IF NOT EXISTS idx_testimonials_is_published ON public.testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON public.testimonials(rating DESC);

CREATE INDEX IF NOT EXISTS idx_pricing_packages_category ON public.pricing_packages(category);
CREATE INDEX IF NOT EXISTS idx_pricing_packages_is_published ON public.pricing_packages(is_published);

CREATE INDEX IF NOT EXISTS idx_brand_partners_partner_type ON public.brand_partners(partner_type);
CREATE INDEX IF NOT EXISTS idx_brand_partners_is_published ON public.brand_partners(is_published);

-- =====================================================
-- CREATE UPDATED_AT TRIGGERS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON public.portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_packages_updated_at BEFORE UPDATE ON public.pricing_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brand_partners_updated_at BEFORE UPDATE ON public.brand_partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
