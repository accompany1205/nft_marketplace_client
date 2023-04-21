/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import HeroSection from '../../components/common/heroSection';
import Journey from '../../components/common/journey';
import FeatureCard from '../../components/common/featured-card';
import useLoadCustomJs from '../../hooks/useLoadCustomJs';

const GlobalStyles = createGlobalStyle`
`;

const Features = [
  {
    id: 1,
    title: 'Market Driven Pricing',
    description: 'The real time marketplace works like a stock market, allowing products to transact at a price that is determined by supply and demand. You have full transparency and real-time tracking throughout the bidding trend, and analytics over historical pricing data.',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_easel',
    bgIClassName: 'wm icon_easel',
  },
  {
    id: 2,
    title: 'Quality and Curation',
    description: 'We partner directly with brands that store the products at their facilities and issue unique product ownership IDs using our blockchain technology. Only items exclusively produced by the brand and linked to blockchain digital certificates are able to be sold.',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_like',
    bgIClassName: 'wm icon_like',
  },
  {
    id: 3,
    title: 'Next Level Experiences',
    description: 'Along with your items, brands can offer digital certificate holders, an exclusive range of aftersale services and perks tied to them.',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_tags_alt',
    bgIClassName: 'wm icon_tags_alt',
  },
  {
    id: 4,
    title: 'Guarantees the Genuineness',
    description: 'Our industry professionals verify products genuineness and condition up to the highest standard. This coupled with public blockchain registration and unique product ownership ID giving you full confidence in your secondary purchase.',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_box-checked',
    bgIClassName: 'wm icon_box-checked',
  },
];

const BuyerPage = () => {
  useLoadCustomJs({ src: '/static/js/designesia.js' });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/css/plugins.css" />
        <link href="/static/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/static/css/buyers-page-custom.css" rel="stylesheet" type="text/css" />
      </Head>
      <GlobalStyles />
      <div id="wrapper">
        {/* content begin */}
        <div className="no-bottom no-top" id="content">
          <div id="top" />
          {/* section begin */}
          <HeroSection title="Buyer Page">
            <p>Gaining ownership to your favourite items with DesignBook is easy and trustworthy</p>
          </HeroSection>
          {/* section close */}
          <div className="mt-lg-4 pt-5 px-0 padding30 br-15 bg-custom">
            <div className="container">
              <Journey
                title="Place a Bid or Buy Now"
                descriprion="The live Marketplace will show you the lowest offer at any given time. You can choose to buy now and secure the product or place a bid and see if any sellers are willing to improve their offer. Note that it's a live market, other buyers can compete with you on the price, so you can also change your bid at any time. All improvements in the prices from sellers or buyers will be notified to you in full transparency. Only bidders with sufficient balance in their wallet are able to place an order."
                imgSrc="/static/images/buyers-page/online-shopping.svg"
                imgWrapperClasses="order-lg-2"
              />
              <Journey
                title="Designbook Blockchain Verification"
                descriprion="Once you're matched with a seller at an agreed price, you're both taken out of the listing and market resume between other parties involved. Your amount is pulled into an escrow account along with the seller's certificate while pending verification."
                imgSrc="/static/images/buyers-page/two-factor-authentication.svg"
              />
              <Journey
                title="Receive the Digital Certificate"
                descriprion="We make sure to check asap the authenticity of the certificate. Once validated, you receive the digital certificate in your wallet, that may also contain and give you access to aftersales perks linked to the item."
                imgSrc="/static/images/buyers-page/certificate.svg"
                imgWrapperClasses="order-lg-2"
              />
              <Journey
                title="Receive Your Physical Item"
                descriprion="You have the option to redeem the physical item and have it securely shipped to you directly from the brand’s facility."
                progressSvg={(
                  <div className="down-marker__area down-marker__area-last">
                    <svg className="down-arrow__circle-svg" stroke="var(--secondary-color)" viewBox="0 0 24 24">
                      <polyline fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} points="6,12 10,16 18,8" />
                    </svg>
                  </div>
              )}
                imgSrc="/static/images/buyers-page/deliveries.svg"
              />
            </div>
          </div>
          {/* Benefits */}
          <section id="section-steps" data-bgcolor="#F7F4FD">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center mb-5">
                    <h2>Benefits</h2>
                    <div className="small-border bg-color-2" />
                  </div>
                </div>
                {
                Features.map((feature) => (

                  <FeatureCard
                    key={feature.id}
                    title={feature.title}
                    description={feature.description}
                    iClassName={feature.iClassName}
                    bgIClassName={feature.bgIClassName}
                    variant="medium"
                  />
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

export default BuyerPage;
