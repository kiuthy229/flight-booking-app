import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthSelector } from '../store/users/usersSlice'
import FindTicket from '../components/FindTicket/FindTicket'

export const About: React.FC = () => {
  const isAuth = useSelector(isAuthSelector)

  return isAuth ? (
    <>
      <FindTicket />
    </>
  ) : (
    <Navigate to="/login" />
  )
}
