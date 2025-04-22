import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import Booking from '../components/Booking/Booking'
import { Credentials } from '../types/common'

const FlightDetails: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<Credentials>({
    userId: user.id || '',
    userEmail: user.email || '',
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: new Date().toISOString().split('T')[0],
  })
  const location = useLocation()
  const { flight } = location.state

  // Extract departure date
  const departureDate =
    flight?.itineraries[0].segments[0].departure.at.split('T')[0]

  const handleBookNow = () => {
    navigate('/checkout', {
      state: { flight },
    })
  }

  return (
    <Container>
      <Row>
        <Col lg="7">
          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Flight Details</h1>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {flight?.itineraries[0].segments[0].departure.iataCode} to{' '}
                  {
                    flight?.itineraries[0].segments.slice(-1)[0].arrival
                      .iataCode
                  }
                </h3>
                <p className="text-sm text-gray-600">
                  Departure: {flight.itineraries[0].segments[0].departure.at}
                </p>
                <p className="text-sm text-gray-600">
                  Departure Date: {departureDate} {/* Display departure date */}
                </p>
                <p className="text-sm text-gray-600">
                  Arrival:{' '}
                  {flight.itineraries[0].segments.slice(-1)[0].arrival.at}
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
        </Col>
        <Col lg="5">
          <Booking
            flight={flight}
            credentials={credentials}
            setCredentials={setCredentials}
            handleBookNow={handleBookNow}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default FlightDetails
