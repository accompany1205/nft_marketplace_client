/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import StepCard, { TStepType } from './StepCard';
import SpecCard, { TSpecType } from './SpecCard';
import HeroSection from '../../components/common/heroSection';
import useLoadCustomJs from '../../hooks/useLoadCustomJs';

const GlobalStyles = createGlobalStyle`
`;

const BuySteps:TStepType[] = [
  {
    id: 1,
    title: 'Place a bid or buy now',
  },
  {
    id: 2,
    title: 'Blockchain validation',
  },
  {
    id: 3,
    title: 'Receive the redeemable product',
  },
  {
    id: 4,
    title: 'Collect, resell or redeem the product',
  },
];

const SellSteps:TStepType[] = [
  {
    id: 1,
    title: 'Place an ask or sell now',
  },
  {
    id: 2,
    title: 'We check that the certificate is non-redeemed',
  },
  {
    id: 3,
    title: 'Blockchain validation',
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
    title: 'New Authentic Products',
    description: 'Only non-redeemed products with a digital certificate issued by a genuine brand can be sold on the marketplace, thus avoiding counterfeit objects. As we exchange non redeemed products, all items are brand new and shipped directly from the brand facility. Please consult the FAQ for conditions details.',
  },
  {
    id: 2,
    iClassName: 'bg-color-2 icon_like',
    title: 'Blockchain Verified',
    description: 'Every item goes through a multi step verification process before processing the order. This is an added layer of security in the authenticity of the product and guaranteeing its origin and traceability',
  },
  {
    id: 3,
    iClassName: 'bg-color-2 icon_flowchart',
    title: 'Market Driven Pricing',
    description: 'Each transaction is registered in the blockchain. By giving total transparency on historical prices, the real time marketplace works like a stock market, allowing transactions at a price that is determined by supply and demand.',
  },
];

const HowItWorks:React.FC = () => {
  useLoadCustomJs({ src: '/static/js/designesia.js' });

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
          <HeroSection title="How it works" />
          {/* section close */}
          <div className="m-5 mt-0 pt-5 padding30 br-15 bg-custom">
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
                    marketplace standards
                    {' '}
                  </h2>
                  <p className="lead">
                    Designbook is the only certified digital marketplace;
                    only non-redeemed authentic blockchain verified products can be sold,
                    thus upgrading standards to a new level of transparency and curation.
                  </p>
                </div>
              </div>
              <div className="row align-items-center pt-5 mb-5">
                <div className="col-lg-9 mb-sm-30 order-sm-2">
                  <h2>
                    Trade in total transparency:
                    {' '}
                    <span className="text-gradient"> You are the market</span>
                  </h2>
                  <p className="lead">
                    Similar to a stock market, you can bid in real time
                    or buy instantly available certificates reflecting the current demand.
                    You can also sell the item if you own it on your own terms.
                    Transaction will occur, once one of the multiple Buyers and
                    one of the multiple sellers reach a common selling point.
                  </p>
                </div>
                <div className="col-lg-3 order-sm-1">
                  <img className="mb-4 mb-lg-0 img-fluid how-it-works__top-img" src="/static/images/how-it-works/market.svg" alt="" />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-3 order-lg-2 d-flex justify-content-end">
                  <img className="mb-4 mb-lg-0 img-fluid how-it-works__top-img" src="/static/images/how-it-works/web-3.svg" alt="" />
                </div>
                <div className="col-lg-9 mb-sm-30 order-lg-1">
                  <h2>
                    Redeem at
                    {' '}
                    <span className="text-gradient">any</span>
                    {' '}
                    time
                    {' '}
                  </h2>
                  <p className="lead">
                    Only non-redeemed products can be transacted thus guaranteeing authenticity
                    and the highest standard of quality of every product sold.
                    You can redeem the product at any time by requesting its redemption.
                  </p>
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
