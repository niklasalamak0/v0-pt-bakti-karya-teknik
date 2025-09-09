"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  client_name: string
  client_position: string
  client_company: string
  testimonial: string
  rating: number
  avatar_url?: string
  service_category: "advertising" | "building_me" | "both"
  is_featured: boolean
}

// Sample data - in real app this would come from Supabase
const testimonials: Testimonial[] = [
  {
    id: "1",
    client_name: "Budi Santoso",
    client_position: "General Manager",
    client_company: "PT Maju Bersama",
    testimonial:
      "Pelayanan PT Bakti Karya Teknik sangat memuaskan. Signage yang dibuat berkualitas tinggi dan pemasangannya rapi. Tim mereka sangat profesional dan responsif terhadap kebutuhan kami.",
    rating: 5,
    service_category: "advertising",
    is_featured: true,
  },
  {
    id: "2",
    client_name: "Sari Dewi",
    client_position: "Owner",
    client_company: "Warung Sari Rasa",
    testimonial:
      "Neon box yang dibuat untuk warung saya sangat menarik dan membuat pelanggan lebih mudah menemukan lokasi. Harga juga terjangkau untuk UMKM seperti saya. Terima kasih BKT!",
    rating: 5,
    service_category: "advertising",
    is_featured: false,
  },
  {
    id: "3",
    client_name: "Ahmad Rahman",
    client_position: "Facility Manager",
    client_company: "Gedung Perkantoran Sudirman",
    testimonial:
      "Maintenance AC central gedung kami ditangani dengan sangat baik. Tim teknisi berpengalaman dan selalu siap 24/7 untuk emergency. Sangat recommended untuk building maintenance!",
    rating: 5,
    service_category: "building_me",
    is_featured: true,
  },
  {
    id: "4",
    client_name: "Linda Kusuma",
    client_position: "Property Manager",
    client_company: "Apartemen Green Valley",
    testimonial:
      "Sistem kelistrikan apartemen kami dipasang oleh PT Bakti Karya Teknik dengan standar yang tinggi. Tidak pernah ada masalah dan maintenance rutin selalu tepat waktu.",
    rating: 4,
    service_category: "building_me",
    is_featured: false,
  },
  {
    id: "5",
    client_name: "Rudi Hartono",
    client_position: "Marketing Director",
    client_company: "Bank Mandiri Syariah",
    testimonial:
      "Proyek branding untuk 25 cabang bank kami diselesaikan dengan sempurna. Dari signage hingga interior, semuanya konsisten dan berkualitas. Project management yang sangat baik!",
    rating: 5,
    service_category: "advertising",
    is_featured: true,
  },
  {
    id: "6",
    client_name: "Maya Sari",
    client_position: "Operations Manager",
    client_company: "Grand Hyatt Jakarta",
    testimonial:
      "Kontrak maintenance hotel kami dengan BKT sudah berjalan 2 tahun. Pelayanan sangat profesional, response time cepat, dan kualitas kerja yang konsisten. Highly recommended!",
    rating: 5,
    service_category: "building_me",
    is_featured: false,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<"all" | "advertising" | "building_me">("all")

  const filteredTestimonials =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.service_category === activeCategory || t.service_category === "both")

  const featuredTestimonials = filteredTestimonials.filter((t) => t.is_featured)
  const displayTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : filteredTestimonials.slice(0, 3)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
            Testimoni Klien
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Apa Kata Klien Tentang Layanan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Kepuasan klien adalah prioritas utama kami. Lihat apa yang mereka katakan tentang kualitas layanan dan
            profesionalisme tim kami.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-xl">
            <Button
              variant={activeCategory === "all" ? "default" : "ghost"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-white shadow-sm" : ""}
            >
              Semua
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

        {/* Featured Testimonial Carousel */}
        <div className="relative mb-16">
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <Quote className="w-12 h-12 text-orange-500 mx-auto mb-6" />

                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{displayTestimonials[currentIndex]?.testimonial}"
                </blockquote>

                <div className="flex justify-center mb-4">
                  {renderStars(displayTestimonials[currentIndex]?.rating || 5)}
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-lg text-gray-900">
                    {displayTestimonials[currentIndex]?.client_name}
                  </div>
                  <div className="text-gray-600">
                    {displayTestimonials[currentIndex]?.client_position} •{" "}
                    {displayTestimonials[currentIndex]?.client_company}
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      displayTestimonials[currentIndex]?.service_category === "advertising"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-blue-50 text-blue-700"
                    }
                  >
                    {displayTestimonials[currentIndex]?.service_category === "advertising"
                      ? "Layanan Periklanan"
                      : "Building ME"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          {displayTestimonials.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Dots Indicator */}
          {displayTestimonials.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.slice(0, 6).map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                  <Badge
                    variant="secondary"
                    className={
                      testimonial.service_category === "advertising"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-blue-50 text-blue-700"
                    }
                  >
                    {testimonial.service_category === "advertising" ? "Periklanan" : "Building ME"}
                  </Badge>
                </div>

                <blockquote className="text-gray-700 mb-4 leading-relaxed">"{testimonial.testimonial}"</blockquote>

                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.client_name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.client_position} • {testimonial.client_company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Bergabunglah dengan Klien Puas Kami</h3>
            <p className="text-lg text-gray-600 mb-6">
              Dapatkan layanan berkualitas tinggi dan pengalaman yang memuaskan seperti klien-klien kami
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Mulai Proyek Anda
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
