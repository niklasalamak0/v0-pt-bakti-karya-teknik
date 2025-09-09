-- =====================================================
-- DATABASE DEBUG AND VERIFICATION SCRIPT
-- =====================================================

-- Check if all tables exist
SELECT 
    table_name,
    table_type,
    is_insertable_into
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN ('contacts', 'services', 'portfolios', 'testimonials', 'pricing_packages', 'brand_partners')
ORDER BY table_name;

-- Check table row counts
SELECT 
    'contacts' as table_name, 
    COUNT(*) as row_count 
FROM public.contacts
UNION ALL
SELECT 
    'services' as table_name, 
    COUNT(*) as row_count 
FROM public.services
UNION ALL
SELECT 
    'portfolios' as table_name, 
    COUNT(*) as row_count 
FROM public.portfolios
UNION ALL
SELECT 
    'testimonials' as table_name, 
    COUNT(*) as row_count 
FROM public.testimonials
UNION ALL
SELECT 
    'pricing_packages' as table_name, 
    COUNT(*) as row_count 
FROM public.pricing_packages
UNION ALL
SELECT 
    'brand_partners' as table_name, 
    COUNT(*) as row_count 
FROM public.brand_partners;

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Force schema cache refresh
NOTIFY pgrst, 'reload schema';

-- Test basic queries (should not error if tables exist)
SELECT 'contacts_test' as test, COUNT(*) FROM public.contacts LIMIT 1;
SELECT 'services_test' as test, COUNT(*) FROM public.services LIMIT 1;
SELECT 'portfolios_test' as test, COUNT(*) FROM public.portfolios LIMIT 1;
SELECT 'testimonials_test' as test, COUNT(*) FROM public.testimonials LIMIT 1;
SELECT 'pricing_packages_test' as test, COUNT(*) FROM public.pricing_packages LIMIT 1;
SELECT 'brand_partners_test' as test, COUNT(*) FROM public.brand_partners LIMIT 1;
