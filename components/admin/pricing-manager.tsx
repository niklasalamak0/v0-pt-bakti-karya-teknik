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
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface PricingPackage {
  id: string
  name: string
  category: "advertising" | "building_me"
  price_range: string
  description: string
  features: string[]
  is_popular: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

interface PricingManagerProps {
  onDataChange: () => void
}

export function PricingManager({ onDataChange }: PricingManagerProps) {
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    category: "advertising" as "advertising" | "building_me",
    price_range: "",
    description: "",
    features: [""],
    is_popular: false,
    is_active: true,
    sort_order: 0,
  })

  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("pricing_packages")
        .select("*")
        .order("sort_order", { ascending: true })

      if (error) throw error
      setPackages(data || [])
    } catch (error) {
      console.error("Error loading packages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "advertising",
      price_range: "",
      description: "",
      features: [""],
      is_popular: false,
      is_active: true,
      sort_order: 0,
    })
    setEditingPackage(null)
  }

  const handleEdit = (pkg: PricingPackage) => {
    setEditingPackage(pkg)
    setFormData({
      name: pkg.name,
      category: pkg.category,
      price_range: pkg.price_range,
      description: pkg.description || "",
      features: pkg.features,
      is_popular: pkg.is_popular,
      is_active: pkg.is_active,
      sort_order: pkg.sort_order,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const supabase = createClient()
      const packageData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ""),
        updated_at: new Date().toISOString(),
      }

      if (editingPackage) {
        const { error } = await supabase.from("pricing_packages").update(packageData).eq("id", editingPackage.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("pricing_packages").insert(packageData)
        if (error) throw error
      }

      await loadPackages()
      onDataChange()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving package:", error)
    }
  }

  const deletePackage = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket ini?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("pricing_packages").delete().eq("id", id)

      if (error) throw error

      await loadPackages()
      onDataChange()
    } catch (error) {
      console.error("Error deleting package:", error)
    }
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading packages...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manajemen Paket Harga ({packages.length})</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Paket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPackage ? "Edit Paket" : "Tambah Paket Baru"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Paket</Label>
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
                      onValueChange={(value: "advertising" | "building_me") =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advertising">Periklanan</SelectItem>
                        <SelectItem value="building_me">Building ME</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price_range">Range Harga</Label>
                  <Input
                    id="price_range"
                    value={formData.price_range}
                    onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                    placeholder="Rp 5.000.000 - 15.000.000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fitur-fitur</Label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Fitur ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addFeature}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Fitur
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_popular"
                      checked={formData.is_popular}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked })}
                    />
                    <Label htmlFor="is_popular">Populer</Label>
                  </div>
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
                <TableHead>Nama Paket</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Populer</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        pkg.category === "advertising" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                      }
                    >
                      {pkg.category === "advertising" ? "Periklanan" : "Building ME"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{pkg.price_range}</TableCell>
                  <TableCell>
                    <Badge variant={pkg.is_active ? "default" : "secondary"}>
                      {pkg.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pkg.is_popular ? "default" : "secondary"}>{pkg.is_popular ? "Ya" : "Tidak"}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePackage(pkg.id)}
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

        {packages.length === 0 && <div className="text-center py-8 text-gray-500">Belum ada paket harga</div>}
      </CardContent>
    </Card>
  )
}
