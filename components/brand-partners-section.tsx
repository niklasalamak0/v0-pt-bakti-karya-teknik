import Image from "next/image"

interface BrandPartner {
  id: string
  name: string
  logo_url: string
  category: "client" | "partner" | "supplier"
}

// Sample data - in real app this would come from Supabase
const brandPartners: BrandPartner[] = [
  {
    id: "1",
    name: "PT Indofood Sukses Makmur",
    logo_url: "/placeholder.svg?height=80&width=120&text=Indofood",
    category: "client",
  },
  {
    id: "2",
    name: "Bank Mandiri",
    logo_url: "/placeholder.svg?height=80&width=120&text=Mandiri",
    category: "client",
  },
  {
    id: "3",
    name: "Tzu Chi Foundation",
    logo_url: "/placeholder.svg?height=80&width=120&text=Tzu+Chi",
    category: "client",
  },
  {
    id: "4",
    name: "Mitsubishi Electric",
    logo_url: "/placeholder.svg?height=80&width=120&text=Mitsubishi",
    category: "partner",
  },
  {
    id: "5",
    name: "Daikin",
    logo_url: "/placeholder.svg?height=80&width=120&text=Daikin",
    category: "partner",
  },
  {
    id: "6",
    name: "Schneider Electric",
    logo_url: "/placeholder.svg?height=80&width=120&text=Schneider",
    category: "partner",
  },
  {
    id: "7",
    name: "Panasonic",
    logo_url: "/placeholder.svg?height=80&width=120&text=Panasonic",
    category: "partner",
  },
  {
    id: "8",
    name: "LG Electronics",
    logo_url: "/placeholder.svg?height=80&width=120&text=LG",
    category: "partner",
  },
]

export function BrandPartnersSection() {
  const clients = brandPartners.filter((partner) => partner.category === "client")
  const partners = brandPartners.filter((partner) => partner.category === "partner")

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Partner & Klien
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Dipercaya oleh Perusahaan Terkemuka
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Kami bangga telah bekerja sama dengan berbagai perusahaan terkemuka dan menggunakan produk dari brand-brand
            ternama dunia.
          </p>
        </div>

        {/* Trusted Clients */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Klien Terpercaya</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center justify-center"
              >
                <Image
                  src={client.logo_url || "/placeholder.svg"}
                  alt={client.name}
                  width={120}
                  height={80}
                  className="max-w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Technology Partners */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Partner Teknologi</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-gray-50 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-center"
              >
                <Image
                  src={partner.logo_url || "/placeholder.svg"}
                  alt={partner.name}
                  width={100}
                  height={60}
                  className="max-w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">200+</div>
              <div className="text-gray-600">Klien Puas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">500+</div>
              <div className="text-gray-600">Proyek Selesai</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">13+</div>
              <div className="text-gray-600">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">25+</div>
              <div className="text-gray-600">Brand Partner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
