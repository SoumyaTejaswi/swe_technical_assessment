import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import VehicleImageGallery from '@/components/VehicleImageGallery'
import Logo from '@/components/Logo'

async function getVehicle(id: string) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    })
    return vehicle
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return null
  }
}

export default async function VehiclePage({
  params,
}: {
  params: { id: string }
}) {
  const vehicle = await getVehicle(params.id)

  if (!vehicle) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <Logo />
              <h1 className="text-3xl text-gray-900">
                <span className="font-bold">TUMMALA</span> MOTORS
              </h1>
            </div>
            <Link
              href="/"
              className="inline-flex items-center text-[#6B8E23] hover:text-[#556B2F] font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-lg overflow-hidden">
              <VehicleImageGallery
                imageLinks={vehicle.imageLinks}
                manufacturerName={vehicle.manufacturerName}
                model={vehicle.model}
                vehicleId={vehicle.id}
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Title Section */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {vehicle.manufacturerName} {vehicle.model}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="font-mono">VIN: {vehicle.vin}</span>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Manufacturer</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.manufacturerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Model</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.model}</p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vehicle</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {vehicle.description}
              </p>
            </div>

            {/* Action Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-r from-[#6B8E23] to-[#556B2F] rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Interested in this vehicle?</h3>
                <p className="text-green-100 mb-4">
                  Contact us for more information or to schedule a viewing.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-white text-[#6B8E23] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Contact Us
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Schedule Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

//Vehicle detail page component