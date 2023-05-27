import React, { Fragment } from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'

export const Home: React.FC = () => {
  return (
    <Fragment>
      <h1>FlightExpress</h1>
      <p>Welcome</p>
      <RegisterForm />
    </Fragment>
  )
}
