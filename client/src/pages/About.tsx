import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export const About: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Fragment>
      <h1>About</h1>
      <p>
        This is a platform to support customers on buying transportation tickets
      </p>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => navigate('/')}
      >
        Go back
      </button>
    </Fragment>
  )
}
