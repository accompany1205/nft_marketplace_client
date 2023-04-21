/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import HeroSection from '../../components/common/heroSection';
import FeatureCard from '../../components/common/featured-card';
import Journey from '../../components/common/journey';
import useLoadCustomJs from '../../hooks/useLoadCustomJs';

const GlobalStyles = createGlobalStyle`
`;

const Features = [
  {
    id: 1,
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_like',
    title: 'Product Authenticity',
    description: 'Public Blockchain registration and unique labels/serial numbers guarantee authenticity of products on secondary exchanges',
    bgIClassName: 'wm icon_like',

  },
  {
    id: 2,
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_cart_alt',
    title: 'Aftersale advantages remains',
    description: 'Certificate of authenticity can contain aftersales perks than will then be transferred to the new owner of the item',
    bgIClassName: 'wm icon_cart_alt',
  },
  {
    id: 3,
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_flowchart',
    title: 'Data tracking',
    description: 'From the commercialisation to resale, you get to know the lifecycle of each product adding trust in the purchase experience',
    bgIClassName: 'wm icon_flowchart',
  },
];
const Certification = () => {
  useLoadCustomJs({ src: '/static/js/designesia.js' });

  return (
    <>
      <Head>
        <link href="/static/css/style.css" rel="stylesheet" type="text/css" />
      </Head>
      <GlobalStyles />
      <div id="wrapper">
        {/* content begin */}
        <div id="top" />
        {/* section begin */}
        <HeroSection title="Certification" />
        {/* Process */}
        <section className="py-3 py-lg-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2>We control the process at every stage of the sale.</h2>
              <div className="small-border bg-color-2" />
            </div>
            <Journey
              title="Before the Sale"
              descriprion="Only products and services linked to a certificate of authenticity issued by an original brand who is registered on the blockchain can be sold thus avoiding counterfeits."
              imgSrc="/static/images/certification/before.svg"
              imgWrapperClasses="order-lg-2"
            />
            <Journey
              title="At the sale"
              descriprion="Only owners of genuine certificates can participate as sellers in the transaction filtering only serious sellers. Only buyers with sufficient funds can place bids avoiding market manipulation."
              imgSrc="/static/images/certification/at.svg"
              imgWrapperClasses="order-lg-2"
            />
            <Journey
              title="After the sale"
              descriprion="We perform a multi-step verification process before processing the order for every item sold. This is an added layer of security in the authenticity of the product and guaranteeing its origin and traceability."
              imgSrc="/static/images/certification/after.svg"
              imgWrapperClasses="order-lg-2"
            />
          </div>
        </section>
        {/* Process */}
        <section data-bgcolor="#F7F4FD">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mb-5">
                  <h2>Purchase in confidence</h2>
                  <div className="small-border bg-color-2" />
                  <p>
                    Sell or Buy online with same level of guarantee as new products in store
                  </p>
                </div>
              </div>
              {
                Features.map((feat) => (
                  <FeatureCard
                    key={feat.id}
                    iClassName={feat.iClassName}
                    bgIClassName={feat.bgIClassName}
                    title={feat.title}
                    description={feat.description}
                  />
                ))
              }
            </div>
          </div>
        </section>
        <section className="mt-3 my-lg-4 py-5 px-0 padding30 br-15">
          <div className="container">
            <div className="text-center mb-5">
              <h2>Blockchain Technology at the service of the customer</h2>
              <div className="small-border bg-color-2" />
            </div>
            <Journey
              title="We value Authenticity"
              descriprion={(
                <p className="lead">
                  As counterfeits become more and more mainstream and sophisticated,
                  our duty is to make sure customers get what they pay
                  for. Even by passing multiple visual and physical checks, RFID and
                  labels can also be copied, making it almost
                  impossible technically to assess the authenticity of an item.
                  <br />
                  <br />
                  By using Blockchain technology at the commercialisation of the product
                  i.e. emitting certificates and unique code by the
                  brand itself, it allows to create a track record of the object that can be
                  consulted and used for authentication. Any
                  copy or duplicate serial number will immediately appear once exchanged or resold.
                </p>
)}
              imgSrc="/static/images/certification/authenticity.svg"
              hidePregressImg
              imgWrapperClasses="order-lg-2"
            />
            <Journey
              title="We value customer service"
              descriprion="The advantage of Digital Certificates is that they relate to the physical item giving them also some utility that can be immutable in time. Users can benefit some after sales services registered on the blockchain as well as other personalised services that are tied to the holder of the item and registered on the blockchain"
              imgSrc="/static/images/certification/customer_service.svg"
              hidePregressImg
            />
            <Journey
              title="We value trust"
              descriprion="We do only work with brands that have taken the step to quality and that want to offer customers a higher experience in their purchase by emitting digital certificates for each of their items sold and also then allowing an organised secondary market with us completely trustworthy."
              imgSrc="/static/images/certification/trust.svg"
              hidePregressImg
              imgWrapperClasses="order-lg-2"
            />
          </div>
        </section>
        <a href="#" id="back-to-top" />
      </div>
    </>
  );
};

export default Certification;
