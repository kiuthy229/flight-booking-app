import React from 'react'
import '../styles/home.css'

import { Container, Row, Col } from 'reactstrap'
import Subtitle from '../shared/Subtitle/Subtitle'
import SearchBar from '../shared/SearchBar/SearchBar'
import Testimonial from '../components/Testimonial/Testimonial'
import Newsletter from '../shared/Newsletter/Newsletter'

export const Home: React.FC = () => {
  return (
    <>
      {/* Banner */}
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <Subtitle subtitle="Know Before You Go" />
                <img src={'/'} alt="" />
              </div>
              <h1>
                Traveling opens the door to creating{' '}
                <span className="highlight">memories</span>
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, molestiae velit voluptatem neque facere ipsam non
                laboriosam! Sequi natus tenetur nulla animi, id sint debitis
                voluptate eius dolor voluptas. Perspiciatis!
              </p>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={'/'} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={'/'} controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={'/'} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={'Experience'} />
                <h2>
                  With our all experience <br /> we are here to help you to find
                  the
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <br />
                  Excepturi dolorem accusantium repellendus, iusto minima in
                  nulla
                  <br />
                  possimus, temporibus, soluta qui explicabo necessitatibus
                  quam!
                  <br />
                  Illum quia maxime provident ratione molestias a.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>12k</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>5</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={'/'} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonial */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Fans Love'} />
              <h2 className="testimonial_title">Whats our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  )
}
