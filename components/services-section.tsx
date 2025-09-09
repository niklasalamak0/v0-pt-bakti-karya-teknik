"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Megaphone,
  Building2,
  Biohazard as Billboard,
  Lightbulb,
  Palette,
  Printer,
  Wind,
  Zap,
  Settings,
  Wrench,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

const iconMap = {
  Billboard,
  Lightbulb,
  Palette,
  Printer,
  Wind,
  Zap,
  Settings,
  Wrench,
}

interface Service {
  id: string
  title: string
  description: string
  category: "advertising" | "building_me"
  icon: keyof typeof iconMap
  features: string[]
  image_url?: string
}

// Sample data - in real app this would come from Supabase
const services: Service[] = [
  {
    id: "1",
    title: "Billboard & Signage",
    description:
      "Pembuatan dan pemasangan billboard, papan nama, dan signage berkualitas tinggi dengan desain menarik dan tahan lama.",
    category: "advertising",
    icon: "Billboard",
    features: [
      "Desain kreatif dan profesional",
      "Material berkualitas tinggi",
      "Pemasangan yang aman dan rapi",
      "Maintenance berkala",
      "Garansi 1 tahun",
    ],
  },
  {
    id: "2",
    title: "Neon Box & LED Display",
    description:
      "Solusi pencahayaan modern dengan neon box dan LED display untuk meningkatkan visibilitas brand Anda 24/7.",
    category: "advertising",
    icon: "Lightbulb",
    features: [
      "LED berkualitas tinggi",
      "Hemat energi",
      "Tahan cuaca ekstrem",
      "Remote control system",
      "Garansi 2 tahun",
    ],
  },
  {
    id: "3",
    title: "Branding & Graphic Design",
    description: "Layanan lengkap branding mulai dari logo design, corporate identity, hingga material promosi.",
    category: "advertising",
    icon: "Palette",
    features: [
      "Logo dan brand identity",
      "Desain kemasan produk",
      "Material promosi",
      "Digital marketing design",
      "Brand guideline",
    ],
  },
  {
    id: "4",
    title: "Digital Printing",
    description: "Layanan cetak digital berkualitas tinggi untuk berbagai kebutuhan promosi dan branding.",
    category: "advertising",
    icon: "Printer",
    features: [
      "Cetak indoor & outdoor",
      "Berbagai material",
      "Resolusi tinggi",
      "Finishing berkualitas",
      "Harga kompetitif",
    ],
  },
  {
    id: "5",
    title: "AC Installation & Maintenance",
    description: "Pemasangan, perawatan, dan perbaikan sistem AC untuk gedung komersial dan residensial.",
    category: "building_me",
    icon: "Wind",
    features: [
      "Pemasangan AC split & central",
      "Maintenance rutin",
      "Perbaikan darurat 24/7",
      "Cleaning dan service",
      "Garansi service 6 bulan",
    ],
  },
  {
    id: "6",
    title: "Electrical System",
    description: "Instalasi dan maintenance sistem kelistrikan gedung dengan standar keamanan tinggi.",
    category: "building_me",
    icon: "Zap",
    features: [
      "Instalasi listrik gedung",
      "Panel listrik & MCB",
      "Grounding system",
      "Emergency lighting",
      "Sertifikat SLO",
    ],
  },
  {
    id: "7",
    title: "Mechanical Engineering",
    description: "Solusi engineering untuk sistem mekanikal gedung termasuk plumbing dan ventilasi.",
    category: "building_me",
    icon: "Settings",
    features: [
      "Sistem plumbing",
      "Ventilasi udara",
      "Fire protection system",
      "Lift maintenance",
      "Konsultasi engineering",
    ],
  },
  {
    id: "8",
    title: "Building Maintenance",
    description: "Layanan maintenance terpadu untuk menjaga kondisi optimal gedung dan fasilitasnya.",
    category: "building_me",
    icon: "Wrench",
    features: [
      "Preventive maintenance",
      "Corrective maintenance",
      "Facility management",
      "Cleaning service",
      "Security system",
    ],
  },
]

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "advertising" | "building_me">("all")

  const filteredServices =
    activeCategory === "all" ? services : services.filter((service) => service.category === activeCategory)

  const advertisingServices = services.filter((s) => s.category === "advertising")
  const buildingServices = services.filter((s) => s.category === "building_me")

  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            Layanan Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Solusi Lengkap untuk Kebutuhan Bisnis Anda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Kami menyediakan layanan terpadu di bidang periklanan dan building mechanical electrical dengan standar
            kualitas tinggi dan tim profesional berpengalaman.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-xl">
            <Button
              variant={activeCategory === "all" ? "default" : "ghost"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-white shadow-sm" : ""}
            >
              Semua Layanan
            </Button>
            <Button
              variant={activeCategory === "advertising" ? "default" : "ghost"}
              onClick={() => setActiveCategory("advertising")}
              className={activeCategory === "advertising" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
            >
              <Megaphone className="w-4 h-4 mr-2" />
              Periklanan
            </Button>
            <Button
              variant={activeCategory === "building_me" ? "default" : "ghost"}
              onClick={() => setActiveCategory("building_me")}
              className={activeCategory === "building_me" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Building ME
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon]
            const isAdvertising = service.category === "advertising"

            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      isAdvertising ? "bg-orange-100" : "bg-blue-100"
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 ${isAdvertising ? "text-orange-500" : "text-blue-500"}`} />
                  </div>

                  <Badge
                    variant="secondary"
                    className={`mb-3 ${isAdvertising ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700"}`}
                  >
                    {isAdvertising ? "Periklanan" : "Building ME"}
                  </Badge>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all bg-transparent"
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Butuh Konsultasi untuk Proyek Anda?</h3>
            <p className="text-lg mb-6 opacity-90">
              Tim ahli kami siap membantu merencanakan solusi terbaik sesuai kebutuhan dan budget Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                Konsultasi Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
              >
                Lihat Portofolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
