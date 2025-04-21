import React from 'react'
import CommonSection from '../CommonSection/CommonSection'
import { Col, Container, Row, Spinner } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import Newsletter from '../Newsletter/Newsletter'
import { get } from '../../utils/api'
import { Tour } from '../../types/common'

const fetchTours = async (search: string): Promise<Tour[]> => {
  const params = new URLSearchParams(search)
  const city = params.get('city') || ''
  const distance = params.get('distance') || ''
  const maxGroupSize = params.get('maxGroupSize') || ''

  const query = new URLSearchParams({
    ...(city && { city }),
    ...(distance && { distance }),
    ...(maxGroupSize && { maxGroupSize }),
  })

  const { data } = (await get(`/tours?${query.toString()}`)) as { data: Tour[] }
  return data
}

const fetchReviews = async (): Promise<any[]> => {
  const { data } = (await get('/reviews')) as { data: any[] }
  return data
}

const SearchResultList: React.FC = () => {
  const location = useLocation()

  const {
    data: toursData,
    isLoading,
    isError,
    error,
  } = useQuery(['searchTours', location.search], () =>
    fetchTours(location.search)
  )

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery(
    'fetchReviews',
    fetchReviews
  )

  const tours = toursData || []
  const reviews = reviewsData || []

  return (
    <>
      <CommonSection title={'Tour Search Results.'} />
      <section>
        <Container>
          <Row>
            {isLoading && <Spinner color="primary" />}
            {isError && (
              <p className="text-danger">
                Failed to load tours: {String(error)}
              </p>
            )}
            {!isLoading &&
              !isError &&
              tours?.map((tour) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
                  <div>card</div>
                </Col>
              ))}
            {!isLoading && !isError && tours.length === 0 && (
              <Col>
                <h5 className="text-center">
                  No tours found. Try adjusting your search criteria.
                </h5>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <h5 className="mt-4">Reviews</h5>
              {isReviewsLoading && <Spinner color="secondary" />}
              {!isReviewsLoading &&
                reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p>{review.comment}</p>
                    <small>- {review.author}</small>
                  </div>
                ))}
            </Col>
          </Row>
        </Container>
        <Newsletter />
      </section>
    </>
  )
}

export default SearchResultList
