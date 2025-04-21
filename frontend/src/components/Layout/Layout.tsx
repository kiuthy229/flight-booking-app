import React, { FC } from 'react'
import Routers from '../../router/Routers'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  )
}

export default Layout
