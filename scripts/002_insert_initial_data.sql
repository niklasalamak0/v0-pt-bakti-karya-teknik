-- Insert initial data for PT. Bakti Karya Teknik

-- Company information
INSERT INTO company_info (key, value, description) VALUES
('company_name', 'PT. Bakti Karya Teknik', 'Company name'),
('company_tagline', 'Solusi Terpadu Periklanan & Building Mechanical Electrical', 'Company tagline'),
('company_description', 'Kami adalah perusahaan yang bergerak di bidang periklanan dan building mechanical electrical dengan pengalaman lebih dari 10 tahun melayani berbagai klien dari UMKM hingga perusahaan besar.', 'Company description'),
('phone', '+62 21 1234 5678', 'Company phone number'),
('email', 'info@baktikaryateknik.com', 'Company email'),
('address', 'Jl. Industri Raya No. 123, Jakarta Timur 13560', 'Company address'),
('whatsapp', '+62 812 3456 7890', 'WhatsApp number'),
('instagram', '@baktikaryateknik', 'Instagram handle'),
('facebook', 'PT Bakti Karya Teknik', 'Facebook page name'),
('linkedin', 'pt-bakti-karya-teknik', 'LinkedIn company page');

-- Initial services for Advertising category
INSERT INTO services (title, description, category, icon, features, sort_order) VALUES
('Billboard & Signage', 'Pembuatan dan pemasangan billboard, papan nama, dan signage berkualitas tinggi dengan desain menarik dan tahan lama.', 'advertising', 'Billboard', ARRAY['Desain kreatif dan profesional', 'Material berkualitas tinggi', 'Pemasangan yang aman dan rapi', 'Maintenance berkala', 'Garansi 1 tahun'], 1),
('Neon Box & LED Display', 'Solusi pencahayaan modern dengan neon box dan LED display untuk meningkatkan visibilitas brand Anda 24/7.', 'advertising', 'Lightbulb', ARRAY['LED berkualitas tinggi', 'Hemat energi', 'Tahan cuaca ekstrem', 'Remote control system', 'Garansi 2 tahun'], 2),
('Branding & Graphic Design', 'Layanan lengkap branding mulai dari logo design, corporate identity, hingga material promosi.', 'advertising', 'Palette', ARRAY['Logo dan brand identity', 'Desain kemasan produk', 'Material promosi', 'Digital marketing design', 'Brand guideline'], 3),
('Digital Printing', 'Layanan cetak digital berkualitas tinggi untuk berbagai kebutuhan promosi dan branding.', 'advertising', 'Printer', ARRAY['Cetak indoor & outdoor', 'Berbagai material', 'Resolusi tinggi', 'Finishing berkualitas', 'Harga kompetitif'], 4);

-- Initial services for Building ME category
INSERT INTO services (title, description, category, icon, features, sort_order) VALUES
('AC Installation & Maintenance', 'Pemasangan, perawatan, dan perbaikan sistem AC untuk gedung komersial dan residensial.', 'building_me', 'Wind', ARRAY['Pemasangan AC split & central', 'Maintenance rutin', 'Perbaikan darurat 24/7', 'Cleaning dan service', 'Garansi service 6 bulan'], 1),
('Electrical System', 'Instalasi dan maintenance sistem kelistrikan gedung dengan standar keamanan tinggi.', 'building_me', 'Zap', ARRAY['Instalasi listrik gedung', 'Panel listrik & MCB', 'Grounding system', 'Emergency lighting', 'Sertifikat SLO'], 2),
('Mechanical Engineering', 'Solusi engineering untuk sistem mekanikal gedung termasuk plumbing dan ventilasi.', 'building_me', 'Settings', ARRAY['Sistem plumbing', 'Ventilasi udara', 'Fire protection system', 'Lift maintenance', 'Konsultasi engineering'], 3),
('Building Maintenance', 'Layanan maintenance terpadu untuk menjaga kondisi optimal gedung dan fasilitasnya.', 'building_me', 'Wrench', ARRAY['Preventive maintenance', 'Corrective maintenance', 'Facility management', 'Cleaning service', 'Security system'], 4);

-- Sample pricing packages
INSERT INTO pricing_packages (name, category, price_range, description, features, is_popular, sort_order) VALUES
('Paket Signage Dasar', 'advertising', 'Rp 2.500.000 - 5.000.000', 'Paket hemat untuk UMKM dan usaha kecil', ARRAY['Desain 2 konsep', 'Material acrylic 3mm', 'Ukuran maksimal 2x1 meter', 'Pemasangan gratis area Jakarta', 'Garansi 6 bulan'], false, 1),
('Paket Signage Premium', 'advertising', 'Rp 5.000.000 - 15.000.000', 'Paket lengkap untuk bisnis menengah', ARRAY['Desain unlimited revisi', 'Material premium (acrylic 5mm)', 'LED backlighting', 'Ukuran fleksibel', 'Pemasangan se-Jabodetabek', 'Garansi 1 tahun', 'Maintenance 3x'], true, 2),
('Paket Corporate Branding', 'advertising', 'Rp 15.000.000 - 50.000.000', 'Solusi branding menyeluruh untuk perusahaan', ARRAY['Complete brand identity', 'Multiple signage locations', 'Digital display integration', 'Brand guideline lengkap', 'Project management dedicated', 'Garansi 2 tahun', 'Maintenance unlimited'], false, 3),
('Paket AC Residensial', 'building_me', 'Rp 3.000.000 - 8.000.000', 'Solusi AC untuk rumah tinggal', ARRAY['Survey dan konsultasi gratis', 'AC split 1-2 PK', 'Instalasi lengkap', 'Pipa dan kabel included', 'Garansi instalasi 1 tahun'], false, 1),
('Paket AC Komersial', 'building_me', 'Rp 10.000.000 - 30.000.000', 'Sistem AC untuk gedung komersial', ARRAY['Desain sistem AC central', 'Unit AC kapasitas besar', 'Ducting dan ventilasi', 'Control system otomatis', 'Maintenance contract 1 tahun', 'Emergency service 24/7'], true, 2),
('Paket Building Maintenance', 'building_me', 'Rp 20.000.000 - 100.000.000', 'Maintenance terpadu gedung komersial', ARRAY['Electrical system maintenance', 'AC central maintenance', 'Plumbing system care', 'Fire safety system', 'Lift maintenance', 'Cleaning service', 'Security system', '24/7 emergency response'], false, 3);

-- Sample testimonials
INSERT INTO testimonials (client_name, client_position, client_company, testimonial, rating, service_category, is_featured) VALUES
('Budi Santoso', 'General Manager', 'PT Maju Bersama', 'Pelayanan PT Bakti Karya Teknik sangat memuaskan. Signage yang dibuat berkualitas tinggi dan pemasangannya rapi. Tim mereka sangat profesional dan responsif.', 5, 'advertising', true),
('Sari Dewi', 'Owner', 'Warung Sari Rasa', 'Neon box yang dibuat untuk warung saya sangat menarik dan membuat pelanggan lebih mudah menemukan lokasi. Harga juga terjangkau untuk UMKM seperti saya.', 5, 'advertising', false),
('Ahmad Rahman', 'Facility Manager', 'Gedung Perkantoran Sudirman', 'Maintenance AC central gedung kami ditangani dengan sangat baik. Tim teknisi berpengalaman dan selalu siap 24/7 untuk emergency. Sangat recommended!', 5, 'building_me', true),
('Linda Kusuma', 'Property Manager', 'Apartemen Green Valley', 'Sistem kelistrikan apartemen kami dipasang oleh PT Bakti Karya Teknik dengan standar yang tinggi. Tidak pernah ada masalah dan maintenance rutin selalu tepat waktu.', 4, 'building_me', false);

-- Sample brand partners
INSERT INTO brand_partners (name, logo_url, category, sort_order) VALUES
('PT Indofood Sukses Makmur', '/placeholder.svg?height=80&width=120', 'client', 1),
('Bank Mandiri', '/placeholder.svg?height=80&width=120', 'client', 2),
('Tzu Chi Foundation', '/placeholder.svg?height=80&width=120', 'client', 3),
('Mitsubishi Electric', '/placeholder.svg?height=80&width=120', 'partner', 4),
('Daikin', '/placeholder.svg?height=80&width=120', 'partner', 5),
('Schneider Electric', '/placeholder.svg?height=80&width=120', 'partner', 6);
