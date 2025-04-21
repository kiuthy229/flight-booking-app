import React, { FC, ChangeEvent, FormEvent } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Credentials, Tour } from '../../types/common';

interface BookingProps {
  tour: Tour;
  avgRating: number;
  credentials: Credentials;
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>;
  handleBookNow: (e: FormEvent) => void;
}

const Booking: FC<BookingProps> = ({
  tour,
  avgRating,
  credentials,
  setCredentials,
  handleBookNow,
}) => {
  const { price, reviews } = tour;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  return (
    <div className='booking'>
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className='tour__rating d-flex align-items-center'>
          <i className='ri-star-s-fill'></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking form */}
      <div className='booking__form'>
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handleBookNow}>
          <FormGroup>
            <input
              type='text'
              placeholder='Full name'
              id='fullName'
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type='number'
              placeholder='Phone'
              id='phone'
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type='date'
              placeholder=''
              defaultValue={new Date().toISOString().split('T')[0]}
              id='bookAt'
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type='number'
              placeholder='Guests'
              id='guestSize'
              min='1'
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Booking Bottom */}
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>
              ${price} <i className='ri-close-line'></i>
              <span>1 person</span>
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
            <span> ${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span> ${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleBookNow}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
