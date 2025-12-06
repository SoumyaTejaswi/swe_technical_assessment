import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface CSVRow {
  VIN: string
  WebAdDescription: string
  Make: string
  Model: string
  PhotoURLs: string
}

function parseCSV(filePath: string): CSVRow[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const headers = lines[0].split(',').map((h) => h.replace(/"/g, '').trim())

  const rows: CSVRow[] = []

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue

    const values: string[] = []
    let currentValue = ''
    let inQuotes = false

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]

      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim())
        currentValue = ''
      } else {
        currentValue += char
      }
    }
    values.push(currentValue.trim())

    if (values.length >= headers.length) {
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index]?.replace(/^"|"$/g, '') || ''
      })

      if (row.VIN && row.WebAdDescription && row.Make && row.Model) {
        rows.push({
          VIN: row.VIN,
          WebAdDescription: row.WebAdDescription,
          Make: row.Make,
          Model: row.Model,
          PhotoURLs: row.PhotoURLs || '',
        })
      }
    }
  }

  return rows
}

async function main() {
  console.log('Starting seed...')

  const csvPath = path.join(process.cwd(), 'assets', 'swe_technical_assessment_data.csv')
  const rows = parseCSV(csvPath)

  console.log(`Found ${rows.length} vehicles in CSV`)

  for (const row of rows) {
    // Parse image URLs (comma-separated)
    const imageLinks = row.PhotoURLs
      ? row.PhotoURLs.split(',').map((url) => url.trim()).filter((url) => url.length > 0)
      : []

    try {
      await prisma.vehicle.upsert({
        where: { vin: row.VIN },
        update: {},
        create: {
          vin: row.VIN,
          description: row.WebAdDescription,
          manufacturerName: row.Make,
          model: row.Model,
          imageLinks: imageLinks,
        },
      })
      console.log(`✓ Seeded vehicle: ${row.Make} ${row.Model} (${row.VIN})`)
    } catch (error) {
      console.error(`✗ Error seeding vehicle ${row.VIN}:`, error)
    }
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

//Script to load initial data from CSV file into the database