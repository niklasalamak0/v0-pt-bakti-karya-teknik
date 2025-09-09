import { createClient } from "@supabase/supabase-js"

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables for admin client")
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function refreshSchemaCache() {
  const adminClient = createAdminClient()

  try {
    // Force schema refresh by making a simple query
    const { error } = await adminClient.from("information_schema.tables").select("table_name").limit(1)

    if (error) {
      console.error("[v0] Schema cache refresh error:", error)
      return false
    }

    console.log("[v0] Schema cache refreshed successfully")
    return true
  } catch (error) {
    console.error("[v0] Schema cache refresh failed:", error)
    return false
  }
}

export async function debugTableStatus() {
  const adminClient = createAdminClient()

  const tables = ["contacts", "services", "portfolios", "testimonials", "pricing_packages", "brand_partners"]
  const results: Record<string, boolean> = {}

  for (const table of tables) {
    try {
      const { error } = await adminClient.from(table).select("id").limit(1)
      results[table] = !error

      if (error) {
        console.error(`[v0] Table ${table} error:`, error.message)
      } else {
        console.log(`[v0] Table ${table} exists and accessible`)
      }
    } catch (error) {
      results[table] = false
      console.error(`[v0] Table ${table} check failed:`, error)
    }
  }

  return results
}
