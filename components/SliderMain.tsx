import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slidermain = () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="spacer-single" />
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <h6 className="">
            <span className="text-uppercase color">DesignBook Live Market</span>
          </h6>
        </Reveal>
        <div className="spacer-10" />
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={300}
          duration={600}
          triggerOnce
        >
          <h1 className="">The only gateway to certified goods</h1>
        </Reveal>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={600}
          triggerOnce
        >
          <p className=" lead">
            Discover, buy, or sell Blockchain certified items
          </p>
        </Reveal>
        <div className="spacer-10" />
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={800}
          duration={900}
          triggerOnce
        >
          <span onClick={() => window.open('/#', '_self')} className="btn-main lead">Explore</span>
          <div className="mb-sm-30" />
        </Reveal>
      </div>
      <div className="col-md-6 xs-hide">
        <Reveal
          className="onStep"
          keyframes={fadeIn}
          duration={1500}
          triggerOnce
        >
          <img src="./img/misc/nft.png" className="lazy img-fluid" alt="" />
        </Reveal>
      </div>
    </div>
  </div>
);

export default slidermain;
