-- Debug script to check database status and schema cache

-- Check if all required tables exist
SELECT 
  schemaname,
  tablename,
  tableowner,
  hasindexes,
  hasrules,
  hastriggers,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('contacts', 'services', 'portfolios', 'testimonials', 'pricing_packages', 'brand_partners', 'company_info')
ORDER BY tablename;

-- Check table columns and data types
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('contacts', 'services', 'portfolios', 'testimonials', 'pricing_packages', 'brand_partners', 'company_info')
ORDER BY table_name, ordinal_position;

-- Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check table row counts
SELECT 
  'contacts' as table_name, COUNT(*) as row_count FROM contacts
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'portfolios', COUNT(*) FROM portfolios
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'pricing_packages', COUNT(*) FROM pricing_packages
UNION ALL
SELECT 'brand_partners', COUNT(*) FROM brand_partners
UNION ALL
SELECT 'company_info', COUNT(*) FROM company_info;
