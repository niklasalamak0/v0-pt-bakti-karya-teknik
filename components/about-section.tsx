import { CheckCircle, Target, Eye, Heart } from "lucide-react"

export function AboutSection() {
  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                Tentang Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
                Menghadirkan Solusi Terbaik untuk Bisnis Anda
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed text-pretty">
                PT. Bakti Karya Teknik adalah perusahaan yang telah berpengalaman lebih dari 13 tahun dalam memberikan
                solusi terpadu di bidang periklanan dan building mechanical electrical. Kami berkomitmen untuk
                memberikan layanan berkualitas tinggi dengan teknologi terdepan dan tim profesional yang berpengalaman.
              </p>
            </div>

            {/* Key points */}
            <div className="space-y-4">
              {[
                "Tim profesional bersertifikat dan berpengalaman",
                "Menggunakan material dan teknologi berkualitas tinggi",
                "Layanan maintenance dan garansi terpercaya",
                "Harga kompetitif dengan kualitas terjamin",
              ].map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Values */}
          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Target className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Misi Kami</h3>
                  <p className="text-gray-600">
                    Memberikan solusi terpadu periklanan dan building ME yang inovatif, berkualitas tinggi, dan
                    terpercaya untuk mendukung kesuksesan bisnis klien.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visi Kami</h3>
                  <p className="text-gray-600">
                    Menjadi perusahaan terdepan di Indonesia dalam bidang periklanan dan building mechanical electrical
                    dengan standar internasional.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Heart className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Komitmen Kami</h3>
                  <p className="text-gray-600">
                    Mengutamakan kepuasan klien dengan memberikan layanan terbaik, tepat waktu, dan sesuai dengan
                    kebutuhan spesifik setiap proyek.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
