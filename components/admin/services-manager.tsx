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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Save, X, AlertTriangle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Service {
  id: string
  title: string
  description: string
  category: "advertising" | "building_me"
  icon: string
  features: string[]
  image_url?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

interface ServicesManagerProps {
  onDataChange: () => void
  isDatabaseReady?: boolean
}

export function ServicesManager({ onDataChange, isDatabaseReady = true }: ServicesManagerProps) {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "advertising" as "advertising" | "building_me",
    icon: "",
    features: [""],
    image_url: "",
    is_active: true,
    sort_order: 0,
  })

  useEffect(() => {
    if (isDatabaseReady) {
      loadServices()
    } else {
      setIsLoading(false)
    }
  }, [isDatabaseReady])

  const loadServices = async () => {
    if (!isDatabaseReady) {
      setError("Database belum siap. Silakan jalankan script database terlebih dahulu.")
      setIsLoading(false)
      return
    }

    try {
      setError(null)
      const supabase = createClient()
      const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error loading services:", error)
      setError("Gagal memuat data layanan. Pastikan database sudah dikonfigurasi dengan benar.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "advertising",
      icon: "",
      features: [""],
      image_url: "",
      is_active: true,
      sort_order: 0,
    })
    setEditingService(null)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      icon: service.icon,
      features: service.features,
      image_url: service.image_url || "",
      is_active: service.is_active,
      sort_order: service.sort_order,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isDatabaseReady) {
      setError("Database belum siap. Silakan jalankan script database terlebih dahulu.")
      return
    }

    try {
      setError(null)
      const supabase = createClient()
      const serviceData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ""),
        updated_at: new Date().toISOString(),
      }

      if (editingService) {
        const { error } = await supabase.from("services").update(serviceData).eq("id", editingService.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("services").insert(serviceData)
        if (error) throw error
      }

      await loadServices()
      onDataChange()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving service:", error)
      setError("Gagal menyimpan layanan. Pastikan database sudah dikonfigurasi dengan benar.")
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return

    if (!isDatabaseReady) {
      setError("Database belum siap. Silakan jalankan script database terlebih dahulu.")
      return
    }

    try {
      setError(null)
      const supabase = createClient()
      const { error } = await supabase.from("services").delete().eq("id", id)

      if (error) throw error

      await loadServices()
      onDataChange()
    } catch (error) {
      console.error("Error deleting service:", error)
      setError("Gagal menghapus layanan. Pastikan database sudah dikonfigurasi dengan benar.")
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

  if (!isDatabaseReady) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Database belum dikonfigurasi. Silakan jalankan script database terlebih dahulu untuk menggunakan fitur
              ini.
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
          <div className="text-center">Loading services...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manajemen Layanan ({services.length})</CardTitle>
          {isDatabaseReady && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Layanan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingService ? "Edit Layanan" : "Tambah Layanan Baru"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul Layanan</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon (Lucide React)</Label>
                      <Input
                        id="icon"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        placeholder="e.g., Lightbulb, Settings"
                      />
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

                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL Gambar (Opsional)</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
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

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Aktif</Label>
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
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urutan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        service.category === "advertising"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {service.category === "advertising" ? "Periklanan" : "Building ME"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.is_active ? "default" : "secondary"}>
                      {service.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>{service.sort_order}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteService(service.id)}
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

        {services.length === 0 && <div className="text-center py-8 text-gray-500">Belum ada layanan</div>}
      </CardContent>
    </Card>
  )
}
