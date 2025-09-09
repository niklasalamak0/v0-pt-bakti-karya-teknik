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
import { Plus, Edit, Trash2, Save, Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Testimonial {
  id: string
  client_name: string
  client_position: string
  client_company: string
  testimonial: string
  rating: number
  avatar_url?: string
  service_category: "advertising" | "building_me" | "both"
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface TestimonialsManagerProps {
  onDataChange: () => void
}

export function TestimonialsManager({ onDataChange }: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    client_name: "",
    client_position: "",
    client_company: "",
    testimonial: "",
    rating: 5,
    avatar_url: "",
    service_category: "advertising" as "advertising" | "building_me" | "both",
    is_featured: false,
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error("Error loading testimonials:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      client_name: "",
      client_position: "",
      client_company: "",
      testimonial: "",
      rating: 5,
      avatar_url: "",
      service_category: "advertising",
      is_featured: false,
    })
    setEditingTestimonial(null)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      client_name: testimonial.client_name,
      client_position: testimonial.client_position,
      client_company: testimonial.client_company,
      testimonial: testimonial.testimonial,
      rating: testimonial.rating,
      avatar_url: testimonial.avatar_url || "",
      service_category: testimonial.service_category,
      is_featured: testimonial.is_featured,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const supabase = createClient()
      const testimonialData = {
        ...formData,
        updated_at: new Date().toISOString(),
      }

      if (editingTestimonial) {
        const { error } = await supabase.from("testimonials").update(testimonialData).eq("id", editingTestimonial.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("testimonials").insert(testimonialData)
        if (error) throw error
      }

      await loadTestimonials()
      onDataChange()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving testimonial:", error)
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("testimonials").delete().eq("id", id)

      if (error) throw error

      await loadTestimonials()
      onDataChange()
    } catch (error) {
      console.error("Error deleting testimonial:", error)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading testimonials...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manajemen Testimoni ({testimonials.length})</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Testimoni
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? "Edit Testimoni" : "Tambah Testimoni Baru"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Label htmlFor="client_position">Posisi</Label>
                    <Input
                      id="client_position"
                      value={formData.client_position}
                      onChange={(e) => setFormData({ ...formData, client_position: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_company">Nama Perusahaan</Label>
                  <Input
                    id="client_company"
                    value={formData.client_company}
                    onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testimonial">Testimoni</Label>
                  <Textarea
                    id="testimonial"
                    value={formData.testimonial}
                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Select
                      value={formData.rating.toString()}
                      onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bintang</SelectItem>
                        <SelectItem value="2">2 Bintang</SelectItem>
                        <SelectItem value="3">3 Bintang</SelectItem>
                        <SelectItem value="4">4 Bintang</SelectItem>
                        <SelectItem value="5">5 Bintang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service_category">Kategori Layanan</Label>
                    <Select
                      value={formData.service_category}
                      onValueChange={(value: "advertising" | "building_me" | "both") =>
                        setFormData({ ...formData, service_category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advertising">Periklanan</SelectItem>
                        <SelectItem value="building_me">Building ME</SelectItem>
                        <SelectItem value="both">Keduanya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar_url">URL Avatar (Opsional)</Label>
                  <Input
                    id="avatar_url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
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
                <TableHead>Klien</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.client_name}</TableCell>
                  <TableCell>{testimonial.client_company}</TableCell>
                  <TableCell>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        testimonial.service_category === "advertising"
                          ? "bg-orange-100 text-orange-700"
                          : testimonial.service_category === "building_me"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                      }
                    >
                      {testimonial.service_category === "advertising"
                        ? "Periklanan"
                        : testimonial.service_category === "building_me"
                          ? "Building ME"
                          : "Keduanya"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={testimonial.is_featured ? "default" : "secondary"}>
                      {testimonial.is_featured ? "Ya" : "Tidak"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTestimonial(testimonial.id)}
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

        {testimonials.length === 0 && <div className="text-center py-8 text-gray-500">Belum ada testimoni</div>}
      </CardContent>
    </Card>
  )
}
