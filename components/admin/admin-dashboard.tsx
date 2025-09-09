"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MessageSquare,
  Briefcase,
  Star,
  DollarSign,
  Building2,
  LogOut,
  Download,
  BarChart3,
  AlertTriangle,
  Database,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ContactsManager } from "./contacts-manager"
import { ServicesManager } from "./services-manager"
import { PortfoliosManager } from "./portfolios-manager"
import { TestimonialsManager } from "./testimonials-manager"
import { PricingManager } from "./pricing-manager"
import { PartnersManager } from "./partners-manager"

interface DashboardStats {
  totalContacts: number
  totalServices: number
  totalPortfolios: number
  totalTestimonials: number
  totalPricingPackages: number
  totalPartners: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalServices: 0,
    totalPortfolios: 0,
    totalTestimonials: 0,
    totalPricingPackages: 0,
    totalPartners: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isDatabaseReady, setIsDatabaseReady] = useState(false)
  const [databaseError, setDatabaseError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkDatabaseSetup()
  }, [])

  const checkDatabaseSetup = async () => {
    try {
      const supabase = createClient()

      const { data, error } = await supabase.from("contacts").select("id").limit(1)

      if (error && error.message.includes("does not exist")) {
        setIsDatabaseReady(false)
        setDatabaseError("Database tables belum dibuat. Silakan jalankan script database terlebih dahulu.")
      } else {
        setIsDatabaseReady(true)
        loadStats()
      }
    } catch (error) {
      console.error("Error checking database:", error)
      setIsDatabaseReady(false)
      setDatabaseError("Gagal mengecek status database.")
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    if (!isDatabaseReady) return

    try {
      const supabase = createClient()

      const [
        { count: contactsCount },
        { count: servicesCount },
        { count: portfoliosCount },
        { count: testimonialsCount },
        { count: pricingCount },
        { count: partnersCount },
      ] = await Promise.all([
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("portfolios").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("pricing_packages").select("*", { count: "exact", head: true }),
        supabase.from("brand_partners").select("*", { count: "exact", head: true }),
      ])

      setStats({
        totalContacts: contactsCount || 0,
        totalServices: servicesCount || 0,
        totalPortfolios: portfoliosCount || 0,
        totalTestimonials: testimonialsCount || 0,
        totalPricingPackages: pricingCount || 0,
        totalPartners: partnersCount || 0,
      })
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const exportAllData = async () => {
    try {
      const supabase = createClient()

      const [
        { data: contacts },
        { data: services },
        { data: portfolios },
        { data: testimonials },
        { data: pricing },
        { data: partners },
      ] = await Promise.all([
        supabase.from("contacts").select("*"),
        supabase.from("services").select("*"),
        supabase.from("portfolios").select("*"),
        supabase.from("testimonials").select("*"),
        supabase.from("pricing_packages").select("*"),
        supabase.from("brand_partners").select("*"),
      ])

      const allData = {
        contacts: contacts || [],
        services: services || [],
        portfolios: portfolios || [],
        testimonials: testimonials || [],
        pricing_packages: pricing || [],
        brand_partners: partners || [],
        exported_at: new Date().toISOString(),
      }

      const dataStr = JSON.stringify(allData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `bkt-data-export-${new Date().toISOString().split("T")[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting data:", error)
    }
  }

  const exportToCSV = async () => {
    try {
      const supabase = createClient()
      const { data: contacts } = await supabase.from("contacts").select("*")

      if (!contacts || contacts.length === 0) {
        alert("Tidak ada data kontak untuk diekspor")
        return
      }

      const headers = ["ID", "Nama", "Email", "Telepon", "Perusahaan", "Layanan", "Pesan", "Tanggal"]
      const csvContent = [
        headers.join(","),
        ...contacts.map((contact) =>
          [
            contact.id,
            `"${contact.name}"`,
            contact.email,
            contact.phone,
            `"${contact.company || ""}"`,
            `"${contact.service}"`,
            `"${contact.message.replace(/"/g, '""')}"`,
            new Date(contact.created_at).toLocaleDateString("id-ID"),
          ].join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `bkt-contacts-${new Date().toISOString().split("T")[0]}.csv`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting CSV:", error)
    }
  }

  const statsCards = [
    {
      title: "Total Kontak",
      value: stats.totalContacts,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Layanan",
      value: stats.totalServices,
      icon: Briefcase,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Portofolio",
      value: stats.totalPortfolios,
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Testimoni",
      value: stats.totalTestimonials,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Paket Harga",
      value: stats.totalPricingPackages,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Partner",
      value: stats.totalPartners,
      icon: Building2,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isDatabaseReady) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 text-white p-2 rounded-lg font-bold">BKT</div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">PT. Bakti Karya Teknik</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <div className="space-y-4">
                <p className="font-semibold">Database Belum Siap</p>
                <p>{databaseError}</p>

                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    Langkah Setup Database:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Scroll ke bawah halaman ini untuk menemukan tombol "Run Script"</li>
                    <li>
                      Jalankan script{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded">scripts/001_create_tables.sql</code>
                    </li>
                    <li>
                      Kemudian jalankan script{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded">scripts/002_insert_initial_data.sql</code>
                    </li>
                    <li>Refresh halaman ini setelah script berhasil dijalankan</li>
                  </ol>
                </div>

                <Button onClick={checkDatabaseSetup} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Cek Ulang Database
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 text-white p-2 rounded-lg font-bold">BKT</div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">PT. Bakti Karya Teknik</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={exportAllData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statsCards.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="contacts">Kontak</TabsTrigger>
            <TabsTrigger value="services">Layanan</TabsTrigger>
            <TabsTrigger value="portfolios">Portofolio</TabsTrigger>
            <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
            <TabsTrigger value="pricing">Harga</TabsTrigger>
            <TabsTrigger value="partners">Partner</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <ContactsManager onDataChange={loadStats} isDatabaseReady={isDatabaseReady} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager onDataChange={loadStats} isDatabaseReady={isDatabaseReady} />
          </TabsContent>

          <TabsContent value="portfolios">
            <PortfoliosManager onDataChange={loadStats} isDatabaseReady={isDatabaseReady} />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager onDataChange={loadStats} isDatabaseReady={isDatabaseReady} />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingManager onDataChange={loadStats} isDatabaseReady={isDatabaseReady} />
          </TabsContent>

          <TabsContent value="partners">
            <PartnersManager onDataChange={loadStats} isDatabaseReady={isDatabaseReady} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
