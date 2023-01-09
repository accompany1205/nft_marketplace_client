"use client"
import React from "react";
import Particle from '../components/Particle';
import SliderParticles from '../components/SliderParticles';
import SliderImage from '../public/images/particleBg.jpg'
import Products from '../components/Products';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(131,100,226,.1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Home = () => {

  return <div>
    <GlobalStyles />
    <section className="jumbotron no-bg" style={{ backgroundImage: `url(${SliderImage.src})` }}>
      <Particle />
      <SliderParticles />
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='text-center'>
            <h2>Popular Items</h2>
            <div className="small-border"></div>
          </div>
        </div>
      </div>
      <Products />
    </section>

  </div>
};

export default Home;
