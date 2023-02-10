'use client';

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SliderMain from '../components/SliderMain';
import FeatureBox from '../components/FeatureBox';
import LastSoldItems from '../components/LastSoldItems';
import PopularBrands from '../components/PopularBrands';
import Categories from '../components/Categories';
import Footer from '../components/footer';
import ItemsYoullLike from '../components/ItemsYoullLike';

const Home = () => (
  <div>
    <section className="jumbotron breadcumb no-bg h-vh" style={{ backgroundImage: `url(${'./img/bg-shape-1.jpg'})` }}>
      <SliderMain />
    </section>
    <section className="container no-top no-bottom">
      <FeatureBox />
    </section>

    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Items you'll love</h2>
            <div className="small-border" />
          </div>
        </div>
        <div className="col-lg-12">
          <ItemsYoullLike />
        </div>
      </div>
    </section>

    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Last sold items</h2>
            <div className="small-border" />
          </div>
        </div>
        <div className="col-lg-12">
          <LastSoldItems />
        </div>
      </div>
    </section>

    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Popular brands</h2>
            <div className="small-border" />
          </div>
        </div>
        <div className="col-lg-12">
          <PopularBrands />
        </div>
      </div>
    </section>

    <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Categories</h2>
            <div className="small-border" />
          </div>
        </div>
        <div className="col-lg-12">
          <Categories />
        </div>
      </div>
    </section>

    <section className="container no-bottom">
      <div className="row wow fadeIn animated" style={{ backgroundSize: 'cover', visibility: 'visible', animationName: 'fadeIn' }}>
        {
        [{
          title: 'How to create NFT ITEM', desc: 'ciao ciao', picture: './images/7.jpg', date: 'October 28, 2020',
        },
        {
          title: 'How to create NFT ITEM', desc: 'ciao ciao', picture: './images/7.jpg', date: 'October 28, 2020',
        },
        {
          title: 'How to create NFT ITEM', desc: 'ciao ciao', picture: './images/7.jpg', date: 'October 28, 2020',
        },
        ].map((item, index) => (

          <div className="col-lg-4 col-md-6 mb-sm-30" style={{ backgroundSize: 'cover' }} key={index}>
            <div className="bloglist item" style={{ backgroundSize: 'cover' }}>
              <div className="post-content" style={{ backgroundSize: 'cover' }}>
                <div className="post-image" style={{ backgroundSize: 'cover' }}>
                  <img alt="" src={item.picture} className="lazy" style={{ maxHeight: '300px', borderRadius: '8px', objectFit: 'cover' }} />
                </div>
                <div className="post-text" style={{ backgroundSize: 'cover' }}>
                  <span className="p-tagline">Tips &amp; Tricks</span>
                  <span className="p-date">{item.date}</span>
                  <h4>
                    <a href="news-single.html">
                      {item.title}
                      <span />
                    </a>
                  </h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          </div>

        ))
      }
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
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{
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
              display: 'flex', justifyContent: 'space-around', paddingTop: '12px', paddingBottom: '12px',
            }}
          >
            <a href="https://www.hashpack.app/download"><img src="./images/bladeWalletLogo.webp" width="140px" alt="blade" /></a>
          </div>
          <div
            className="col-lg-3"
            style={{
              display: 'flex', justifyContent: 'space-around', paddingTop: '12px', paddingBottom: '12px',
            }}
          >
            <a href="https://www.bladewallet.io/"><img src="./images/walletsHashpack.webp" width="200px" alt="hashpack" /></a>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;
