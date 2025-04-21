import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import Barcode from './Barcode'

interface ReviewTicketProps {
  ticket: TicketDetails
}

export type TicketDetails = {
  ticket_id: number
  transport_no: string
  departure_date: string
  origin: string
  arrival_date: string
  destination: string
  stops: number
  passenger_type: string
  total_price: number
  user_id: number
  airline: string
}

const ReviewTicket: FunctionComponent<ReviewTicketProps> = ({ ticket }) => {
  const navigate = useNavigate()
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{ticket.transport_no}</h2>
        <p className="text-sm text-gray-600">
          {ticket.origin} to {ticket.destination}
        </p>
        <p className="text-sm text-gray-600">
          Departure: {new Date(ticket.departure_date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          Arrival: {new Date(ticket.arrival_date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">Stops: {ticket.stops}</p>
        <p className="text-sm text-gray-600">
          Passenger Type: {ticket.passenger_type}
        </p>
        <p className="text-sm text-gray-600">Airline: {ticket.airline}</p>
        <p className="text-lg font-bold text-indigo-600">
          {ticket.total_price} VND
        </p>
      </div>
      <div className="mb-4">
        <Barcode value={ticket.ticket_id.toString()} />
      </div>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
      >
        View Details
      </button>
    </div>
  )
}

export default ReviewTicket
