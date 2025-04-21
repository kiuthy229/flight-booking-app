import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/ava-1.jpg'
import ava02 from '../../assets/ava-2.jpg'
import ava03 from '../../assets/ava-3.jpg'

const Testimonial: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          molestiae velit voluptatem neque facere ipsam non laboriosam! Sequi
          natus tenetur nulla animi, id sint debitis voluptate eius dolor
          voluptas. Perspiciatis!
        </p>
        <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h5 className="mb-0 mt-3">John Doe</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          molestiae velit voluptatem neque facere ipsam non laboriosam! Sequi
          natus tenetur nulla animi, id sint debitis voluptate eius dolor
          voluptas. Perspiciatis!
        </p>
        <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h5 className="mb-0 mt-3">Lia Franklin</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          molestiae velit voluptatem neque facere ipsam non laboriosam! Sequi
          natus tenetur nulla animi, id sint debitis voluptate eius dolor
          voluptas. Perspiciatis!
        </p>
        <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h5 className="mb-0 mt-3">John Doe</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          molestiae velit voluptatem neque facere ipsam non laboriosam! Sequi
          natus tenetur nulla animi, id sint debitis voluptate eius dolor
          voluptas. Perspiciatis!
        </p>
        <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h5 className="mb-0 mt-3">Lia Franklin</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  )
}

export default Testimonial
