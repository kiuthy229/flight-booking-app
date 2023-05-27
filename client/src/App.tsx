import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import LoginForm from './components/LoginForm/LoginForm'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
