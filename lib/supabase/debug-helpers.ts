import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role for admin operations to bypass RLS
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function checkDatabaseStatus() {
  try {
    // Check if tables exist
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .in("table_name", ["contacts", "services", "portfolios", "testimonials", "pricing_packages", "brand_partners"])

    if (tablesError) {
      console.error("[v0] Error checking tables:", tablesError)
      return { success: false, error: tablesError.message, tables: [] }
    }

    const existingTables = tables?.map((t) => t.table_name) || []
    const requiredTables = ["contacts", "services", "portfolios", "testimonials", "pricing_packages", "brand_partners"]
    const missingTables = requiredTables.filter((table) => !existingTables.includes(table))

    console.log("[v0] Database status check:", {
      existingTables,
      missingTables,
      allTablesExist: missingTables.length === 0,
    })

    return {
      success: true,
      existingTables,
      missingTables,
      allTablesExist: missingTables.length === 0,
    }
  } catch (error) {
    console.error("[v0] Database status check failed:", error)
    return { success: false, error: error.message, tables: [] }
  }
}

export async function getTableRowCounts() {
  try {
    const tables = ["contacts", "services", "portfolios", "testimonials", "pricing_packages", "brand_partners"]
    const counts = {}

    for (const table of tables) {
      const { count, error } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true })

      if (error) {
        console.error(`[v0] Error counting ${table}:`, error)
        counts[table] = 0
      } else {
        counts[table] = count || 0
      }
    }

    console.log("[v0] Table row counts:", counts)
    return counts
  } catch (error) {
    console.error("[v0] Error getting table counts:", error)
    return {}
  }
}

// Force refresh Supabase schema cache
export async function refreshSchemaCache() {
  try {
    // This forces Supabase to refresh its schema cache
    const { error } = await supabaseAdmin.rpc("pg_notify", {
      channel: "schema_cache_refresh",
      payload: "refresh",
    })

    if (error) {
      console.error("[v0] Error refreshing schema cache:", error)
      return false
    }

    console.log("[v0] Schema cache refresh requested")
    return true
  } catch (error) {
    console.error("[v0] Schema cache refresh failed:", error)
    return false
  }
}
