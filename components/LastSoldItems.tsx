import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomSlide: React.FC<{
  index: number;
  className: string;
  children: ReactNode;
}> = ({ ...props }) => <div {...props} />;

const LastSoldItems: React.FC = () => {
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
          {
            name: 'Jordan 11 Retro Cherry',
            picture: './images/28.jpg',
            lastSale: '$224',
          },
          {
            name: 'Jordan 2 Retro OG',
            picture: './images/29.jpg',
            lastSale: '$149',
          },
          {
            name: 'Jordan 11 Retro',
            picture: './images/34.jpg',
            lastSale: '$293',
          },
          {
            name: 'Jordan 11 Retro',
            picture: './images/37.jpg',
            lastSale: '$481',
          },
          {
            name: 'Jordan 11 Retro Cherry',
            picture: './images/28.jpg',
            lastSale: '$224',
          },
          {
            name: 'Jordan 2 Retro OG',
            picture: './images/29.jpg',
            lastSale: '$149',
          },
          {
            name: 'Jordan 11 Retro',
            picture: './images/34.jpg',
            lastSale: '$293',
          },
          {
            name: 'Jordan 11 Retro',
            picture: './images/37.jpg',
            lastSale: '$481',
          },
        ].map((item, index) => (
          <CustomSlide className="itm" key={index} index={index}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <span>
                  <img src={item.picture} className="lazy img-fluid" alt="" />
                </span>
              </div>

              <div className="nft_coll_info" style={{ paddingTop: '8px' }}>
                <span onClick={() => window.open('/home', '_self')}>
                  <h4>Abstraction</h4>
                </span>
                <span>{`Last Sale: ${item.lastSale}`}</span>
              </div>
            </div>
          </CustomSlide>
        ))}
      </Slider>
    </div>
  );
};

export default LastSoldItems;
