export const exportToExcel = (data: any[], filename: string, sheetName = "Sheet1") => {
  // Convert data to CSV format for Excel compatibility
  if (!data || data.length === 0) {
    alert("Tidak ada data untuk diekspor")
    return
  }

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value || ""
        })
        .join(","),
    ),
  ].join("\n")

  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = "\uFEFF"
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export const formatDateForExport = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const sanitizeForCSV = (text: string) => {
  if (typeof text !== "string") return text
  return text.replace(/"/g, '""').replace(/\n/g, " ").replace(/\r/g, " ")
}
