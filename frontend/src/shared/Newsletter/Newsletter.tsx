import React from 'react'
import './newsletter.css'
import { Container, Row, Col, Input } from 'reactstrap'

const Newsletter: React.FC = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Stay Updated with Our Latest Deals</h2>
              <div className="newsletter__input">
                <Input type="email" placeholder="Enter your email" />
                <button className="newsletter__btn btn" type="button">
                  Subscribe
                </button>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, molestiae velit voluptatem neque facere ipsam non
                laboriosam! Sequi natus tenetur nulla animi, id sint debitis
                voluptate eius dolor voluptas. Perspiciatis!
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={'#add a plane image'} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter
