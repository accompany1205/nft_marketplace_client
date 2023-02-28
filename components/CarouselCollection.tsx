import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carouselCollectionItems from './constants/carouselCollectionItems';

const CarouselCollection = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
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
    <div className="nft">
      <Slider {...settings}>
        {carouselCollectionItems.map((item) => (
          <div className="itm">
            <div className="nft_coll">
              <div className="nft_wrap">
                <span>
                  <img src={item.coll} className="lazy img-fluid" alt="" />
                </span>
              </div>
              <div className="nft_coll_pp">
                <a href={item.url}>
                  <img className="lazy" src={item.author} alt="" />
                </a>
                <i className="fa fa-check" />
              </div>
              <div className="nft_coll_info">
                <a href={item.url}>
                  <h4>{item.title}</h4>
                </a>
                <span>{item.code}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselCollection;
