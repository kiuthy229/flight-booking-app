import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { isAuthSelector } from '../../store/users/usersSlice'

export const Navbar: React.FC = () => {
  const isAuth = useSelector(isAuthSelector)

  const logout = () => {
    localStorage.removeItem('user')
  }

  return (
    <nav>
      <div className="nav-wrapper cyan darken-1 px1">
        <NavLink to="/" className="brand-logo">
          FlightExpress
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li cy-data="home-nav-link">
            <NavLink to="/">Home</NavLink>
          </li>

          {isAuth ? (
            <>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li onClick={() => logout()}>
                <NavLink to="/">Log out</NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
