import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { About } from '../pages/About'

import Register from '../pages/Register'
import Login from '../pages/Login'
import Checkout from '../pages/Checkout'
import ThankYou from '../pages/ThankYou'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/tickets" element={<TicketList />} /> */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  )
}

export default Routers
