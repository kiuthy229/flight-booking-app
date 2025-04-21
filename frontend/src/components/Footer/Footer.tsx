import React, { FC } from 'react'
import './footer.css'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import logo from '../../assets/logo.png'

import { Link } from 'react-router-dom'

interface LinkItem {
  display: string
  path: string
}

// const navLinks: LinkItem[] = [
//   { display: 'Home', path: '/' },
//   { display: 'About', path: '/about' },
//   { display: 'Tours', path: '/tours' },
// ]

const quickLinks: LinkItem[] = [
  { display: 'Gallery', path: '/gallery' },
  { display: 'Login', path: '/login' },
  { display: 'Register', path: '/register' },
]

const Footer: FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="logo" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi eum sunt ipsum libero soluta ducimus fuga possimus unde
                aliquid atque consequuntur, nulla assumenda dolores. Animi fuga
                soluta voluptate aliquid ratione.
              </p>
              <div className="social__links d-flex items-center justify-content-center gap-4">
                <span>
                  <Link to="#">
                    <i className="ri-youtube-line "></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-github-fill"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-facebook-fill "></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-instagram-fill "></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quickLinks.map((link, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={link.path}>{link.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quickLinks.map((link, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={link.path}>{link.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line "></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">thynmk2209@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line "></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">HCMC, Vietnam</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-fill "></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0">+84 123456789</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
