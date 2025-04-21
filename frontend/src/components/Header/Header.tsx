import React, { useRef, useEffect, useContext, useState, FC } from 'react'
import {
  Container,
  Row,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.jpg'
import './header.css'

interface NavLinkItem {
  path: string
  display: string
}

const navLinks: NavLinkItem[] = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tickets',
    display: 'Tickets',
  },
]

const Header: FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, dispatch } = useContext(AuthContext)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const stickyHeaderFunc = () => {
    const handleScroll = () => {
      if (headerRef?.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList.add('sticky__header')
        } else {
          headerRef.current.classList.remove('sticky__header')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  useEffect(() => {
    const cleanup = stickyHeaderFunc()
    return cleanup
  }, [])

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="d-none d-md-flex navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {navLinks.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'active__link' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="nav__right d-flex align-items-center gap-4">
                {user ? (
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-1">
                      <img
                        src={user.photo || avatar}
                        alt="User Avatar"
                        className="user__avatar"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                      />
                      <span className="user__name">{user.username}</span>
                    </div>
                    <button
                      className="btn secondary__btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="nav__btns d-flex align-items-center gap-4">
                    <Link to="/login" className="btn secondary__btn">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn primary__btn text-nowrap"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <span className="mobile__menu d-md-none" onClick={toggleMobileMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </Row>
      </Container>
      <Offcanvas
        isOpen={isMobileMenuOpen}
        toggle={toggleMobileMenu}
        direction="start"
      >
        <OffcanvasHeader toggle={toggleMobileMenu}>Menu</OffcanvasHeader>
        <OffcanvasBody>
          <ul className="menu d-flex flex-column gap-3">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? 'active__link' : ''
                  }
                  onClick={toggleMobileMenu}
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </OffcanvasBody>
      </Offcanvas>
    </header>
  )
}

export default Header
