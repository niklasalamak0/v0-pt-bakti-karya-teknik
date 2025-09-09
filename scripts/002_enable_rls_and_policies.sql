-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_partners ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - PUBLIC READ ACCESS (PUBLISHED ONLY)
-- =====================================================

-- CONTACTS: No public read access (sensitive data)
CREATE POLICY "contacts_no_public_access" ON public.contacts FOR SELECT USING (false);

-- SERVICES: Public can read published services
CREATE POLICY "services_public_read" ON public.services FOR SELECT USING (is_published = true);

-- PORTFOLIOS: Public can read published portfolios
CREATE POLICY "portfolios_public_read" ON public.portfolios FOR SELECT USING (is_published = true);

-- TESTIMONIALS: Public can read published testimonials
CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT USING (is_published = true);

-- PRICING PACKAGES: Public can read published packages
CREATE POLICY "pricing_packages_public_read" ON public.pricing_packages FOR SELECT USING (is_published = true);

-- BRAND PARTNERS: Public can read published partners
CREATE POLICY "brand_partners_public_read" ON public.brand_partners FOR SELECT USING (is_published = true);

-- =====================================================
-- RLS POLICIES - ADMIN FULL ACCESS (SERVICE ROLE)
-- =====================================================

-- CONTACTS: Service role has full access
CREATE POLICY "contacts_service_role_access" ON public.contacts FOR ALL USING (auth.role() = 'service_role');

-- SERVICES: Service role has full access
CREATE POLICY "services_service_role_access" ON public.services FOR ALL USING (auth.role() = 'service_role');

-- PORTFOLIOS: Service role has full access
CREATE POLICY "portfolios_service_role_access" ON public.portfolios FOR ALL USING (auth.role() = 'service_role');

-- TESTIMONIALS: Service role has full access
CREATE POLICY "testimonials_service_role_access" ON public.testimonials FOR ALL USING (auth.role() = 'service_role');

-- PRICING PACKAGES: Service role has full access
CREATE POLICY "pricing_packages_service_role_access" ON public.pricing_packages FOR ALL USING (auth.role() = 'service_role');

-- BRAND PARTNERS: Service role has full access
CREATE POLICY "brand_partners_service_role_access" ON public.brand_partners FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- CONTACT FORM SUBMISSION POLICY
-- =====================================================
-- Allow anonymous users to insert contacts (for contact form)
CREATE POLICY "contacts_anonymous_insert" ON public.contacts FOR INSERT WITH CHECK (true);
