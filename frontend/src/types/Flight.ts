export interface Flight {
  type: string
  id: string
  source: string
  instantTicketingRequired: boolean
  nonHomogeneous: boolean
  oneWay: boolean
  isUpsellOffer: boolean
  lastTicketingDate: string
  lastTicketingDateTime: string
  numberOfBookableSeats: number
  itineraries: Itinerary[]
  price: Price
  pricingOptions: PricingOptions
  validatingAirlineCodes: string[]
  travelerPricings: TravelerPricing[]
}

export interface Itinerary {
  duration: string
  segments: Segment[]
}

export interface Segment {
  departure: LocationType
  arrival: LocationType
  carrierCode: string
  number: string
  aircraft: Aircraft
  operating: Operating
  duration: string
  id: string
  numberOfStops: number
  blacklistedInEU: boolean
}

export interface LocationType {
  iataCode: string
  at: string
  terminal?: string
}

export interface Aircraft {
  code: string
}

export interface Operating {
  carrierCode: string
}

export interface Price {
  currency: string
  total: string
  base: string
  fees: Fee[]
  grandTotal: string
}

export interface Fee {
  amount: string
  type: string
}

export interface PricingOptions {
  fareType: string[]
  includedCheckedBagsOnly: boolean
}

export interface TravelerPricing {
  travelerId: string
  fareOption: string
  travelerType: string
  price: TravelerPrice
  fareDetailsBySegment: FareDetailsBySegment[]
}

export interface TravelerPrice {
  currency: string
  total: string
  base: string
}

export interface FareDetailsBySegment {
  segmentId: string
  cabin: string
  fareBasis: string
  brandedFare: string
  brandedFareLabel: string
  class: string
  includedCheckedBags: Baggage
  includedCabinBags: Baggage
  amenities: Amenity[]
}

export interface Baggage {
  weight: number
  weightUnit: string
}

export interface Amenity {
  description: string
  isChargeable: boolean
  amenityType: string
  amenityProvider: AmenityProvider
}

export interface AmenityProvider {
  name: string
}
