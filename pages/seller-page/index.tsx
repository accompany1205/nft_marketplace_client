/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import HeroSection from '../../components/common/heroSection';
import FeatureCard from '../../components/common/featured-card';
import Journey from '../../components/common/journey';
import PlanCard from './PlanCard';
import useLoadCustomJs from '../../hooks/useLoadCustomJs';

const GlobalStyles = createGlobalStyle`
`;

const Advantages = [
  {
    id: 1,
    title: 'Streamlined Setup Process',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_like',
    description: 'No pain in setting up your product listing. If you own the digital certificate, all you need to do is select the product you want to sell, set your offer and connect your wallet.',
    bgIClassName: 'wm icon_like',
  },
  {
    id: 2,
    title: 'Market Driven Pricing',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_easel',
    description: 'The real time marketplace works like a stock market, allowing products to transact at a price that is determined by supply and demand. You have full transparency and real-time tracking throughout the bidding trend, and analytics over historical pricing data.',
    bgIClassName: 'wm icon_easel',
  },
  {
    id: 3,
    title: 'Easy Shipping and Verification Process',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_cart_alt',
    description: 'Once your item is sold, we will hold your digital certificate and wait for you to ship us the item with the prepaid label within 48h. Please take care of checking conditions and packaging details prior shipping in our FAQ.',
    bgIClassName: 'wm icon_cart_alt',
  },
  {
    id: 4,
    title: 'Secure Transactions and Payments',
    iClassName: 'wow fadeInUp bg-color-2 i-boxed icon_box-checked',
    description: "Get paid for your secondary sale with confidence. We have additional buyer verification to ensure only buyers with sufficient funds can place bids, and lock buyer's funds in an escrow account once your offer is matched.",
    bgIClassName: 'wm icon_box-checked',
  },
];

const PLANS = {
  BASIC: 'Basic',
  ADVANCED: 'Advanced',
  PRO: 'Pro',
};

const Plans = {
  [PLANS.BASIC]: {
    id: PLANS.BASIC,
    title: 'Basic Plan',
    description: 'Our most popular plan.',
    fees: 10.0,
    background: '#E5E2F8',
  },
  [PLANS.ADVANCED]: {
    id: PLANS.ADVANCED,
    title: 'Advanced Plan',
    description: 'Best for growing teams.',
    fees: 8.0,
    background: 'linear-gradient(to right, #F7F2E6 0%, #F9F4EA 100%)',
  },
  [PLANS.PRO]: {
    id: PLANS.PRO,
    title: 'Pro Plan',
    description: 'Best for large teams.',
    fees: 6.0,
    background: 'linear-gradient(to right, #D4F0F9 0%, #C0DEE6 100%)',
  },
};
const SellerPage = () => {
  useLoadCustomJs({ src: '/static/js/designesia.js' });

  return (
    <>
      <GlobalStyles />

      <div id="wrapper">
        {/* content begin */}
        <div className="no-bottom no-top" id="content">
          <div id="top" />
          {/* section begin */}
          <HeroSection title="Seller Page">
            <p>
              Selling your exclusive product certificate with
              DesignBook is easy and trustworthy
            </p>
          </HeroSection>
          {/* section close */}
          <div className="mt-lg-4 pt-5 px-0 padding30 br-15 bg-custom">
            <div className="container">
              <Journey
                title="Place an Ask or Sell Now"
                descriprion={'The live Marketplace will show you the highest bid at any given time. You can choose to Sell Now and close the transaction with the highest bid or you can Place a higher offer and wait for a buyer to improve. Note that it\'s a live market, other sellers can compete with you on the price, so you can also change your offer at any time. All improvements in the prices from sellers or buyers will be notified to you in full transparency. Only sellers who own the digital certificate in their wallet are able to place an order.'}
                imgSrc="/static/images/seller-page/option.svg"
                imgWrapperClasses="order-lg-2"
              />
              <Journey
                title="We verify your digital certificate"
                descriprion={(
                  <p className="lead">
                    Once you&apos;re matched with a buyer at an agreed price, you&apos;re both
                    taken out of the listing and market resume between
                    other parties involved.
                    <br />
                    <br />
                    Your digital certificate is pulled into an escrow account along with
                    the buyer&apos;s funds while we verify the certificate.
                  </p>
              )}
                imgSrc="/static/images/seller-page/verify.svg"
              />
              <Journey
                title="You ship us the corresponding item and we check item"
                descriprion="Ship your sold item to us using our pre-paid label. Once we receive your item, we take care of authentication, and check that its condition and packaging are up to standards."
                imgSrc="/static/images/seller-page/ship.svg"
                imgWrapperClasses="order-lg-2"
              />
              <Journey
                title="Instant Payment"
                descriprion="Once your certificate passes validation, we release instantly the funds in your wallet deducted from our platform fees."
                imgSrc="/static/images/seller-page/get_paid.svg"
                progressSvg={(
                  <div className="down-marker__area down-marker__area-last">
                    <svg className="down-arrow__circle-svg" stroke="var(--secondary-color)" viewBox="0 0 24 24">
                      <polyline fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} points="6,12 10,16 18,8" />
                    </svg>
                  </div>
              )}
              />
              {/* advantages */}
              <section id="section-steps" data-bgcolor="#F7F4FD">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="text-center mb-5">
                        <h2>Advantages</h2>
                        <div className="small-border bg-color-2" />
                      </div>
                    </div>
                    {
                Advantages.map((advantage) => (
                  <FeatureCard
                    key={advantage.id}
                    iClassName={advantage.iClassName}
                    title={advantage.title}
                    description={advantage.description}
                    bgIClassName={advantage.bgIClassName}
                    variant="medium"
                  />
                ))
              }
                  </div>
                </div>
              </section>
              {/* pricing table */}
              <section>
                <div className="container">
                  <div className="text-center mb-5">
                    <h2>Fees</h2>
                    <div className="small-border bg-color-2" />
                  </div>
                  <table className="table d-none d-md-table">
                    <thead>
                      <tr>
                        <td />
                        {
                    Object.values(Plans).map((plan) => (
                      <td key={plan.id}>
                        <PlanCard
                          title={plan.title}
                          descriprion={plan.description}
                          fees={plan.fees}
                          background={plan.background}
                        />
                      </td>
                    ))
                  }
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Number of items sold</th>
                        <td>-</td>
                        <td>5</td>
                        <td>20</td>
                      </tr>
                      <tr>
                        <th />
                        <td />
                        <td>or</td>
                        <td>or</td>
                      </tr>
                      <tr>
                        <th>Amount of Sales in ($)</th>
                        <td>–</td>
                        <td>$2,500</td>
                        <td>$30,000</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-block d-md-none">
                    <div className="single-pricing pricing-table__head">
                      <h4 className="pricing-table__head-text">Basic Plan</h4>
                      <p className="pricing-table__head--sub-text">Our most popular plan.</p>
                      <h2 className="pricing-table__head--price">
                        10.0
                        <span> %</span>
                      </h2>
                      <ul className="list-unstyled">
                        <li>Number of items sold: N/A</li>
                        <li>or</li>
                        <li>Amount of Sales in ($): N/A</li>
                      </ul>
                    </div>
                    <div className="single-pricing pricing-table__head pricing-table__bg-2">
                      <h4 className="pricing-table__head-text">Advanced Plan</h4>
                      <p className="pricing-table__head--sub-text">Best for growing teams.</p>
                      <h2 className="pricing-table__head--price">
                        8.0
                        <span> %</span>
                      </h2>
                      <ul className="list-unstyled">
                        <li>Number of items sold: 5</li>
                        <li>or</li>
                        <li>Amount of Sales in ($): $2,500</li>
                      </ul>
                    </div>
                    <div className="single-pricing pricing-table__head pricing-table__bg-3">
                      <h4 className="pricing-table__head-text">Pro Plan</h4>
                      <p className="pricing-table__head--sub-text">Best for large teams.</p>
                      <h2 className="pricing-table__head--price">
                        6.0
                        <span> %</span>
                      </h2>
                      <ul className="list-unstyled">
                        <li>Number of items sold: 20</li>
                        <li>or</li>
                        <li>Amount of Sales in ($): $30,000</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-md-start">
                    Activity resets at the end of each calendar quarter.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        {/* content close */}
        <a href="#" id="back-to-top" />
      </div>
    </>
  );
};

export default SellerPage;
