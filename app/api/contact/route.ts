import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service_type, message } = body

    // Validate required fields
    if (!name || !email || !phone || !service_type || !message) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 })
    }

    // Validate phone format (Indonesian phone numbers)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
    if (!phoneRegex.test(phone.replace(/\s|-/g, ""))) {
      return NextResponse.json({ error: "Format nomor telepon tidak valid" }, { status: 400 })
    }

    const supabase = createClient()

    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone.replace(/\s|-/g, ""),
          company: company?.trim() || null,
          service_type,
          message: message.trim(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Gagal menyimpan data. Silakan coba lagi." }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.",
        data: data[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server. Silakan coba lagi." }, { status: 500 })
  }
}
