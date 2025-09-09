import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "PT. Bakti Karya Teknik - Solusi Terpadu Periklanan & Building ME",
  description:
    "Perusahaan terpercaya untuk layanan periklanan (billboard, neon box, signage) dan building mechanical electrical (AC, listrik, maintenance) di Jakarta dan sekitarnya.",
  generator: "v0.app",
  keywords: "periklanan, billboard, neon box, signage, building maintenance, AC, electrical, mechanical, Jakarta",
  authors: [{ name: "PT. Bakti Karya Teknik" }],
  openGraph: {
    title: "PT. Bakti Karya Teknik - Solusi Terpadu Periklanan & Building ME",
    description: "Perusahaan terpercaya untuk layanan periklanan dan building mechanical electrical di Jakarta",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
