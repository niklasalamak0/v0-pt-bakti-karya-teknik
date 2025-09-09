"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Megaphone, Star, Users, Award } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-orange-50 to-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-15"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Terpercaya Sejak 2010
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight text-balance">
                Solusi Terpadu <span className="text-orange-500">Periklanan</span> &{" "}
                <span className="text-blue-600">Building ME</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                Dari billboard yang menarik perhatian hingga sistem building yang handal. Kami menghadirkan solusi
                lengkap untuk kebutuhan bisnis Anda dengan kualitas terjamin dan layanan profesional.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">500+</div>
                <div className="text-sm text-gray-600">Proyek Selesai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">13+</div>
                <div className="text-sm text-gray-600">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">200+</div>
                <div className="text-sm text-gray-600">Klien Puas</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white group">
                Konsultasi Gratis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
              >
                Lihat Portofolio
              </Button>
            </div>
          </div>

          {/* Right content - Service highlights */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="grid gap-6">
              {/* Advertising Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Megaphone className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Layanan Periklanan</h3>
                    <p className="text-gray-600 mb-4">
                      Billboard, neon box, signage, dan branding profesional untuk meningkatkan visibilitas bisnis Anda.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">Billboard</span>
                      <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">Neon Box</span>
                      <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">Signage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Building ME Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Building2 className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Building Mechanical Electrical</h3>
                    <p className="text-gray-600 mb-4">
                      Instalasi AC, sistem kelistrikan, dan maintenance gedung dengan standar keamanan tinggi.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">AC System</span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">Electrical</span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Dipercaya oleh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">Sertifikat ISO 9001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
