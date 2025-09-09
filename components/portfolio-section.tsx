"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Portfolio {
  id: string
  title: string
  description: string
  category: "advertising" | "building_me"
  client_name: string
  project_date: string
  image_url: string
  tags: string[]
  is_featured: boolean
}

// Sample data - in real app this would come from Supabase
const portfolios: Portfolio[] = [
  {
    id: "1",
    title: "Billboard Mega Mall Jakarta",
    description: "Pemasangan billboard berukuran 8x4 meter dengan LED backlighting untuk promosi grand opening mall.",
    category: "advertising",
    client_name: "PT Mega Mall Indonesia",
    project_date: "2024-01-15",
    image_url: "/modern-billboard-mall-jakarta.jpg",
    tags: ["Billboard", "LED", "Mall"],
    is_featured: true,
  },
  {
    id: "2",
    title: "Neon Box Restaurant Chain",
    description: "Pembuatan dan pemasangan neon box untuk 15 cabang restaurant dengan desain konsisten.",
    category: "advertising",
    client_name: "Warung Padang Sederhana",
    project_date: "2024-02-20",
    image_url: "/neon-box-restaurant-signage.jpg",
    tags: ["Neon Box", "Restaurant", "Chain"],
    is_featured: true,
  },
  {
    id: "3",
    title: "AC Central Gedung Perkantoran",
    description: "Instalasi sistem AC central 50 PK untuk gedung perkantoran 15 lantai dengan sistem kontrol otomatis.",
    category: "building_me",
    client_name: "PT Graha Perkantoran",
    project_date: "2024-03-10",
    image_url: "/office-building-ac-central-system.jpg",
    tags: ["AC Central", "Office Building", "Automation"],
    is_featured: true,
  },
  {
    id: "4",
    title: "Sistem Kelistrikan Apartemen",
    description: "Instalasi lengkap sistem kelistrikan untuk kompleks apartemen 200 unit dengan standar SNI.",
    category: "building_me",
    client_name: "Green Valley Apartment",
    project_date: "2024-01-05",
    image_url: "/apartment-electrical-system-installation.jpg",
    tags: ["Electrical", "Apartment", "SNI Standard"],
    is_featured: false,
  },
  {
    id: "5",
    title: "Corporate Branding Bank",
    description: "Desain dan implementasi complete branding untuk 25 cabang bank termasuk signage dan interior.",
    category: "advertising",
    client_name: "Bank Mandiri Syariah",
    project_date: "2023-12-15",
    image_url: "/bank-corporate-branding-signage.jpg",
    tags: ["Branding", "Bank", "Corporate"],
    is_featured: false,
  },
  {
    id: "6",
    title: "Maintenance Gedung Hotel",
    description: "Kontrak maintenance terpadu untuk hotel bintang 5 meliputi AC, listrik, dan mechanical system.",
    category: "building_me",
    client_name: "Grand Hyatt Jakarta",
    project_date: "2024-02-01",
    image_url: "/luxury-hotel-building-maintenance.jpg",
    tags: ["Maintenance", "Hotel", "Luxury"],
    is_featured: false,
  },
]

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "advertising" | "building_me">("all")
  const [showAll, setShowAll] = useState(false)

  const filteredPortfolios =
    activeCategory === "all" ? portfolios : portfolios.filter((portfolio) => portfolio.category === activeCategory)

  const displayedPortfolios = showAll ? filteredPortfolios : filteredPortfolios.slice(0, 6)

  return (
    <section id="portofolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Portofolio Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Proyek-Proyek yang Telah Kami Kerjakan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Lihat berbagai proyek sukses yang telah kami selesaikan dengan kualitas terbaik dan kepuasan klien yang
            tinggi.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl shadow-sm">
            <Button
              variant={activeCategory === "all" ? "default" : "ghost"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-gray-900 text-white" : ""}
            >
              Semua Proyek
            </Button>
            <Button
              variant={activeCategory === "advertising" ? "default" : "ghost"}
              onClick={() => setActiveCategory("advertising")}
              className={activeCategory === "advertising" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
            >
              Periklanan
            </Button>
            <Button
              variant={activeCategory === "building_me" ? "default" : "ghost"}
              onClick={() => setActiveCategory("building_me")}
              className={activeCategory === "building_me" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
            >
              Building ME
            </Button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedPortfolios.map((portfolio) => {
            const isAdvertising = portfolio.category === "advertising"

            return (
              <div
                key={portfolio.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={portfolio.image_url || "/placeholder.svg"}
                    alt={portfolio.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {portfolio.is_featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-white">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className={`${isAdvertising ? "bg-orange-500 text-white" : "bg-blue-500 text-white"}`}
                    >
                      {isAdvertising ? "Periklanan" : "Building ME"}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {portfolio.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{portfolio.description}</p>

                  {/* Client & Date */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{portfolio.client_name}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(portfolio.project_date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all bg-transparent"
                  >
                    Lihat Detail
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Load More Button */}
        {!showAll && filteredPortfolios.length > 6 && (
          <div className="text-center">
            <Button onClick={() => setShowAll(true)} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Lihat Semua Proyek ({filteredPortfolios.length - 6} lainnya)
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tertarik dengan Proyek Kami?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Konsultasikan kebutuhan proyek Anda dengan tim ahli kami untuk mendapatkan solusi terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Diskusi Proyek
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
              >
                Download Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
