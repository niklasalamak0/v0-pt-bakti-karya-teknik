"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, ArrowRight } from "lucide-react"

interface PricingPackage {
  id: string
  name: string
  category: "advertising" | "building_me"
  price_range: string
  description: string
  features: string[]
  is_popular: boolean
}

// Sample data - in real app this would come from Supabase
const pricingPackages: PricingPackage[] = [
  {
    id: "1",
    name: "Paket Signage Dasar",
    category: "advertising",
    price_range: "Rp 2.500.000 - 5.000.000",
    description: "Paket hemat untuk UMKM dan usaha kecil",
    features: [
      "Desain 2 konsep",
      "Material acrylic 3mm",
      "Ukuran maksimal 2x1 meter",
      "Pemasangan gratis area Jakarta",
      "Garansi 6 bulan",
    ],
    is_popular: false,
  },
  {
    id: "2",
    name: "Paket Signage Premium",
    category: "advertising",
    price_range: "Rp 5.000.000 - 15.000.000",
    description: "Paket lengkap untuk bisnis menengah",
    features: [
      "Desain unlimited revisi",
      "Material premium (acrylic 5mm)",
      "LED backlighting",
      "Ukuran fleksibel",
      "Pemasangan se-Jabodetabek",
      "Garansi 1 tahun",
      "Maintenance 3x",
    ],
    is_popular: true,
  },
  {
    id: "3",
    name: "Paket Corporate Branding",
    category: "advertising",
    price_range: "Rp 15.000.000 - 50.000.000",
    description: "Solusi branding menyeluruh untuk perusahaan",
    features: [
      "Complete brand identity",
      "Multiple signage locations",
      "Digital display integration",
      "Brand guideline lengkap",
      "Project management dedicated",
      "Garansi 2 tahun",
      "Maintenance unlimited",
    ],
    is_popular: false,
  },
  {
    id: "4",
    name: "Paket AC Residensial",
    category: "building_me",
    price_range: "Rp 3.000.000 - 8.000.000",
    description: "Solusi AC untuk rumah tinggal",
    features: [
      "Survey dan konsultasi gratis",
      "AC split 1-2 PK",
      "Instalasi lengkap",
      "Pipa dan kabel included",
      "Garansi instalasi 1 tahun",
    ],
    is_popular: false,
  },
  {
    id: "5",
    name: "Paket AC Komersial",
    category: "building_me",
    price_range: "Rp 10.000.000 - 30.000.000",
    description: "Sistem AC untuk gedung komersial",
    features: [
      "Desain sistem AC central",
      "Unit AC kapasitas besar",
      "Ducting dan ventilasi",
      "Control system otomatis",
      "Maintenance contract 1 tahun",
      "Emergency service 24/7",
    ],
    is_popular: true,
  },
  {
    id: "6",
    name: "Paket Building Maintenance",
    category: "building_me",
    price_range: "Rp 20.000.000 - 100.000.000",
    description: "Maintenance terpadu gedung komersial",
    features: [
      "Electrical system maintenance",
      "AC central maintenance",
      "Plumbing system care",
      "Fire safety system",
      "Lift maintenance",
      "Cleaning service",
      "Security system",
      "24/7 emergency response",
    ],
    is_popular: false,
  },
]

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<"advertising" | "building_me">("advertising")

  const filteredPackages = pricingPackages.filter((pkg) => pkg.category === activeCategory)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            Paket Harga
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Pilihan Paket Sesuai Kebutuhan Anda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Kami menyediakan berbagai paket layanan dengan harga kompetitif dan kualitas terjamin untuk semua skala
            bisnis.
          </p>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl shadow-sm">
            <Button
              variant={activeCategory === "advertising" ? "default" : "ghost"}
              onClick={() => setActiveCategory("advertising")}
              className={activeCategory === "advertising" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
            >
              Paket Periklanan
            </Button>
            <Button
              variant={activeCategory === "building_me" ? "default" : "ghost"}
              onClick={() => setActiveCategory("building_me")}
              className={activeCategory === "building_me" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
            >
              Paket Building ME
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const isAdvertising = pkg.category === "advertising"

            return (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  pkg.is_popular ? "ring-2 ring-orange-500 scale-105" : ""
                }`}
              >
                {pkg.is_popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center py-2 text-sm font-medium">
                    <Star className="inline w-4 h-4 mr-1" />
                    Paling Populer
                  </div>
                )}

                <CardHeader className={`text-center ${pkg.is_popular ? "pt-12" : "pt-6"}`}>
                  <Badge
                    variant="secondary"
                    className={`mb-4 ${isAdvertising ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700"}`}
                  >
                    {isAdvertising ? "Periklanan" : "Building ME"}
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className={`text-3xl font-bold ${isAdvertising ? "text-orange-500" : "text-blue-500"} mt-2`}>
                    {pkg.price_range}
                  </div>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      pkg.is_popular
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : isAdvertising
                          ? "bg-orange-100 hover:bg-orange-200 text-orange-700"
                          : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                    }`}
                  >
                    Pilih Paket Ini
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Paket Khusus?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Kami juga menyediakan paket custom sesuai kebutuhan spesifik proyek Anda
            </p>
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white">
              Konsultasi Paket Custom
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
