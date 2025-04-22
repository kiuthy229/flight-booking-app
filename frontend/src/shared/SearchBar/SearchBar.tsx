import React, { useEffect, useRef, useState } from 'react'
import './search-bar.css'
import { Button, Col, Form, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { getDirectDestinations } from '../../utils/amadeusClient'

interface AirportType {
  type: string
  subtype: string
  name: string
  iataCode: string
  geoCode: {
    latitude: number
    longitude: number
  }
  address: {
    countryName: string
    countryCode: string
    regionCode: string
  }
  timeZone: {
    offSet: string
    referenceLocalDateTime: string
  }
}

const SearchBar: React.FC = () => {
  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)
  const departureDateRef = useRef<HTMLInputElement>(null)
  const arrivalDateRef = useRef<HTMLInputElement>(null)
  const [originSuggestions, setOriginSuggestions] = useState<AirportType[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    AirportType[]
  >([])
  const [isOriginDropdownOpen, setIsOriginDropdownOpen] = useState(false)
  const [isDestinationDropdownOpen, setIsDestinationDropdownOpen] =
    useState(false)
  const [isTwoWayTrip, setIsTwoWayTrip] = useState(false)
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    kids: 0,
    babies: 0,
  })
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false)
  const [flightClass, setFlightClass] = useState('economy')
  const [selectedOrigin, setSelectedOrigin] = useState<AirportType | null>(null)
  const [selectedDestination, setSelectedDestination] =
    useState<AirportType | null>(null)
  const navigate = useNavigate()

  const incrementGuest = (type: 'adults' | 'kids' | 'babies') => {
    setGuestCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const decrementGuest = (type: 'adults' | 'kids' | 'babies') => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1),
    }))
  }

  const searchHandler = () => {
    const departureDate = departureDateRef.current?.value || ''
    const arrivalDate = isTwoWayTrip ? arrivalDateRef.current?.value || '' : ''
    // const guests = `${guestCounts.adults} Adults, ${guestCounts.kids} Kids, ${guestCounts.babies} Babies`
    const flightClassValue = flightClass

    if (
      !selectedOrigin ||
      !selectedDestination ||
      !departureDate ||
      (isTwoWayTrip && !arrivalDate)
    ) {
      return alert('All fields are required')
    }

    const queryParams = new URLSearchParams({
      originLocationCode: selectedOrigin.iataCode,
      destinationLocationCode: selectedDestination.iataCode,
      departureDate,
      ...(isTwoWayTrip && { returnDate: arrivalDate }),
      adults: guestCounts.adults.toString(),
      kids: guestCounts.kids.toString(),
      babies: guestCounts.babies.toString(),
      flightClass: flightClassValue,
      max: '100',
    })

    navigate(`/flights/search?${queryParams.toString()}`)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchHandler()
    }
  }

  useEffect(() => {
    // Fetch initial suggestions for cities in Vietnam
    const fetchInitialCities = async () => {
      try {
        const response = await getDirectDestinations('SGN', 10)
        setOriginSuggestions(response.data.map((item: any) => item))
        setDestinationSuggestions(response.data.map((item: any) => item))
      } catch (error) {
        console.error('Failed to fetch initial cities:', error)
      }
    }
    fetchInitialCities()
  }, [])

  const handleOriginInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e)
    // const query = e.target.value
    // if (query.length > 1) {
    //   try {
    //     const response = await getDirectDestinations('SGN', 10)
    //     setDestinationSuggestions(response.data.map((item: any) => item.name))
    //     setIsOriginDropdownOpen(true)
    //   } catch (error) {
    //     console.error('Failed to fetch origin suggestions:', error)
    //   }
    // } else {
    //   setIsOriginDropdownOpen(false)
    // }
  }

  const handleDestinationInputChange = async () =>
    // e: React.ChangeEvent<HTMLInputElement>
    {
      // const query = e.target.value
      // if (query.length > 1) {
      //   try {
      //     const response = await getCities('FR', query)
      //     setDestinationSuggestions(response.data.map((item: any) => item.name))
      //     setIsDestinationDropdownOpen(true)
      //   } catch (error) {
      //     console.error('Failed to fetch destination suggestions:', error)
      //   }
      // } else {
      //   setIsDestinationDropdownOpen(false)
      // }
    }

  const fetchDirectDestinations = async (departureAirportCode: string) => {
    try {
      const response = await getDirectDestinations(departureAirportCode, 10)
      setDestinationSuggestions(response.data.map((item: any) => item))
      setIsDestinationDropdownOpen(true)
    } catch (error) {
      console.error('Failed to fetch direct destinations:', error)
    }
  }

  const selectOrigin = (location: AirportType) => {
    setSelectedOrigin(location)
    if (originRef.current)
      originRef.current.value = `${location.name} (${location.iataCode})`
    setIsOriginDropdownOpen(false)
    fetchDirectDestinations(location.iataCode)
  }

  const selectDestination = (location: AirportType) => {
    setSelectedDestination(location)
    if (destinationRef.current)
      destinationRef.current.value = `${location.name} (${location.iataCode})`
    setIsDestinationDropdownOpen(false)
  }

  const today = new Date().toISOString().split('T')[0]
  const [returnDateMin, setReturnDateMin] = useState(today)

  const handleDepartureDateChange = () => {
    const departureDate = departureDateRef.current?.value
    if (departureDate) {
      setReturnDateMin(departureDate)
    }
  }

  return (
    <Col lg="12">
      <div className="search__container">
        <Form
          className="search__bar align-items-center gap-4"
          onKeyPress={handleKeyPress}
        >
          <Col lg="12" className="search__bar-top">
            <FormGroup className="d-flex gap-3 form__group">
              <h6>Origin</h6>
              <div className="position-relative">
                <Input
                  type="text"
                  placeholder="Origin"
                  innerRef={originRef}
                  onChange={handleOriginInputChange}
                  onFocus={() => setIsOriginDropdownOpen(true)}
                />
                {isOriginDropdownOpen && (
                  <div className="dropdown-suggestions">
                    {originSuggestions.map((location, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => selectOrigin(location)}
                      >
                        {location.name} ({location.iataCode})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form__group">
              <h6>Destination</h6>
              <div className="position-relative">
                <Input
                  type="text"
                  placeholder="Destination"
                  innerRef={destinationRef}
                  onChange={handleDestinationInputChange}
                  onClick={() => setIsDestinationDropdownOpen(true)}
                />
                {isDestinationDropdownOpen && (
                  <div className="dropdown-suggestions">
                    {destinationSuggestions.map((location, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => selectDestination(location)}
                      >
                        {location.name} ({location.iataCode})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form__group">
              <h6>Guests</h6>
              <div className="d-flex align-items-center gap-3">
                <i className="ri-user-line"></i>
                <Input
                  type="text"
                  value={`${guestCounts.adults} Adults, ${guestCounts.kids} Kids, ${guestCounts.babies} Babies`}
                  readOnly
                  onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                />
              </div>
              {isGuestDropdownOpen && (
                <div
                  className="guest-dropdown"
                  onBlur={() => setIsGuestDropdownOpen(false)}
                >
                  <div className="guest-row">
                    <span>Adults (12+ years)</span>
                    <div className="guest-controls">
                      <button
                        type="button"
                        onClick={() => decrementGuest('adults')}
                      >
                        -
                      </button>
                      <span>{guestCounts.adults}</span>
                      <button
                        type="button"
                        onClick={() => incrementGuest('adults')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-row">
                    <span>Kids (2-11 years)</span>
                    <div className="guest-controls">
                      <button
                        type="button"
                        onClick={() => decrementGuest('kids')}
                      >
                        -
                      </button>
                      <span>{guestCounts.kids}</span>
                      <button
                        type="button"
                        onClick={() => incrementGuest('kids')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-row">
                    <span>Babies (under 2 years)</span>
                    <div className="guest-controls">
                      <button
                        type="button"
                        onClick={() => decrementGuest('babies')}
                      >
                        -
                      </button>
                      <span>{guestCounts.babies}</span>
                      <button
                        type="button"
                        onClick={() => incrementGuest('babies')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </FormGroup>
          </Col>

          <Col lg="12" className="search__bar-bottom">
            <FormGroup className="d-flex gap-3 form__group">
              <h6>Departure Date</h6>
              <div className="d-flex align-items-center gap-3">
                <Input
                  type="date"
                  innerRef={departureDateRef}
                  min={today}
                  onChange={handleDepartureDateChange}
                />
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form__group">
              <div className="d-flex gap-3 align-items-center justify-content-start">
                <Input
                  type="checkbox"
                  id="two-way-trip"
                  checked={isTwoWayTrip}
                  onChange={(e) => setIsTwoWayTrip(e.target.checked)}
                />
                <label htmlFor="two-way-trip" className="checkbox-label">
                  <h6>Two-way trip</h6>
                </label>
              </div>
              <div className="way-trip__input d-flex align-items-center gap-3">
                {isTwoWayTrip && (
                  <Input
                    type="date"
                    innerRef={arrivalDateRef}
                    min={returnDateMin}
                    disabled={!departureDateRef.current?.value}
                  />
                )}
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form__group">
              <h6>Class</h6>
              <div className="d-flex align-items-center gap-3 mt-1 mb-1">
                <i className="ri-flight-takeoff-line"></i>
                <Input
                  type="select"
                  value={flightClass}
                  onChange={(e) => setFlightClass(e.target.value)}
                  className="flight-class-select"
                  id="flight-class"
                  name="flight-class"
                >
                  <option value="economy">Economy</option>
                  <option value="special-economy">Special Economy</option>
                  <option value="business">Business</option>
                  <option value="first-class">First Class</option>
                </Input>
              </div>
            </FormGroup>
          </Col>

          <Button className="search__button" onClick={searchHandler}>
            <i className="ri-search-line"></i>
            <span>Search Flights</span>
          </Button>
        </Form>
      </div>
    </Col>
  )
}

export default SearchBar
