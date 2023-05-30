import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { isAuthSelector } from '../store/users/usersSlice'

export const About: React.FC = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelector)

  return isAuth ? (
    <Fragment>
      <h1>About</h1>
      <p>
        This is a platform to support customers on buying transportation tickets
      </p>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => navigate('/tickets')}
      >
        Browse tickets
      </button>
    </Fragment>
  ) : (
    <Navigate to="/login" />
  )
}
