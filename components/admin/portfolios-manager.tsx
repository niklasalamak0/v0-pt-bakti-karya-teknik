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
import { ImageUpload } from "./image-upload"

interface Portfolio {
  id: string
  title: string
  description: string
  category: "advertising" | "building_me"
  client_name: string
  project_date: string
  image_url: string
  thumbnail_url?: string
  tags: string[]
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

interface PortfoliosManagerProps {
  onDataChange: () => void
  isDatabaseReady: boolean
}

export function PortfoliosManager({ onDataChange, isDatabaseReady }: PortfoliosManagerProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "advertising" as "advertising" | "building_me",
    client_name: "",
    project_date: "",
    image_url: "",
    thumbnail_url: "",
    tags: [""],
    is_featured: false,
    sort_order: 0,
  })

  useEffect(() => {
    if (isDatabaseReady) {
      loadPortfolios()
    } else {
      setIsLoading(false)
    }
  }, [isDatabaseReady])

  const loadPortfolios = async () => {
    if (!isDatabaseReady) {
      setError("Database belum siap. Silakan jalankan script database terlebih dahulu.")
      setIsLoading(false)
      return
    }

    try {
      setError(null)
      const supabase = createClient()
      const { data, error } = await supabase.from("portfolios").select("*").order("sort_order", { ascending: true })

      if (error) {
        if (error.message.includes("does not exist")) {
          setError("Tabel portfolios belum dibuat. Silakan jalankan script database.")
        } else {
          throw error
        }
        return
      }
      setPortfolios(data || [])
    } catch (error) {
      console.error("Error loading portfolios:", error)
      setError("Gagal memuat data portofolio.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "advertising",
      client_name: "",
      project_date: "",
      image_url: "",
      thumbnail_url: "",
      tags: [""],
      is_featured: false,
      sort_order: 0,
    })
    setEditingPortfolio(null)
  }

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio)
    setFormData({
      title: portfolio.title,
      description: portfolio.description || "",
      category: portfolio.category,
      client_name: portfolio.client_name,
      project_date: portfolio.project_date,
      image_url: portfolio.image_url,
      thumbnail_url: portfolio.thumbnail_url || "",
      tags: portfolio.tags,
      is_featured: portfolio.is_featured,
      sort_order: portfolio.sort_order,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isDatabaseReady) {
      alert("Database belum siap")
      return
    }

    try {
      const supabase = createClient()
      const portfolioData = {
        ...formData,
        tags: formData.tags.filter((t) => t.trim() !== ""),
        updated_at: new Date().toISOString(),
      }

      if (editingPortfolio) {
        const { error } = await supabase.from("portfolios").update(portfolioData).eq("id", editingPortfolio.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("portfolios").insert(portfolioData)
        if (error) throw error
      }

      await loadPortfolios()
      onDataChange()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving portfolio:", error)
      alert("Gagal menyimpan portofolio")
    }
  }

  const deletePortfolio = async (id: string) => {
    if (!isDatabaseReady) {
      alert("Database belum siap")
      return
    }

    if (!confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("portfolios").delete().eq("id", id)

      if (error) throw error

      await loadPortfolios()
      onDataChange()
    } catch (error) {
      console.error("Error deleting portfolio:", error)
      alert("Gagal menghapus portofolio")
    }
  }

  const updateTag = (index: number, value: string) => {
    const newTags = [...formData.tags]
    newTags[index] = value
    setFormData({ ...formData, tags: newTags })
  }

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ""] })
  }

  const removeTag = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index)
    setFormData({ ...formData, tags: newTags })
  }

  if (!isDatabaseReady) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Database belum siap. Silakan jalankan script database terlebih dahulu untuk mengelola portofolio.
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
          <div className="text-center">Loading portfolios...</div>
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
              <Button onClick={loadPortfolios} className="ml-4" size="sm">
                Coba Lagi
              </Button>
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
          <CardTitle>Manajemen Portofolio ({portfolios.length})</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Portofolio
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPortfolio ? "Edit Portofolio" : "Tambah Portofolio Baru"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Proyek</Label>
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
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Nama Klien</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project_date">Tanggal Proyek</Label>
                    <Input
                      id="project_date"
                      type="date"
                      value={formData.project_date}
                      onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <ImageUpload
                  label="Gambar Utama"
                  value={formData.image_url}
                  onChange={(value) => setFormData({ ...formData, image_url: value })}
                />

                <ImageUpload
                  label="Thumbnail (Opsional)"
                  value={formData.thumbnail_url}
                  onChange={(value) => setFormData({ ...formData, thumbnail_url: value })}
                />

                <div className="space-y-2">
                  <Label>Tags</Label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        placeholder={`Tag ${index + 1}`}
                      />
                      {formData.tags.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeTag(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Tag
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
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
                <TableHead>Judul</TableHead>
                <TableHead>Klien</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolios.map((portfolio) => (
                <TableRow key={portfolio.id}>
                  <TableCell className="font-medium">{portfolio.title}</TableCell>
                  <TableCell>{portfolio.client_name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        portfolio.category === "advertising"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {portfolio.category === "advertising" ? "Periklanan" : "Building ME"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={portfolio.is_featured ? "default" : "secondary"}>
                      {portfolio.is_featured ? "Ya" : "Tidak"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(portfolio.project_date).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(portfolio)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePortfolio(portfolio.id)}
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

        {portfolios.length === 0 && <div className="text-center py-8 text-gray-500">Belum ada portofolio</div>}
      </CardContent>
    </Card>
  )
}
