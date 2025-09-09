import { CheckCircle, MessageSquare, FileText, Wrench, ThumbsUp } from "lucide-react"

const workflowSteps = [
  {
    icon: MessageSquare,
    title: "Konsultasi & Analisis",
    description: "Diskusi kebutuhan, survey lokasi, dan analisis teknis untuk menentukan solusi terbaik",
    details: ["Konsultasi gratis", "Survey lokasi", "Analisis kebutuhan", "Estimasi biaya"],
  },
  {
    icon: FileText,
    title: "Perencanaan & Desain",
    description: "Pembuatan desain detail, RAB, dan timeline proyek yang sesuai dengan kebutuhan klien",
    details: ["Desain 3D/2D", "RAB detail", "Timeline proyek", "Material specification"],
  },
  {
    icon: Wrench,
    title: "Eksekusi & Instalasi",
    description: "Pelaksanaan proyek dengan tim profesional, material berkualitas, dan standar keamanan tinggi",
    details: ["Tim berpengalaman", "Material berkualitas", "Safety standard", "Progress monitoring"],
  },
  {
    icon: ThumbsUp,
    title: "Testing & Handover",
    description: "Testing sistem, training penggunaan, handover proyek, dan garansi layanan",
    details: ["System testing", "User training", "Dokumentasi lengkap", "Garansi resmi"],
  },
]

export function WorkflowSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            Cara Kerja Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Proses Kerja yang Terstruktur dan Profesional
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Kami menggunakan metodologi yang terbukti untuk memastikan setiap proyek berjalan lancar dan hasil yang
            memuaskan sesuai ekspektasi klien.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="h-0.5 bg-gradient-to-r from-orange-200 via-blue-200 to-green-200"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon
              const colors = [
                "bg-orange-100 text-orange-500",
                "bg-blue-100 text-blue-500",
                "bg-purple-100 text-purple-500",
                "bg-green-100 text-green-500",
              ]

              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 rounded-full ${colors[index]} flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Siap Memulai Proyek Anda?</h3>
          <p className="text-lg mb-6 opacity-90">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi terbaik untuk kebutuhan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Mulai Konsultasi
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors">
              Hubungi WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
