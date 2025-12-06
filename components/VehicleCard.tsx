'use client'

import { Vehicle } from '@/types/vehicle'
import Link from 'next/link'
import Image from 'next/image'

interface VehicleCardProps {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const mainImage = vehicle.imageLinks && vehicle.imageLinks.length > 0 
    ? vehicle.imageLinks[0] 
    : null

  return (
    <Link 
      href={`/vehicles/${vehicle.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
    >
      {/* Vehicle Image */}
      <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={`${vehicle.manufacturerName} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* View Details Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
          View Details
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#6B8E23] transition-colors">
          {vehicle.manufacturerName} {vehicle.model}
        </h3>
        <p className="text-sm text-gray-500 font-mono mb-4">VIN: {vehicle.vin}</p>
        
        {/* Description Preview */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {vehicle.description.substring(0, 120)}...
        </p>

        {/* View Link */}
        <div className="flex items-center text-[#6B8E23] font-semibold text-sm">
          View Details
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

