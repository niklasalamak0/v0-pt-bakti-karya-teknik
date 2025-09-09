"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Save } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface BrandPartner {
  id: string
  name: string
  logo_url: string
  website_url?: string
  description?: string
  category: "client" | "partner" | "supplier"
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

interface PartnersManagerProps {
  onDataChange: () => void
}

export function PartnersManager({ onDataChange }: PartnersManagerProps) {
  const [partners, setPartners] = useState<BrandPartner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPartner, setEditingPartner] = useState<BrandPartner | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    website_url: "",
    description: "",
    category: "client" as "client" | "partner" | "supplier",
    is_active: true,
    sort_order: 0,
  })

  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("brand_partners").select("*").order("sort_order", { ascending: true })

      if (error) throw error
      setPartners(data || [])
    } catch (error) {
      console.error("Error loading partners:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      logo_url: "",
      website_url: "",
      description: "",
      category: "client",
      is_active: true,
      sort_order: 0,
    })
    setEditingPartner(null)
  }

  const handleEdit = (partner: BrandPartner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url,
      website_url: partner.website_url || "",
      description: partner.description || "",
      category: partner.category,
      is_active: partner.is_active,
      sort_order: partner.sort_order,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const supabase = createClient()
      const partnerData = {
        ...formData,
        updated_at: new Date().toISOString(),
      }

      if (editingPartner) {
        const { error } = await supabase.from("brand_partners").update(partnerData).eq("id", editingPartner.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("brand_partners").insert(partnerData)
        if (error) throw error
      }

      await loadPartners()
      onDataChange()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving partner:", error)
    }
  }

  const deletePartner = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus partner ini?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("brand_partners").delete().eq("id", id)

      if (error) throw error

      await loadPartners()
      onDataChange()
    } catch (error) {
      console.error("Error deleting partner:", error)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading partners...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manajemen Partner ({partners.length})</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingPartner ? "Edit Partner" : "Tambah Partner Baru"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Partner</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: "client" | "partner" | "supplier") =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Klien</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="supplier">Supplier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo_url">URL Logo</Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_url">URL Website (Opsional)</Label>
                  <Input
                    id="website_url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi (Opsional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Aktif</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urutan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        partner.category === "client"
                          ? "bg-green-100 text-green-700"
                          : partner.category === "partner"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                      }
                    >
                      {partner.category === "client"
                        ? "Klien"
                        : partner.category === "partner"
                          ? "Partner"
                          : "Supplier"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={partner.is_active ? "default" : "secondary"}>
                      {partner.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>{partner.sort_order}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(partner)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePartner(partner.id)}
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

        {partners.length === 0 && <div className="text-center py-8 text-gray-500">Belum ada partner</div>}
      </CardContent>
    </Card>
  )
}
