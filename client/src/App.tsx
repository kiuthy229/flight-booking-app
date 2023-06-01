import React from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import TicketList from './components/TicketList/TicketList'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import RegisterForm from './components/RegisterForm/RegisterForm'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
