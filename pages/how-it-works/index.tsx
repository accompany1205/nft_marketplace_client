/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import StepCard, { TStepType } from './StepCard';
import SpecCard, { TSpecType } from './SpecCard';
import HeroSection from '../../components/common/heroSection';

const GlobalStyles = createGlobalStyle`
`;

const BuySteps:TStepType[] = [
  {
    id: 1,
    title: 'Place a bid or buy now',
  },
  {
    id: 2,
    title: 'Blockchain verification',
  },
  {
    id: 3,
    title: 'Receive the digital certificate',
  },
  {
    id: 4,
    title: 'Physical item is shipped to you',
  },
];

const SellSteps:TStepType[] = [
  {
    id: 1,
    title: 'Place an ask or sell now',
  },
  {
    id: 2,
    title: 'We check and hold your digital certificate',
  },
  {
    id: 3,
    title: 'You ship us the corresponding item',
  },
  {
    id: 4,
    title: 'You get paid instantly',
  },
];

const Specs:TSpecType[] = [
  {
    id: 1,
    iClassName: 'bg-color-2 icon_box-checked',
    title: 'Authentic Products',
    description: 'Only product owners with a digital certificate issued by a genuine brand can be sold on the marketplace, thus avoiding counterfeit objects',
  },
  {
    id: 2,
    iClassName: 'bg-color-2 icon_wallet',
    title: 'New or Grade A only',
    description: 'As we don\'t do returns, we only accept new or unused items. Reconditioned items are only considered for accessories and if brought to a level of standard Grade A or above. All items need to be in their original packaging with accessories. Please consult the FAQ for conditions details.',
  },
  {
    id: 3,
    iClassName: 'bg-color-2 icon_like',
    title: 'Blockchain Verified',
    description: 'Every item goes through a multi step verification process before processing the order. This is an added layer of security in the authenticity of the product and guaranteeing its origin and traceability',
  },
  {
    id: 4,
    iClassName: 'bg-color-2 icon_flowchart',
    title: 'Enhanced traceability',
    description: 'Each transaction is registered in the blockchain giving the buyers a total transparency on historical prices and background checks of each item',
  },
  {
    id: 5,
    iClassName: 'bg-color-2 icon_easel',
    title: 'Fair Pricing',
    description: 'The real time marketplace works like a stock market, allowing the objects to transact at a price that is determined by supply and demand',
  },
];

const HowItWorks:React.FC = () => {
  useEffect(() => {
    (window as any).onLoadFun();
  }, []);
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/css/plugins.css" />
        <link href="/static/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/static/css/how-it-works-custom.css" rel="stylesheet" type="text/css" />
      </Head>
      <GlobalStyles />
      <div id="wrapper">
        {/* content begin */}
        <div className="no-bottom no-top" id="content">
          <div id="top" />
          {/* section begin */}
          <HeroSection bgImgUrl="/static/images/background/subheader2.jpg" title="How it works" />
          {/* section close */}
          <div className="m-5 pt-5 padding30 br-15 bg-custom">
            <div className="container">
              <div className="row align-items-center mb-5">
                <div className="col-lg-3 order-lg-2 d-flex justify-content-end">
                  <img className="mb-4 mb-lg-0 img-fluid how-it-works__top-img" src="/static/images/how-it-works/web-3.svg" alt="" />
                </div>
                <div className="col-lg-9 mb-sm-30 order-lg-1">
                  <h2>
                    Embrace the
                    {' '}
                    <span className="text-gradient">web 3.0</span>
                    {' '}
                    marketplace standards.
                    {' '}
                  </h2>
                  <p className="lead">
                    As one of the only certified digital marketplace, only authentic and blockchain
                    verified
                    goods can be sold, thus
                    upgrading standards to a new level of transparency.
                  </p>
                </div>
              </div>
              <div className="row align-items-center pt-5">
                <div className="col-lg-9 mb-sm-30 order-sm-2">
                  <h2>
                    Trade in total transparency:
                    {' '}
                    <span className="text-gradient"> You are the market</span>
                  </h2>
                  <p className="lead">
                    You are the one that determines transaction prices, we don’t. Similar to a stock
                    market,
                    you can bid in real time or buy
                    instantly available goods reflecting the current demand. You can also
                    sell the item if
                    you own it on your own terms.
                    Transaction will occur, once one of the multiple Buyers and one of the multiple
                    sellers
                    reach a common selling point.
                  </p>
                </div>
                <div className="col-lg-3 order-sm-1">
                  <img className="mb-4 mb-lg-0 img-fluid how-it-works__top-img" src="/static/images/how-it-works/market.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* Easy Process */}
          <section aria-label="section" className="pt-4">
            <div className="container">
              <h2 className="text-center d-block">Easy Process</h2>
              <div className="small-border bg-color-2" />
              <div className="row mb-5">
                <div className="col-lg-12">
                  <h3 className="steps-module-heading">
                    You want to
                    {' '}
                    <span className="text-gradient">Buy</span>
                  </h3>
                </div>
                {
                BuySteps.map((step) => (
                  <StepCard step={step} key={step.id} />
                ))
              }
              </div>
              <div className="row mb-5">
                <div className="col-lg-12">
                  <h3 className="steps-module-heading">
                    You want to
                    {' '}
                    <span className="text-gradient">Sell</span>
                  </h3>
                </div>
                {
                SellSteps.map((step) => (
                  <StepCard step={step} key={step.id} />
                ))
              }
              </div>
            </div>
          </section>
          {/* Specs */}
          <section aria-label="section" className="pt-0">
            <div className="container">
              {/* <h2 class="text-center d-block">Easy Process</h2> */}
              {/* <div class="small-border bg-color-2"></div> */}
              <div className="row">
                {
                Specs.map((spec) => (
                  <SpecCard spec={spec} key={spec.id} />
                ))
              }
              </div>
            </div>
          </section>
        </div>
        {/* content close */}
        <a href="#" id="back-to-top" />
      </div>
    </>
  );
};
export default HowItWorks;
