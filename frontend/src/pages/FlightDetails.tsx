import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Form, ListGroup, Spinner } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/tour-details.css'
import avatar from '../assets/assets/avatar.jpg'
import Booking from '../components/Booking/Booking'
import StarRating from '../components/StarRating/StarRating'
import { get, post } from '../utils/api'
import { useQuery, useMutation } from 'react-query'
import { Tour, Credentials, Review } from '../types/common'

const fetchTourDetails = async (id: string): Promise<Tour> => {
  const { data } = (await get(`/tours/${id}`)) as { data: Tour }
  return data
}

const fetchReviews = async (tourId: string): Promise<Review[]> => {
  const { data } = (await get(`/tours/${tourId}/reviews`)) as { data: Review[] }
  return data
}

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const token = localStorage.getItem('token') || ''
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const navigate = useNavigate()
  const reviewMsgRef = useRef<HTMLInputElement>(null)
  const [tourRating, setTourRating] = useState<number | null>(null)
  const [credentials, setCredentials] = useState<Credentials>({
    userId: user.id || '',
    userEmail: user.email || '',
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: new Date().toISOString().split('T')[0],
  })

  const {
    data: tour,
    isLoading,
    isError,
    error,
  } = useQuery<Tour, Error>(['tourDetails', id], () => fetchTourDetails(id!))

  const { data: reviewsData } = useQuery<Review[], Error>(['reviews', id], () =>
    fetchReviews(id!)
  )

  const mutation = useMutation(
    (reviewData: {
      userId: string
      username: string
      rating: number | null
      reviewText: string
    }) => post(`/tours/${id}/reviews`, reviewData, token),
    {
      onSuccess: () => {
        alert('Review submitted successfully!')
      },
      onError: () => {
        alert('Failed to submit review. Please try again.')
      },
    }
  )

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const reviewText = reviewMsgRef.current?.value || ''

    mutation.mutate({
      userId: user.id,
      username: user.username,
      rating: tourRating,
      reviewText,
    })
  }

  const handleBookNow = () => {
    navigate('/checkout', {
      state: {
        tourId: id,
        title: tour?.title,
        price: tour?.price,
        guestSize: credentials.guestSize,
        date: credentials.bookAt,
      },
    })
  }

  useEffect(() => {
    if (tour) {
      window.scrollTo(0, 0)
    }
  }, [tour])

  if (isLoading) return <Spinner color="primary" />
  if (isError)
    return <p className="text-danger">Failed to load tour: {error?.message}</p>

  const {
    photo,
    title,
    desc,
    price,
    address,
    city,
    distance,
    maxGroupSize,
    avgRating,
  } = tour!

  const reviews = reviewsData || []

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-s-fill"
                        style={{ color: 'var(--secondary-color)' }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {reviews?.length === 0 ? (
                        'Not rated'
                      ) : (
                        <span>{reviews.length}</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-user-fill"></i>
                      {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> ${price}/
                      per person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i> {distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {maxGroupSize}
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/* Tour Reviews */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <StarRating rating={tourRating} setRating={setTourRating} />

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your thoughts"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__review">
                    {reviews?.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  'en-US',
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}
                              <i className="ri-star-s-fill"></i>
                            </span>
                          </div>

                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              {tour && (
                <Booking
                  tour={tour}
                  avgRating={avgRating}
                  credentials={credentials}
                  setCredentials={setCredentials}
                  handleBookNow={handleBookNow}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default TourDetails
