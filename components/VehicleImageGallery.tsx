'use client'

import { useState } from 'react'
import Image from 'next/image'

interface VehicleImageGalleryProps {
  imageLinks: string[]
  manufacturerName: string
  model: string
  vehicleId: string
}

export default function VehicleImageGallery({
  imageLinks,
  manufacturerName,
  model,
  vehicleId,
}: VehicleImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [thumbnailPage, setThumbnailPage] = useState(0)
  const thumbnailsPerPage = 5

  if (imageLinks.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
        <div className="text-center">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 font-medium">No images available</p>
        </div>
      </div>
    )
  }

  const totalThumbnailPages = Math.ceil(imageLinks.length / thumbnailsPerPage)
  const startIndex = thumbnailPage * thumbnailsPerPage
  const endIndex = startIndex + thumbnailsPerPage
  const displayThumbnails = imageLinks.slice(startIndex, endIndex)

  const goToPreviousPage = () => {
    if (thumbnailPage > 0) {
      setThumbnailPage(thumbnailPage - 1)
    }
  }

  const goToNextPage = () => {
    if (thumbnailPage < totalThumbnailPages - 1) {
      setThumbnailPage(thumbnailPage + 1)
    }
  }

  const handleThumbnailClick = (index: number) => {
    const actualIndex = startIndex + index
    setSelectedImage(actualIndex)
  }

  const goToPreviousImage = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : imageLinks.length - 1))
  }

  const goToNextImage = () => {
    setSelectedImage((prev) => (prev < imageLinks.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="space-y-4">
      {/* Main Image with Navigation */}
      <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={imageLinks[selectedImage]}
          alt={`${manufacturerName} ${model} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority={selectedImage === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        
        {/* Navigation Arrows */}
        {imageLinks.length > 1 && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
          {selectedImage + 1} / {imageLinks.length}
        </div>
      </div>

      {/* Thumbnail Gallery with Pagination */}
      {imageLinks.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {/* Previous Page Button */}
            {totalThumbnailPages > 1 && (
              <button
                onClick={goToPreviousPage}
                disabled={thumbnailPage === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous thumbnails"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Thumbnail Grid */}
            <div className="flex-1 grid grid-cols-5 gap-2">
              {displayThumbnails.map((imageUrl, index) => {
                const actualIndex = startIndex + index
                const isSelected = selectedImage === actualIndex
                return (
                  <button
                    key={`${vehicleId}-thumb-${actualIndex}`}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative w-full h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-[#6B8E23] ring-2 ring-[#6B8E23] ring-offset-2'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${manufacturerName} ${model} - Thumbnail ${actualIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 20vw, 10vw"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Next Page Button */}
            {totalThumbnailPages > 1 && (
              <button
                onClick={goToNextPage}
                disabled={thumbnailPage === totalThumbnailPages - 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next thumbnails"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Thumbnail Page Indicator */}
          {totalThumbnailPages > 1 && (
            <p className="text-xs text-gray-500 text-center">
              Showing {startIndex + 1}-{Math.min(endIndex, imageLinks.length)} of {imageLinks.length} images
            </p>
          )}
        </div>
      )}
    </div>
  )
}

