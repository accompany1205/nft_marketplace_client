import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  0% {
    opacity: 0
    -webkit-transform: translateY(40px)
    transform: translateY(40px)
  }
  100% {
    opacity: 1
    -webkit-transform: translateY(0)
    transform: translateY(0)
  }
`;

const featurebox = () => (
  <div className="row">
    <div className="col-lg-4 col-md-6 mb-3">
      <div
        className="feature-box f-boxed style-3"
        style={{ minHeight: '350px' }}
      >
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className="bg-color-2 i-boxed icon-search" />
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">Browse items</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              Search for listings by brand, model or colour. Place a desired
              purchase price or buy now. If you own the certificate of a non
              redeemed item, you can sell now or place a target price.
              <br />
              <br />
            </p>
          </Reveal>
        </div>
        <i className="wm icon-search" />
      </div>
    </div>
    <div className="col-lg-4 col-md-6 mb-3">
      <div
        className="feature-box f-boxed style-3"
        style={{ minHeight: '350px' }}
      >
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed icon-wallet" />
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">Purchase or sell</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              Listings show the best bid/offer at any given time and will inform
              you of any changes if you have taken part in the sale. Once a deal
              is closed, you’ll get the digital certificate once checked on the
              Blockchain.
            </p>
          </Reveal>
        </div>
        <i className="wm icon-wallet" />
      </div>
    </div>
    <div className="col-lg-4 col-md-6 mb-3">
      <div
        className="feature-box f-boxed style-3"
        style={{ minHeight: '350px' }}
      >
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed icon-gift" />
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">Redeem</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              You will receive the digital certificate on your wallet, you can
              keep it, resell on the exchange or redeem it to receive the
              physical product. Sellers will get their money once the
              certificate has been transferred.
            </p>
          </Reveal>
        </div>
        <i className="wm icon-gift" />
      </div>
    </div>
  </div>
);
export default featurebox;
