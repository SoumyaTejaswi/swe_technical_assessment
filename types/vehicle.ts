export interface Vehicle {
  id: string
  vin: string
  description: string
  manufacturerName: string
  model: string
  imageLinks: string[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateVehicleInput {
  vin: string
  description: string
  manufacturerName: string
  model: string
  imageLinks: string[]
}

