"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Building2, Megaphone, Mail } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/admin")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    if (!email) {
      setError("Masukkan email terlebih dahulu")
      return
    }

    const supabase = createClient()
    setIsResending(true)
    setResendMessage(null)
    setError(null)

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      })

      if (error) throw error
      setResendMessage("Email konfirmasi telah dikirim ulang. Silakan cek inbox Anda.")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Gagal mengirim email konfirmasi")
    } finally {
      setIsResending(false)
    }
  }

  const isEmailNotConfirmed = error?.toLowerCase().includes("email not confirmed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-orange-500 text-white p-3 rounded-xl">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-xl">
              <Megaphone className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PT. Bakti Karya Teknik</h1>
          <p className="text-gray-600">Admin Dashboard</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login Admin</CardTitle>
            <CardDescription className="text-center">Masuk ke dashboard admin untuk mengelola website</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@baktikaryateknik.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {resendMessage && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-700">{resendMessage}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                {isEmailNotConfirmed && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                    onClick={handleResendConfirmation}
                    disabled={isResending}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {isResending ? "Mengirim..." : "Kirim Ulang Email Konfirmasi"}
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              {isEmailNotConfirmed && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>Email belum dikonfirmasi!</strong>
                  </p>
                  <p className="text-xs text-blue-600">
                    Cek inbox email Anda untuk link konfirmasi, atau klik tombol "Kirim Ulang" di atas.
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-600 mb-2">
                Belum punya akun admin?{" "}
                <Link href="/auth/signup" className="text-orange-500 hover:text-orange-600 font-medium">
                  Daftar di sini
                </Link>
              </p>
              <Link href="/" className="text-sm text-orange-500 hover:text-orange-600">
                ← Kembali ke Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
