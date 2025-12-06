import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vin, description, manufacturerName, model, imageLinks } = body

    // Validation
    if (!vin || !description || !manufacturerName || !model || !imageLinks) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // VIN validation (17 characters, alphanumeric)
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i
    if (!vinRegex.test(vin)) {
      return NextResponse.json(
        { error: 'VIN must be 17 characters and alphanumeric' },
        { status: 400 }
      )
    }

    // Validate description length
    if (description.length > 5000) {
      return NextResponse.json(
        { error: 'Description must be less than 5000 characters' },
        { status: 400 }
      )
    }

    // Validate manufacturer and model length
    if (manufacturerName.length > 100 || model.length > 100) {
      return NextResponse.json(
        { error: 'Manufacturer name and model must be less than 100 characters' },
        { status: 400 }
      )
    }

    if (!Array.isArray(imageLinks) || imageLinks.length === 0) {
      return NextResponse.json(
        { error: 'Image links must be a non-empty array' },
        { status: 400 }
      )
    }

    // Validate image URLs
    const urlRegex = /^https?:\/\/.+/i
    for (const url of imageLinks) {
      if (typeof url !== 'string' || !urlRegex.test(url)) {
        return NextResponse.json(
          { error: 'All image links must be valid HTTP/HTTPS URLs' },
          { status: 400 }
        )
      }
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        vin,
        description,
        manufacturerName,
        model,
        imageLinks,
      },
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating vehicle:', error)
    
    // Handle Prisma unique constraint error
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'VIN already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    )
  }
}

//GET all vehicles and POST Create vehicle