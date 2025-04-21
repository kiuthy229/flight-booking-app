import React, { useEffect, useState } from 'react'
import CommonSection from '../shared/CommonSection/CommonSection'
import '../styles/tours.css'
import Newsletter from '../shared/Newsletter/Newsletter'
import { Row, Col, Container, Spinner } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import { getFlightOffers } from '../utils/amadeusClient'
import { Flight } from '../types/Flight'

const Flights: React.FC = () => {
  const location = useLocation()
  const [flightOffers, setFlightOffers] = useState<Flight[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFlights = async () => {
      const searchParams = new URLSearchParams(location.search)
      const originLocationCode = searchParams.get('originLocationCode')
      const destinationLocationCode = searchParams.get(
        'destinationLocationCode'
      )
      const adults = searchParams.get('adults')
      const max = searchParams.get('max') || '5'
      const departureDate = searchParams.get('departureDate')
      const returnDate = searchParams.get('returnDate')

      if (
        !originLocationCode ||
        !destinationLocationCode ||
        !adults ||
        !departureDate
      ) {
        setIsError(true)
        setError('Missing required query parameters.')
        setIsLoading(false)
        return
      }

      try {
        const { data } = await getFlightOffers({
          originLocationCode,
          destinationLocationCode,
          adults,
          max,
          departureDate,
          ...(returnDate && { returnDate }),
        })
        setFlightOffers(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to fetch flight offers:', err)
        setIsError(true)
        setError('Failed to fetch flight offers. Please try again.')
        setIsLoading(false)
      }
    }

    fetchFlights()
  }, [location.search])

  console.log('Flight offers:', flightOffers)

  return (
    <>
      <CommonSection title={'Available Flights'} />
      <section>
        <Container>
          <Row>
            {isLoading && <Spinner color="primary" />}
            {isError && <p className="text-danger">{error}</p>}
            {!isLoading &&
              !isError &&
              flightOffers?.map((offer: Flight, index: number) => (
                <Col lg="12" className="mb-4" key={index}>
                  <div className="p-4 bg-gray-100 rounded-md shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {offer.itineraries[0].segments[0].departure.iataCode}{' '}
                          to{' '}
                          {
                            offer.itineraries[0].segments.slice(-1)[0].arrival
                              .iataCode
                          }
                        </h3>
                        <p className="text-sm text-gray-600">
                          Departure:{' '}
                          {offer.itineraries[0].segments[0].departure.at}
                        </p>
                        <p className="text-sm text-gray-600">
                          Arrival:{' '}
                          {
                            offer.itineraries[0].segments.slice(-1)[0].arrival
                              .at
                          }
                        </p>
                        <p className="text-sm text-gray-600">
                          Duration: {offer.itineraries[0].duration}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stops: {offer.itineraries[0].segments.length - 1}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-indigo-600">
                          {offer.price.grandTotal} {offer.price.currency}
                        </p>
                        <p className="text-sm text-gray-600">
                          Base Price: {offer.price.base} {offer.price.currency}
                        </p>
                        <p className="text-sm text-gray-600">
                          Seats Available: {offer.numberOfBookableSeats}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Flights
