import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from './Clock';
import carouselNewItems from './constants/carouselNewItems';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CarouselNew = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // adaptiveHeight: 300,
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

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }: any) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };
  return (
    <div className="nft">
      <Slider {...settings}>
        {carouselNewItems.map((item) => (
          <div className="itm">
            <div className="d-item">
              <div className="nft__item">
                {item.deadline && (
                  <div className="de_countdown">
                    <Clock deadline={item.deadline} />
                  </div>
                )}
                <div className="author_list_pp">
                  <a href={item.imgUrl}>
                    <img className="lazy" src={item.author} alt="" />
                    <i className="fa fa-check" />
                  </a>
                </div>
                <div
                  className="nft__item_wrap"
                  style={{ height: `${height}px` }}
                >
                  <Outer>
                    <span>
                      <img
                        src={item.static}
                        className="lazy nft__item_preview"
                        onLoad={onImgLoad}
                        alt=""
                      />
                    </span>
                  </Outer>
                </div>
                <div className="nft__item_info">
                  <a href={item.titleUrl}>
                    <h4>{item.title}</h4>
                  </a>
                  <div className="nft__item_price">
                    {item.price.label}
                    <span>{item.price.value}</span>
                  </div>
                  <div className="nft__item_action">
                    <span onClick={() => window.open('/#', '_self')}>
                      Place a bid
                    </span>
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselNew;
