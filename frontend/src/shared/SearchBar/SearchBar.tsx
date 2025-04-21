import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const SearchBar: React.FC = () => {
  const locationRef = useRef<HTMLInputElement>(null)
  const distanceRef = useRef<HTMLInputElement>(null)
  const maxGroupSizeRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const searchHandler = () => {
    const city = locationRef.current?.value || ''
    const distance = distanceRef.current?.value || ''
    const maxGroupSize = maxGroupSizeRef.current?.value || ''

    if (city === '' && distance === '' && maxGroupSize === '') {
      return alert('All fields are required')
    }

    const queryParams = new URLSearchParams({
      city,
      distance,
      maxGroupSize,
    })

    navigate(`/tours/search?${queryParams.toString()}`)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchHandler()
    }
  }

  return (
    <Col lg="12">
      <div className="search__container">
        <Form
          className="search__bar d-flex align-items-center gap-4"
          onKeyPress={handleKeyPress}
        >
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div className="element__search">
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div className="element__search">
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div className="element__search">
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          <span className="search__icon" onClick={searchHandler}>
            <i className="ri-search-line"></i>
            <span className="d-md-none">Browse your favorite destinations</span>
          </span>
        </Form>
      </div>
    </Col>
  )
}

export default SearchBar
