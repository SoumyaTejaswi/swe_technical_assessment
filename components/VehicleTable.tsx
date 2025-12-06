'use client'

import { useState } from 'react'
import { Vehicle } from '@/types/vehicle'
import VehicleCard from './VehicleCard'

interface VehicleTableProps {
  vehicles: Vehicle[]
}

const VEHICLES_PER_PAGE = 12

export default function VehicleTable({ vehicles }: VehicleTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(vehicles.length / VEHICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * VEHICLES_PER_PAGE
  const endIndex = startIndex + VEHICLES_PER_PAGE
  const currentVehicles = vehicles.slice(startIndex, endIndex)

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
        <p className="text-gray-500">Add your first vehicle to get started.</p>
      </div>
    )
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the vehicle grid
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 mt-8 relative">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[#6B8E23] text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return (
                  <span key={page} className="px-2 text-gray-500">
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>

          {/* TUMMALA MOTORS - Centered */}
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-xl text-gray-900">
            <span className="font-bold">TUMMALA</span> MOTORS
          </h2>

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-gray-600 mt-4">
        Showing {startIndex + 1} to {Math.min(endIndex, vehicles.length)} of {vehicles.length} vehicles
      </div>
    </div>
  )
}