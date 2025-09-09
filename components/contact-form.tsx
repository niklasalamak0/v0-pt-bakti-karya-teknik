"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service_type: "advertising" | "building_me" | ""
  message: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_type: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim pesan")
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service_type: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      value: "+62 21 1234 5678",
      description: "Senin - Jumat, 08:00 - 17:00",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@baktikaryateknik.com",
      description: "Respon dalam 24 jam",
    },
    {
      icon: MapPin,
      title: "Alamat",
      value: "Jl. Industri Raya No. 123",
      description: "Jakarta Timur 13560",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      value: "08:00 - 17:00 WIB",
      description: "Emergency 24/7",
    },
  ]

  if (isSubmitted) {
    return (
      <section id="kontak" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-xl">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pesan Berhasil Dikirim!</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Terima kasih atas kepercayaan Anda. Tim kami akan segera menghubungi Anda dalam 24 jam untuk membahas
                  kebutuhan proyek Anda.
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Kirim Pesan Lain
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="kontak" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            Hubungi Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">Siap Memulai Proyek Anda?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Konsultasikan kebutuhan Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik untuk bisnis Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Konsultasi Gratis</CardTitle>
              <p className="text-gray-600">Isi form di bawah ini dan tim kami akan segera menghubungi Anda</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+62 812 3456 7890"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Nama Perusahaan</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="PT. Nama Perusahaan"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_type">Jenis Layanan *</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => handleInputChange("service_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis layanan yang dibutuhkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="advertising">Layanan Periklanan</SelectItem>
                      <SelectItem value="building_me">Building Mechanical Electrical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Ceritakan kebutuhan proyek Anda secara detail..."
                    rows={4}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isSubmitting ? (
                    "Mengirim..."
                  ) : (
                    <>
                      Kirim Pesan
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <IconComponent className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        <p className="text-gray-700">{info.value}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Map placeholder */}
            <Card className="overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Peta Lokasi</p>
                  <p className="text-sm text-gray-400">Jl. Industri Raya No. 123, Jakarta Timur</p>
                </div>
              </div>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-r from-orange-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4">Butuh Bantuan Segera?</h4>
                <p className="mb-4 opacity-90">
                  Hubungi kami langsung untuk konsultasi darurat atau pertanyaan mendesak
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-white text-orange-500 hover:bg-gray-100 flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Telepon Sekarang
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-orange-500 flex-1 bg-transparent"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
