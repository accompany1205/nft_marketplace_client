import React from 'react';
import Link from 'next/link';
const Footer = () => (
  <footer className="footer-light">
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span >
                  <img alt="" className="f-logo d-1" src="./img/logo.png" />
                  <img alt="" className="f-logo d-3" src="./img/logo-2-light.png" />
                  <img alt="" className="f-logo d-4" src="./img/logo-3.png" />
                  <span className="copy">&copy; Copyright 2021 - NFT MARKETPLACE</span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <span ><i className="fa fa-facebook fa-lg"></i></span>
                  <span ><i className="fa fa-twitter fa-lg"></i></span>
                  <span ><i className="fa fa-linkedin fa-lg"></i></span>
                  <span ><i className="fa fa-pinterest fa-lg"></i></span>
                  <span ><i className="fa fa-rss fa-lg"></i></span>
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