/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import HeroSection from '../../components/common/heroSection';
import Journey from '../../components/common/journey';

const GlobalStyles = createGlobalStyle`
`;

const AboutUs = () => {
  useEffect(() => {
    (window as any).onLoadFun();
  }, []);
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/css/plugins.css" />
        <link href="/static/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/static/css/about-us-custom.css" rel="stylesheet" type="text/css" />

      </Head>
      <GlobalStyles />

      <div id="wrapper">
        {/* content begin */}
        <div id="top" />
        {/* section begin */}
        <HeroSection bgImgUrl="/static/images/background/subheader2.jpg" title="About Us" />
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-4 text-center text-md-start">
                <img className="mb-4 mb-lg-0 img-fluid how-it-works__top-img" src="/static/images/about-us/goal.svg" alt="" />
              </div>
              <div className="col-lg-9 col-md-8 mb-sm-30 text-center text-md-start">
                <h2>
                  Our
                  {' '}
                  <span className="text-gradient">Goal</span>
                </h2>
                {/* <div class="small-border bg-color-2 sm-left"></div> */}
                <p className="lead">
                  Using blockchain technology to raise industry standards and democratise secondary
                  market
                </p>
              </div>
            </div>
          </div>
        </section>
        <section data-bgcolor="#F7F4FD">
          <div className="container">
            <div className="text-center mb-5">
              <h2>Our Story</h2>
              <div className="small-border bg-color-2" />
              <p className="lead">
                Designbook was created in October 2021 by a group of Italian entrepreneurs from the
                fashion and tech industry, aiming to develop breakthrough applications on Blockchain
                and help Fashion Brands to embrace the evolution of Web 3.0. Our vision is to help
                brands to transition to a circular business model, which enhances trust and
                transparency for customers, together with innovation and traceability for
                fashion products and services.
              </p>
            </div>
            <div className="row">
              <div className="mb-4 col-md-6 col-lg-3 mb-sm-30">
                <img className="img-fluid" src="/static/images/about-us/1.jpg" alt="" />
              </div>
              <div className="mb-4 col-md-6 col-lg-3 mb-sm-30">
                <img className="img-fluid" src="/static/images/about-us/2.jpg" alt="" />
              </div>
              <div className="mb-4 col-md-6 col-lg-3 mb-sm-30">
                <img className="img-fluid" src="/static/images/about-us/3.jpg" alt="" />
              </div>
              <div className="mb-4 col-md-6 col-lg-3 mb-sm-30">
                <img className="img-fluid" src="/static/images/about-us/6.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/* partners */}
        <section className="pb-5">
          <div className="container">
            <div className="text-center">
              <h2>Our Partners</h2>
              <div className="small-border bg-color-2" />
            </div>
            <div className="our-partners d-flex flex-wrap">
              <img src="/static/images/about-us/hedera.png" alt="" />
              <img src="/static/images/about-us/fireblocks.png" alt="" />
              <img src="/static/images/about-us/onfido.png" alt="" />
              <img src="/static/images/about-us/confindustria.png" alt="" />
              <img src="/static/images/about-us/marangoni.png" alt="" />
              <img src="/static/images/about-us/milano.png" alt="" />
            </div>
          </div>
        </section>
        {/* counter */}
        <section data-bgcolor="#F7F4FD">
          <div className="container">
            <div className="text-center mb-4">
              <h2>Key Metrics</h2>
              <div className="small-border bg-color-2" />
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="row">
                  <div className="col-sm-6 wow fadeInUp text-center mt-2 mb-4 my-sm-0" data-wow-delay="0s">
                    <div className="de_count">
                      <h3><span className="timer" data-to={2} data-speed={1000}>0</span></h3>
                      <h5 className="id-color">Authentication Centers</h5>
                    </div>
                  </div>
                  <div className="col-sm-6 wow fadeInUp text-center" data-wow-delay=".25s">
                    <div className="de_count">
                      <h3>
                        <span className="timer" data-to={16000} data-speed={2000}>0</span>
                        k
                      </h3>
                      <h5 className="id-color">Designbook members</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Commitments & Values */}
        <section>
          <div className="container">
            <div className="text-center mb-5">
              <h2>Commitments &amp; Values</h2>
              <div className="small-border bg-color-2" />
            </div>
            <Journey
              title="Committed to Quality"
              descriprion="As counterfeits become more and more mainstream and sophisticated, our duty is to ensure customers get what they pay for. Even by passing multiple visual and physical checks, RFID and labels can also be copied, making it almost impossible technically to assess the authenticity of an item. We commit to only working with brands that have the same commitment to quality and strive to offer customers a higher experience in their purchase by emitting digital certificates for each item sold, guaranteeing exclusivity and curation of trustworthy marketplace content."
              imgSrc="/static/images/about-us/quality.svg"
              imgWrapperClasses="order-lg-2"
              hidePregressImg
            />
            <Journey
              title="Committed to Innovation"
              descriprion="We aim to revolutionise the fashion industry by creating solutions that help brands to strengthen their personal relationship with their communities in a secure way where they can give access to a completely new level of products and services whether they are digital or physical. Our set of integrated technology solutions ensures both circularity of data ownership and traceability on secondary sales. In turn, we provide customers answers to higher expectations in additional service, transparency on the product and also ownership."
              imgSrc="/static/images/about-us/innovation.svg"
              hidePregressImg
            />
            <Journey
              title="Committed to a Sustainability"
              descriprion="We are committed to an ethical approach when it comes to energy consumption, and believe the life of every product is cyclical. We aim to promote sustainability in the fashion industry by giving a SECOND LIFE to authenticated products or Service on the platform, making ownership transfer easy."
              imgSrc="/static/images/about-us/sustainability.svg"
              imgWrapperClasses="order-lg-2"
              hidePregressImg
            />
            <Journey
              title="Committed to Market Fairness"
              descriprion="We are committed to preventing market manipulation, allowing your exclusive goods to transact at a price that is purely determined by real time supply and demand."
              imgSrc="/static/images/about-us/fair.svg"
              hidePregressImg
            />
          </div>
        </section>
        <a href="#" id="back-to-top" />
      </div>
    </>
  );
};

export default AboutUs;
