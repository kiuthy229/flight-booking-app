export interface Review {
  productId: string
  username: string
  createdAt: string
  rating: number
  reviewText: string
}

export interface Tour {
  _id: string
  photo: string
  title: string
  desc: string
  price: number
  address: string
  featured: boolean
  reviews: Review[]
  city: string
  distance: number
  maxGroupSize: number
  avgRating: number
}

export interface Credentials {
  userId: string
  userEmail: string
  fullName: string
  phone: string
  guestSize: number
  bookAt: string
}
