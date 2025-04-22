import React, { useEffect, useState } from 'react'
import CommonSection from '../shared/CommonSection/CommonSection'
import '../styles/tours.css'
import Newsletter from '../shared/Newsletter/Newsletter'
import { Row, Col, Container, Spinner } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import { getFlightOffers } from '../utils/amadeusClient'
import { Flight } from '../types/Flight'
import FlightCard from '../components/FlightCard/FlightCard'

const Flights: React.FC = () => {
  const location = useLocation()
  const [flightOffers, setFlightOffers] = useState<Flight[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(10) // Number of results to show initially

  useEffect(() => {
    const fetchFlights = async () => {
      const originLocationCode = 'SGN'
      const destinationLocationCode = 'HAN'
      const adults = '1'
      const max = '100'

      // Calculate departure date as tomorrow and return date within the next month
      const today = new Date()
      const tomorrow = new Date(today.setDate(today.getDate() + 1))
      const departureDate = tomorrow.toISOString().split('T')[0]
      const returnDate = new Date(tomorrow.setMonth(tomorrow.getMonth() + 1))
        .toISOString()
        .split('T')[0]

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

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10) // Load 10 more results
  }

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
              flightOffers
                ?.slice(0, visibleCount) // Show only the visible results
                .map((flight: Flight, index: number) => (
                  <Col lg="12" className="mb-4" key={index}>
                    <FlightCard flight={flight} />
                  </Col>
                ))}
          </Row>
          {!isLoading &&
            !isError &&
            flightOffers &&
            visibleCount < flightOffers.length && (
              <div className="text-center mt-4">
                <button className="btn primary__btn" onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )}
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Flights
