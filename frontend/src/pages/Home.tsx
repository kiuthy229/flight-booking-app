import React from 'react'
import '../styles/home.css'

import { Container, Row, Col } from 'reactstrap'
import Subtitle from '../shared/Subtitle/Subtitle'
import SearchBar from '../shared/SearchBar/SearchBar'
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
                <Subtitle subtitle="Discover the World" />
                <img src={'/'} alt="" />
              </div>
              <h1>
                Adventure awaits, step into the{' '}
                <span className="highlight">unknown</span>
              </h1>
              <p>
                Embrace the journey, for every step you take leads to new
                horizons. Discover the beauty of the world, one destination at a
                time. Let your heart guide you to places you've never imagined.
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
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={'/'} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  )
}
