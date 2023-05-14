import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomSlide: React.FC<{
  index: number;
  className: string;
  children: ReactNode;
}> = ({ ...props }) => <div {...props} />;

const PopularBrands: React.FC = () => {
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
          { name: 'Santoni', picture: './images/23.jpg' },
          { name: 'Luca Faloni', picture: './images/24.jpg' },
          { name: 'Artisan Lab', picture: './images/25.jpg' },
          { name: 'Santoni', picture: './images/23.jpg' },
          { name: 'Luca Faloni', picture: './images/24.jpg' },
          { name: 'Artisan Lab', picture: './images/25.jpg' },
        ].map((item, index) => (
          <CustomSlide className="itm" key={index} index={index}>
            <div
              className="nft_coll"
              style={{ backgroundColor: 'rgba(0,0,0,.1)' }}
            >
              <div className="nft_wrap">
                <span>
                  <img src={item.picture} className="lazy img-fluid" alt="" />
                </span>
              </div>

              <div
                className="nft_coll_info"
                style={{
                  width: '100%',
                  display: 'flex',
                  paddingTop: '8px',
                  paddingLeft: '8px',
                }}
              >
                <span>{item.name}</span>
              </div>
            </div>
          </CustomSlide>
        ))}
      </Slider>
    </div>
  );
};

export default PopularBrands;
