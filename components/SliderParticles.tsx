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
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;

const SliderParticles = () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="spacer-single" />
        <div className="spacer-double" />
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={300}
          duration={900}
          triggerOnce
        >
          <h1 className="col-white">Create, sell or collect Sneakers.</h1>
        </Reveal>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={900}
          triggerOnce
        >
          <p className="lead col-white">The New Jordan x Retro Collection is here</p>
        </Reveal>
        <div className="spacer-10" />
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={800}
          duration={900}
          triggerOnce
        >
          <span
            onClick={() => window.open('#', '_self')}
            className="btn-main inline lead"
          >
            Shop Now
          </span>
          <div className="mb-sm-30" />
        </Reveal>
      </div>
    </div>
  </div>
);

export default SliderParticles;
