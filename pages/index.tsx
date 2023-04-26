'use client';

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import SliderMain from '../components/SliderMain';
import FeatureBox from '../components/FeatureBox';
import LastSoldItems from '../components/LastSoldItems';
import PopularBrands from '../components/PopularBrands';
import Catgor from '../components/Catgor';
import useMobileMode from '../hooks/useMobileMode';

const Home = () => {
  const mobileMode = useMobileMode();
  return (
    <div>
      <section
        className="jumbotron breadcumb no-bg h-vh"
        style={
          mobileMode
            ? {}
            : { backgroundImage: `url(${'./images/homeBackgroundNew.jpg'})` }
        }
      >
        <SliderMain />
      </section>
      <section className="container no-top no-bottom">
        <div className="col-lg-12">
          <div className="text-left">
            <h2 className="style-2" style={{ marginBottom: '28px' }}>
              How it works
            </h2>
          </div>
        </div>
        <FeatureBox />
      </section>
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-left">
              <h2 className="style-2" style={{ marginBottom: '28px' }}>
                Browse by category
              </h2>
            </div>
          </div>
        </div>
        <Catgor />
      </section>
      <section style={{ backgroundColor: 'rgb(255, 249, 225)' }}>
        <div className="container">
          <div className="col-lg-12">
            <div className="text-left">
              <h2 className="style-2" style={{ marginBottom: '28px' }}>
                Last items sold
              </h2>
            </div>
          </div>
          <div className="col-lg-12">
            <LastSoldItems />
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: 'rgb(246, 245, 251)' }}>
        <div className="container">
          <div className="col-lg-12">
            <div className="text-left">
              <h2 className="style-2" style={{ marginBottom: '28px' }}>
                Popular brands
              </h2>
            </div>
          </div>
          <div className="col-lg-12">
            <PopularBrands />
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: 'rgb(247, 255, 231)' }}>
        <div className="container">
          <div className="col-lg-12">
            <div className="text-left">
              <h2 className="style-2" style={{ marginBottom: '28px' }}>
                Latest news
              </h2>
            </div>
          </div>
          <div
            className="row wow fadeIn animated"
            style={{
              backgroundSize: 'cover',
              visibility: 'visible',
              animationName: 'fadeIn',
            }}
          >
            {[
              {
                title: 'Ralph Lauren Accelerates Web3 Push with NFT Gift Initiative',
                desc: 'Hugely popular fashion brand, Ralph Lauren, has kicked off its Web3 push by distributing NFT gifts to the...',
                picture: './images/ralph-lauren.png',
                date: 'April 9, 2023',
                category: 'NFT FASHION NEWS',
                link: 'https://nftplazas.com/ralph-lauren-nft/',
              },
              {
                title: 'Yuga Labs’ Otherside Drops First Gucci Relic',
                desc: 'Less than a week after news of a collaboration between luxury fashion house, Gucci, and leading Web3 firm...',
                picture: './images/gucci.png',
                date: 'APRIL 5, 2023',
                category: 'NFT FASHION NEWS',
                link: 'https://nftplazas.com/yuga-labs-gucci-relic/',
              },
              {
                title: 'Clarks Shoes Takes a Walk in the Decentraland Metaverse',
                desc: 'Renowned British footwear brand, Clarks Shoes, has ventured into the virtual realm with the debut of Clar...',
                picture: './images/decentraland.png',
                date: 'MARCH 31, 2023',
                category: 'DECENTRALAND NEWS',
                link: 'https://nftplazas.com/clarks-shoes-metaverse/',
              },
            ].map((item, index) => (
              <div
                className="col-lg-4 col-md-6 mb-sm-30"
                style={{ backgroundSize: 'cover' }}
                key={index}
              >
                <Link href={item.link} target="_blank">
                  <div
                    className="bloglist item"
                    style={{ backgroundSize: 'cover' }}
                  >
                    <div
                      className="post-content"
                      style={{ backgroundSize: 'cover' }}
                    >
                      <div
                        className="post-image"
                        style={{ backgroundSize: 'cover' }}
                      >
                        <img
                          alt=""
                          src={item.picture}
                          className="lazy"
                          style={{
                            maxHeight: '300px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div
                        className="post-text"
                        style={{ backgroundSize: 'cover' }}
                      >
                        <span className="p-tagline">{item.category}</span>
                        <span className="p-date">{item.date}</span>
                        <h4>
                          {item.title}
                        </h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div
          className="container"
          style={{
            backgroundColor: '#55427F',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="row" style={{ display: 'flex', flex: 1 }}>
            <div
              className="col-lg-6"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '28px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                }}
              >
                Download Partner Wallets
              </div>
            </div>
            <div
              className="col-lg-3"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingTop: '12px',
                paddingBottom: '12px',
              }}
            >
              <a href="https://www.hashpack.app/download">
                <img
                  src="./images/bladeWalletLogo.webp"
                  width="140px"
                  alt="blade"
                />
              </a>
            </div>
            <div
              className="col-lg-3"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingTop: '12px',
                paddingBottom: '12px',
              }}
            >
              <a href="https://www.bladewallet.io/">
                <img
                  src="./images/walletsHashpack.webp"
                  width="200px"
                  alt="hashpack"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
