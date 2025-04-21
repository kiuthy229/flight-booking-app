import React from 'react'
import CommonSection from '../shared/CommonSection/CommonSection'
import '../styles/tours.css'
import Newsletter from '../shared/Newsletter/Newsletter'
import { Row, Col, Container, Spinner } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import SearchBar from '../shared/SearchBar/SearchBar'
import { get } from '../utils/api'
import { useQuery } from 'react-query'
import { Tour } from '../types/common'

const fetchTours = async (search: string): Promise<Tour[]> => {
  const { data } = (await get(`/tours${search}`)) as { data: Tour[] }
  return data
}

const Tours: React.FC = () => {
  const location = useLocation()
  const {
    data: tours,
    isLoading,
    isError,
    error,
  } = useQuery<Tour[], Error>(['tours', location.search], () =>
    fetchTours(location.search)
  )

  return (
    <>
      <CommonSection title={'All Tours'} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {isLoading && <Spinner color="primary" />}
            {isError && (
              <p className="text-danger">
                Failed to load tours: {error?.message}
              </p>
            )}
            {!isLoading &&
              !isError &&
              tours?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <div>card</div>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default Tours
