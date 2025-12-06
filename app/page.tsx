import VehicleTable from '@/components/VehicleTable'
import AddVehicleForm from '@/components/AddVehicleForm'
import Logo from '@/components/Logo'
import { prisma } from '@/lib/prisma'

async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return vehicles
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }
}

export default async function Home() {
  const vehicles = await getVehicles()

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <div className="flex items-center space-x-3">
              <Logo />
              <h1 className="text-3xl text-gray-900">
                <span className="font-bold">TUMMALA</span> MOTORS
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10 flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">
            Browse Our Selection Of Quality Vehicles
          </p>
          <AddVehicleForm />
        </div>

        {/* Vehicle Grid */}
        <VehicleTable vehicles={vehicles} />
      </div>
    </main>
  )
}