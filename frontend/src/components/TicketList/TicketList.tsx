import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TicketDetails } from '../ReviewTicket/ReviewTicket'
import { formatNumberWithCommas } from '../../utils/formatNumberWithCommas'
import authHeader from '../../utils/authHeader'

const TicketList: FunctionComponent = () => {
  const [tickets, setTickets] = useState<TicketDetails[]>([])
  const navigate = useNavigate()

  async function getTickets() {
    try {
      const response = await axios.get('http://localhost:8080/tickets', {
        headers: authHeader(),
      })
      setTickets(
        response.data.filter((ticket: TicketDetails) => ticket.user_id === null)
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTickets()
  }, [])

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Available Tickets</h2>
      <div className="grid grid-cols-1 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.ticket_id}
            className="p-4 bg-gray-100 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{ticket.transport_no}</h3>
                <p className="text-sm text-gray-600">
                  {ticket.origin} to {ticket.destination}
                </p>
                <p className="text-sm text-gray-600">
                  Departure: {new Date(ticket.departure_date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Arrival: {new Date(ticket.arrival_date).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600">
                  {formatNumberWithCommas(ticket.total_price)} VND
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
                  onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicketList
