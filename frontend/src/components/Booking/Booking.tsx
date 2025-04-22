import React, { FC, ChangeEvent, FormEvent } from 'react'
import './booking.css'
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Input,
} from 'reactstrap'
import { Credentials } from '../../types/common'
import { Flight } from '../../types/Flight'

interface BookingProps {
  flight: Flight
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>
  handleBookNow: (e: FormEvent) => void
}

const Booking: FC<BookingProps> = ({
  flight,
  credentials,
  setCredentials,
  handleBookNow,
}) => {
  const { price } = flight

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const totalAmount = Number(price.total) * Number(credentials.guestSize)

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          {price.currency} {Number(price.total)} <span>/per person</span>
        </h3>
      </div>

      {/* Booking form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleBookNow}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              placeholder=""
              defaultValue={new Date().toISOString().split('T')[0]}
              id="bookAt"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              placeholder="Guests"
              id="guestSize"
              min="1"
              value={credentials.guestSize}
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Booking Bottom */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {price.total} <i className="ri-close-line"></i>
              <span>1 person</span>
            </h5>
            <span>
              {price.currency} {price.grandTotal}
            </span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Supplier</h5>
            <span>
              {price.currency} {price.fees[0].amount}
            </span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>
              {price.currency} {price.fees[1].amount}
            </span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>
              {price.currency} {totalAmount}
            </span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleBookNow}>
          Book Now
        </Button>
      </div>
    </div>
  )
}

export default Booking
