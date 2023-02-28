import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="footer-light">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Marketplace</h5>
            <ul>
              <li>
                <Link href=""> Bags</Link>
              </li>
              <li>
                <Link href=""> Leather goods</Link>
              </li>
              <li>
                <Link href=""> Jewellery</Link>
              </li>
              <li>
                <Link href=""> Shoes</Link>
              </li>
              <li>
                <Link href=""> Watches</Link>
              </li>
              <li>
                <Link href=""> Sunglasses</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Resources</h5>
            <ul>
              <li><Link href="/how-it-works">How does it work</Link></li>
              <li><Link href="/seller-page">Sellers</Link></li>
              <li><Link href="/buyer-page">Buyers</Link></li>
              <li><Link href="/certification">Certification Process</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/about-us">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Legal</h5>
            <ul>
              <li>
                <Link href=""> Terms and Conditions</Link>
              </li>
              <li>
                <Link href=""> Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Get latest updates</h5>
            <p>Sign up to our newsletter to receive the latest news</p>
            <form
              action="#"
              className="row form-dark"
              id="form_subscribe"
              method="post"
              name="form_subscribe"
            >
              <div className="col text-center">
                <input
                  className="form-control"
                  id="txt_subscribe"
                  name="txt_subscribe"
                  placeholder="Mail field"
                  type="text"
                />
                <Link href="" id="btn-subscribe">
                  <i className="arrow_right bg-color-secondary" />
                </Link>
                <div className="clearfix" />
              </div>
            </form>
            <div className="spacer-10" />
            <small>Your email is safe with us. We don&apos;t spam.</small>
          </div>
        </div>
      </div>
    </div>
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open('', '_self')}>
                  <img alt="" className="f-logo d-1" src="./img/logo.png" />
                  <img
                    alt=""
                    className="f-logo d-3"
                    src="./img/logo-2-light.png"
                  />
                  <span className="copy">© Copyright 2023 - DesignBook</span>
                </span>
              </div>

              <div className="de-flex-col">
                <div className="social-icons">
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-facebook fa-lg" />
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-twitter fa-lg" />
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-linkedin fa-lg" />
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-pinterest fa-lg" />
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-rss fa-lg" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
