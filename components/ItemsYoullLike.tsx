/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomSlide: React.FC<{
  index: number;
  className: string;
  children: ReactNode;
}> = ({ ...props }) => <div {...props} />;

const ItemsYoullLike: React.FC = () => {
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
        {[
          { label: 'Bags', picture: './images/14.jpg' },
          { label: 'Leather goods', picture: './images/11.jpg' },
          { label: 'Jewellery', picture: './images/15.jpg' },
          { label: 'Shoes', picture: './images/7.jpg' },
          { label: 'Watches', picture: './images/10.jpg' },
          { label: 'Sunglasses', picture: './images/13.jpg' },
        ].map((item, index) => (
          <CustomSlide className="itm" index={index}>
            <div style={{ width: '280px', height: '280px' }}>
              <img
                src={item.picture}
                className="lazy img-fluid"
                alt=""
                style={{ width: '280px', height: '280px' }}
              />
              <div
                style={{
                  width: '279px',
                  backgroundColor: 'rgba(0,0,0,.10)',
                  height: '40px',
                  position: 'relative',
                  bottom: '40px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    color: 'white',
                    paddingLeft: '20px',
                    fontWeight: 'bold',
                    fontSize: '19px',
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          </CustomSlide>
        ))}
      </Slider>
    </div>
  );
};

export default ItemsYoullLike;
