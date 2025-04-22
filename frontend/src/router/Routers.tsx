import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'

import Register from '../pages/Register'
import Login from '../pages/Login'
import Checkout from '../pages/Checkout'
import ThankYou from '../pages/ThankYou'
import FlightsSearchResult from '../pages/FlightsSearchResult'
import Flights from '../pages/Flights'
import FlightDetails from '../pages/FlightDetails'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/flight-details" element={<FlightDetails />} />
      <Route path="/flights/search" element={<FlightsSearchResult />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  )
}

export default Routers
