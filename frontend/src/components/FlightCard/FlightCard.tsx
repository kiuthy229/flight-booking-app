import React from 'react'
import { useNavigate } from 'react-router-dom'

interface FlightCardProps {
  flight: {
    itineraries: {
      segments: {
        departure: { iataCode: string; at: string }
        arrival: { iataCode: string; at: string }
      }[]
      duration: string
    }[]
    price: {
      grandTotal: string
      base: string
      currency: string
    }
    numberOfBookableSeats: number
  }
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/flight-details`, { state: { flight } })
  }

  return (
    <div
      className="p-4 bg-gray-100 rounded-md shadow-sm cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            {flight.itineraries[0].segments[0].departure.iataCode} to{' '}
            {flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
          </h3>
          <p className="text-sm text-gray-600">
            Departure: {flight.itineraries[0].segments[0].departure.at}
          </p>
          <p className="text-sm text-gray-600">
            Arrival: {flight.itineraries[0].segments.slice(-1)[0].arrival.at}
          </p>
          <p className="text-sm text-gray-600">
            Duration: {flight.itineraries[0].duration}
          </p>
          <p className="text-sm text-gray-600">
            Stops: {flight.itineraries[0].segments.length - 1}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-indigo-600">
            {flight.price.grandTotal} {flight.price.currency}
          </p>
          <p className="text-sm text-gray-600">
            Base Price: {flight.price.base} {flight.price.currency}
          </p>
          <p className="text-sm text-gray-600">
            Seats Available: {flight.numberOfBookableSeats}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FlightCard
