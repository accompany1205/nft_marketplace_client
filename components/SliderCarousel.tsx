import React from 'react';
import Slider from 'react-slick';
import { Link } from '@reach/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sliderCarouselItems from './constants/sliderCarouselItems';

const SliderCarousel = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    // adaptiveHeight: 300,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="nft-big">
      <Slider {...settings}>
        {sliderCarouselItems.map((item) => (
          <div className="itm">
            <div className="nft_pic">
              <span>
                <Link to="/ItemDetail">
                  <span className="nft_pic_info">
                    <span className="nft_pic_title">{item.picTitle}</span>
                    <span className="nft_pic_by">{item.picBy}</span>
                  </span>
                </Link>
              </span>
              <div className="nft_pic_wrap">
                <img src={item.img} className="lazy img-fluid" alt="" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCarousel;
