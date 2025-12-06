'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddVehicleForm() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    vin: '',
    description: '',
    manufacturerName: '',
    model: '',
    imageLinks: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Parse image links (comma-separated or newline-separated)
    const imageLinksArray = formData.imageLinks
      .split(/[,\n]/)
      .map((link) => link.trim())
      .filter((link) => link.length > 0)

    if (imageLinksArray.length === 0) {
      setError('Please provide at least one image link')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vin: formData.vin,
          description: formData.description,
          manufacturerName: formData.manufacturerName,
          model: formData.model,
          imageLinks: imageLinksArray,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create vehicle')
      }

      // Reset form and close modal
      setFormData({
        vin: '',
        description: '',
        manufacturerName: '',
        model: '',
        imageLinks: '',
      })
      setIsOpen(false)
      router.refresh()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#6B8E23] hover:bg-[#556B2F] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
      >
        + Add New Vehicle
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Vehicle
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="vin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    VIN *
                  </label>
                  <input
                    type="text"
                    id="vin"
                    name="vin"
                    value={formData.vin}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B8E23] focus:border-[#6B8E23]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B8E23] focus:border-[#6B8E23]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="manufacturerName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Manufacturer Name *
                  </label>
                  <input
                    type="text"
                    id="manufacturerName"
                    name="manufacturerName"
                    value={formData.manufacturerName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B8E23] focus:border-[#6B8E23]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Model *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B8E23] focus:border-[#6B8E23]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="imageLinks"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image Links (comma or newline separated) *
                  </label>
                  <textarea
                    id="imageLinks"
                    name="imageLinks"
                    value={formData.imageLinks}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B8E23] focus:border-[#6B8E23]"
                  />
                </div>

                {error && (
                  <div
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
                    role="alert"
                    aria-live="polite"
                  >
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#556B2F] disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Add Vehicle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

//Form Component