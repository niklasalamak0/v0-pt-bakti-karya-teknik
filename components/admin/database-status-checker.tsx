"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Database, RefreshCw } from "lucide-react"
import { checkDatabaseStatus, getTableRowCounts, refreshSchemaCache } from "@/lib/supabase/debug-helpers"

interface DatabaseStatusCheckerProps {
  onStatusChange?: (isReady: boolean) => void
}

export function DatabaseStatusChecker({ onStatusChange }: DatabaseStatusCheckerProps) {
  const [status, setStatus] = useState<any>(null)
  const [counts, setCounts] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const checkStatus = async () => {
    setLoading(true)
    try {
      const dbStatus = await checkDatabaseStatus()
      const tableCounts = await getTableRowCounts()

      setStatus(dbStatus)
      setCounts(tableCounts)

      // Notify parent component about database readiness
      onStatusChange?.(dbStatus.allTablesExist)

      console.log("[v0] Database status updated:", dbStatus)
    } catch (error) {
      console.error("[v0] Error checking database status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshCache = async () => {
    setRefreshing(true)
    try {
      await refreshSchemaCache()
      // Wait a moment then recheck status
      setTimeout(() => {
        checkStatus()
        setRefreshing(false)
      }, 2000)
    } catch (error) {
      console.error("[v0] Error refreshing cache:", error)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Checking Database Status...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const isReady = status?.allTablesExist

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Status
          {isReady ? (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Ready
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Setup Required
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {isReady
            ? "All database tables are properly configured"
            : "Database setup is required before using admin features"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isReady && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2">Setup Required</h4>
            <p className="text-sm text-orange-700 mb-3">Please run the following database scripts in order:</p>
            <ol className="text-sm text-orange-700 space-y-1 mb-3">
              <li>
                1. Run <code className="bg-orange-100 px-1 rounded">scripts/001_create_tables.sql</code>
              </li>
              <li>
                2. Run <code className="bg-orange-100 px-1 rounded">scripts/002_insert_initial_data.sql</code>
              </li>
              <li>
                3. Run <code className="bg-orange-100 px-1 rounded">scripts/003_enable_rls_policies.sql</code>
              </li>
            </ol>
            <Button
              onClick={handleRefreshCache}
              disabled={refreshing}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
            >
              {refreshing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Status
                </>
              )}
            </Button>
          </div>
        )}

        {status && (
          <div className="space-y-2">
            <h4 className="font-semibold">Table Status:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["contacts", "services", "portfolios", "testimonials", "pricing_packages", "brand_partners"].map(
                (table) => (
                  <div key={table} className="flex items-center justify-between">
                    <span>{table}</span>
                    {status.existingTables?.includes(table) ? (
                      <Badge variant="default" className="bg-green-500 text-xs">
                        ✓ ({counts[table] || 0} rows)
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        ✗ Missing
                      </Badge>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
