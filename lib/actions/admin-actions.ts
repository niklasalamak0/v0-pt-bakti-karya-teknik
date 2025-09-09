"use server"

import { createAdminClient } from "@/lib/supabase/admin-client"
import { revalidatePath } from "next/cache"

// Contacts Actions
export async function getContacts() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error loading contacts:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteContact(id: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("contacts").delete().eq("id", id)

    if (error) throw error
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error deleting contact:", error)
    return { success: false, error: error.message }
  }
}

// Services Actions
export async function getServices() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error loading services:", error)
    return { success: false, error: error.message }
  }
}

export async function createService(serviceData: {
  title: string
  description: string
  category: "advertising" | "building_me"
  icon?: string
  features?: string[]
  price_range?: string
  is_featured?: boolean
  is_published?: boolean
}) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("services").insert([serviceData]).select().single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error creating service:", error)
    return { success: false, error: error.message }
  }
}

export async function updateService(id: string, serviceData: any) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("services")
      .update({ ...serviceData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error updating service:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteService(id: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) throw error
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error deleting service:", error)
    return { success: false, error: error.message }
  }
}

// Portfolios Actions
export async function getPortfolios() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("portfolios").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error loading portfolios:", error)
    return { success: false, error: error.message }
  }
}

export async function createPortfolio(portfolioData: {
  title: string
  description: string
  category: "advertising" | "building_me"
  client_name?: string
  image_url?: string
  gallery_urls?: string[]
  technologies?: string[]
  project_date?: string
  project_value?: number
  duration_months?: number
  location?: string
  is_featured?: boolean
  is_published?: boolean
}) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("portfolios").insert([portfolioData]).select().single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error creating portfolio:", error)
    return { success: false, error: error.message }
  }
}

export async function updatePortfolio(id: string, portfolioData: any) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("portfolios")
      .update({ ...portfolioData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error updating portfolio:", error)
    return { success: false, error: error.message }
  }
}

export async function deletePortfolio(id: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("portfolios").delete().eq("id", id)

    if (error) throw error
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error deleting portfolio:", error)
    return { success: false, error: error.message }
  }
}

// Testimonials Actions
export async function getTestimonials() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error loading testimonials:", error)
    return { success: false, error: error.message }
  }
}

export async function createTestimonial(testimonialData: {
  client_name: string
  client_position?: string
  client_company?: string
  testimonial: string
  client_avatar_url?: string
  rating?: number
  project_type?: string
  is_featured?: boolean
  is_published?: boolean
}) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("testimonials").insert([testimonialData]).select().single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error creating testimonial:", error)
    return { success: false, error: error.message }
  }
}

export async function updateTestimonial(id: string, testimonialData: any) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("testimonials")
      .update({ ...testimonialData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error updating testimonial:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("testimonials").delete().eq("id", id)

    if (error) throw error
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error deleting testimonial:", error)
    return { success: false, error: error.message }
  }
}

// Pricing Packages Actions
export async function getPricingPackages() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("pricing_packages").select("*").order("sort_order", { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error loading pricing packages:", error)
    return { success: false, error: error.message }
  }
}

export async function createPricingPackage(packageData: {
  name: string
  description: string
  category: "advertising" | "building_me"
  price?: number
  price_unit?: string
  features?: string[]
  is_popular?: boolean
  is_custom?: boolean
  min_project_value?: number
  max_project_value?: number
  is_published?: boolean
}) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("pricing_packages").insert([packageData]).select().single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error creating pricing package:", error)
    return { success: false, error: error.message }
  }
}

export async function updatePricingPackage(id: string, packageData: any) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("pricing_packages")
      .update({ ...packageData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error updating pricing package:", error)
    return { success: false, error: error.message }
  }
}

export async function deletePricingPackage(id: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("pricing_packages").delete().eq("id", id)

    if (error) throw error
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error deleting pricing package:", error)
    return { success: false, error: error.message }
  }
}

// Brand Partners Actions
export async function getBrandPartners() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("brand_partners").select("*").order("sort_order", { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error loading brand partners:", error)
    return { success: false, error: error.message }
  }
}

export async function createBrandPartner(partnerData: {
  name: string
  description?: string
  logo_url?: string
  website_url?: string
  partner_type?: string
  collaboration_since?: string
  is_featured?: boolean
  is_published?: boolean
}) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("brand_partners").insert([partnerData]).select().single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error creating brand partner:", error)
    return { success: false, error: error.message }
  }
}

export async function updateBrandPartner(id: string, partnerData: any) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("brand_partners")
      .update({ ...partnerData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error updating brand partner:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteBrandPartner(id: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("brand_partners").delete().eq("id", id)

    if (error) throw error
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error deleting brand partner:", error)
    return { success: false, error: error.message }
  }
}

// Image Upload Action
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." }
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File size too large. Maximum 5MB allowed." }
    }

    const supabase = createAdminClient()
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
    const filePath = `public-media/${fileName}`

    const { data, error } = await supabase.storage.from("public-media").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage.from("public-media").getPublicUrl(filePath)

    return { success: true, data: { url: urlData.publicUrl, path: filePath } }
  } catch (error: any) {
    console.error("[v0] Error uploading image:", error)
    return { success: false, error: error.message }
  }
}
