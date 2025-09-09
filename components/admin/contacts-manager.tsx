"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, Download, Search, Filter, Trash2, AlertTriangle, RefreshCw } from "lucide-react"
import { createAdminClient, debugTableStatus, refreshSchemaCache } from "@/lib/supabase/admin-client"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  service_type: "advertising" | "building_me"
  message: string
  created_at: string
}

interface ContactsManagerProps {
  onDataChange: () => void
  isDatabaseReady: boolean
}

export function ContactsManager({ onDataChange, isDatabaseReady }: ContactsManagerProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState<"all" | "advertising" | "building_me">("all")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDebugging, setIsDebugging] = useState(false)

  useEffect(() => {
    if (isDatabaseReady) {
      loadContacts()
    } else {
      setIsLoading(false)
    }
  }, [isDatabaseReady])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, serviceFilter])

  const loadContacts = async () => {
    if (!isDatabaseReady) {
      setError("Database belum siap. Silakan jalankan script database terlebih dahulu.")
      setIsLoading(false)
      return
    }

    try {
      setError(null)
      const supabase = createAdminClient()
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Contacts loading error:", error)
        if (error.message.includes("does not exist") || error.message.includes("schema cache")) {
          setError("Tabel contacts belum dibuat. Silakan jalankan script database.")
        } else {
          throw error
        }
        return
      }
      setContacts(data || [])
      console.log("[v0] Contacts loaded successfully:", data?.length || 0)
    } catch (error) {
      console.error("[v0] Error loading contacts:", error)
      setError("Gagal memuat data kontak.")
    } finally {
      setIsLoading(false)
    }
  }

  const filterContacts = () => {
    let filtered = contacts

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.company.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (serviceFilter !== "all") {
      filtered = filtered.filter((contact) => contact.service_type === serviceFilter)
    }

    setFilteredContacts(filtered)
  }

  const deleteContact = async (id: string) => {
    if (!isDatabaseReady) {
      alert("Database belum siap")
      return
    }

    if (!confirm("Apakah Anda yakin ingin menghapus kontak ini?")) return

    try {
      const supabase = createAdminClient()
      const { error } = await supabase.from("contacts").delete().eq("id", id)

      if (error) throw error

      await loadContacts()
      onDataChange()
      console.log("[v0] Contact deleted successfully:", id)
    } catch (error) {
      console.error("[v0] Error deleting contact:", error)
      alert("Gagal menghapus kontak")
    }
  }

  const exportContacts = () => {
    const csvContent = [
      ["Nama", "Email", "Telepon", "Perusahaan", "Jenis Layanan", "Pesan", "Tanggal"],
      ...filteredContacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone,
        contact.company,
        contact.service_type === "advertising" ? "Periklanan" : "Building ME",
        contact.message,
        new Date(contact.created_at).toLocaleDateString("id-ID"),
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `contacts-${new Date().toISOString().split("T")[0]}.csv`)
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDebugTables = async () => {
    setIsDebugging(true)
    try {
      console.log("[v0] Starting table debug check...")
      const tableStatus = await debugTableStatus()
      console.log("[v0] Table status:", tableStatus)

      await refreshSchemaCache()
      await loadContacts()

      alert(`Debug selesai. Cek console untuk detail.\nContacts table: ${tableStatus.contacts ? "✓" : "✗"}`)
    } catch (error) {
      console.error("[v0] Debug failed:", error)
      alert("Debug gagal. Cek console untuk detail.")
    } finally {
      setIsDebugging(false)
    }
  }

  if (!isDatabaseReady) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Database belum siap. Silakan jalankan script database terlebih dahulu untuk melihat data kontak.
              <div className="mt-2">
                <Button
                  onClick={handleDebugTables}
                  disabled={isDebugging}
                  size="sm"
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                >
                  {isDebugging ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Debugging...
                    </>
                  ) : (
                    "Debug Tables"
                  )}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading contacts...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
              <div className="mt-2 space-x-2">
                <Button onClick={loadContacts} size="sm">
                  Coba Lagi
                </Button>
                <Button onClick={handleDebugTables} disabled={isDebugging} size="sm" variant="outline">
                  {isDebugging ? "Debugging..." : "Debug Tables"}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manajemen Kontak ({filteredContacts.length})</CardTitle>
          <Button onClick={exportContacts} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama, email, atau perusahaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={serviceFilter} onValueChange={(value: any) => setServiceFilter(value)}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Layanan</SelectItem>
              <SelectItem value="advertising">Periklanan</SelectItem>
              <SelectItem value="building_me">Building ME</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        contact.service_type === "advertising"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {contact.service_type === "advertising" ? "Periklanan" : "Building ME"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(contact.created_at).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedContact(contact)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detail Kontak</DialogTitle>
                          </DialogHeader>
                          {selectedContact && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Nama</label>
                                  <p className="text-gray-900">{selectedContact.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Email</label>
                                  <p className="text-gray-900">{selectedContact.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Telepon</label>
                                  <p className="text-gray-900">{selectedContact.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Perusahaan</label>
                                  <p className="text-gray-900">{selectedContact.company || "-"}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Jenis Layanan</label>
                                <p className="text-gray-900">
                                  {selectedContact.service_type === "advertising" ? "Periklanan" : "Building ME"}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Pesan</label>
                                <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Tanggal</label>
                                <p className="text-gray-900">
                                  {new Date(selectedContact.created_at).toLocaleString("id-ID")}
                                </p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteContact(contact.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || serviceFilter !== "all" ? "Tidak ada kontak yang sesuai filter" : "Belum ada kontak"}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
