import React, { Fragment } from 'react'
import TicketPayment from '../components/TicketPayment/TicketPayment'

import TicketList from '../components/TicketList/TicketList'

export const Home: React.FC = () => {
  // const ticket: TicketDetails = {
  //   ticket_id: 0,
  //   transport_no: '00000',
  //   departure_date: '01-01-2023',
  //   origin: 'Ho Chi Minh',
  //   arrival_date: '02-01-2023',
  //   destination: 'Ha Noi',
  //   stops: 0,
  //   passenger_type: 'economy',
  //   total_price: 11111,
  //   user_id: 0,
  //   airline: 'VietnamAirline',
  // }
  return (
    <Fragment>
      Landing page
      <TicketPayment />
      <TicketList />
    </Fragment>
  )
}
