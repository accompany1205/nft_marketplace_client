import React from 'react';
import Link from 'next/link';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
footer {
  /*background:url('../images/logo-big.png') -50% center no-repeat var(--primary-color) !important;*/
  color: var(--dark-scheme-font-color);
  padding: 80px 0 0 0;
}

footer.footer-light {
  background: #ffffff !important;
  border-top: solid 1px #eeeeee;
  color: #595d69;
}

footer.footer-light a {
  color: #595d69;
}

.dark-scheme footer a {
  color: var(--dark-scheme-font-color);
}

footer.footer-black {
  background: #222222;
}

footer h5,
.de_light footer h5 {
  color: #fff;
  font-size: 18px;
  text-transform: none;
}

footer a {
  font-weight: 400;
  color: #ffffff;
  text-decoration: none !important;
}

.de-navbar-left footer {
  padding: 70px 70px 0 70px;
}

.subfooter {
  border-top: solid 1px rgba(255, 255, 255, .1);
  margin-top: 40px;
  padding: 20px 0 20px 0;
}

.footer-light .subfooter {
  border-top: solid 1px #eeeeee;
}

.de-navbar-left .subfooter {
  background: none;
}


footer:not(.footer-light) #form_subscribe input[type=text]::-moz-input-placeholder {
  color: #ffffff;
}

footer:not(.footer-light) #form_subscribe input[type=text]::-webkit-input-placeholder {
  color: #ffffff;
}


footer:not(.footer-light) #form_subscribe.form-dark input[type=text] {
  color: #ffffff;
  background: rgba(255, 255, 255, .1);
}

.footer-light #form_subscribe input[type=text] {
  border: solid 1px #333333;
  border-right: none;
  padding: 6px 12px;
}


footer.footer-light h5 {
  margin-top: 0;
  font-family: var(--title-font);
  font-weight: 700;
  color: #0d0c22;
}


footer h1,
footer h2,
footer h4,
footer h4,
footer h5,
footer h6 {
    color: #fff;
}

h2.text-light,
footer h4,
footer h4,
footer h5,
footer h6 {
    color: #fff;
}


footer .widget {
  border: none;
  margin-bottom: 0;
}

.widget_tags ul {
  margin-top: 30px;
}

footer .widget.widget_tags li a {
  border-color: #222;
}

footer .widget_recent_post li {
  padding: 0 0 10px 0;
  margin: 0;
  margin-bottom: 10px;
  background: none;
  border-bottom-color: rgba(255, 255, 255, .1);
}

footer .widget_recent_post li a {
  color: #ccc;
}

footer .widget h5 {
  margin-bottom: 20px;
}

footer .widget_list li {
  padding: 0 0 10px 0;
  margin: 0;
  margin-bottom: 10px;
  background: none;
  border-bottom-color: rgba(255, 255, 255, .1);
}

footer .widget_list li a {
  color: #ccc;
}

footer .tiny-border span {
  background: #ffffff;
  display: block;
  height: 1px;
  width: 30px;
}

footer {
  background-color: #000;
}

footer {
  background: #000;
}

.social-icons {
  display: inline-block;
}

.social-icons i {
  text-shadow: none;
  color: #fff;
  padding: 12px 10px 8px 10px;
  width: 34px;
  height: 34px;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  margin: 0 3px 0 3px;
}

.social-icons i.fa-google-plus {
  padding: 12px 14px 10px 6px;
}

.social-icons i:hover {
  background: #fff;
  border-color: #eceff3;
  color: #333;
}

.social-icons.big i {
  font-size: 26px;
  width: auto;
  height: auto;
  margin: 0 15px 0 15px;
}

.social-icons.big i:hover {
  background: none;
}

/*
.social-icons .fa-facebook{background:#3e5a9b;}
.social-icons .fa-twitter{background:#55aded;}
.social-icons .fa-google-plus{background:#df4f37;}
.social-icons .fa-linkedin{background:#0075ad;}
.social-icons .fa-rss{background:#fb6506;}
.social-icons .fa-skype{background:#28A8EA;}
*/

.social-icons.big i {
  margin: 0 15px 0 15px;
}

.social-icons.big i:hover {
  background: none;
}

.social-icons.s1 i {
  border: none;
  font-size: 16px;
  margin: 3px;
}

.social-icons.s1:hover i {
  background: none;
}

.social-icons.s1 {
  line-height: 0.5;
  text-align: center;
}

.social-icons.s1 .inner {
  display: inline-block;
  position: relative;
}

.social-icons.s1 .inner:before,
.social-icons.s1 .inner:after {
  content: "";
  position: absolute;
  height: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
  top: 0;
  width: 100%;
}

.social-icons.s1 .inner:before {
  right: 100%;
  margin-right: 15px;
  margin-top: 20px;
}

.social-icons.s1 .inner:after {
  left: 100%;
  margin-left: 15px;
  margin-top: 20px;
}

.col-right {
  display: inline-block;
  margin-top: 22px;
}

#form_subscribe input[type=text]:focus {
  background: rgba(255, 255, 255, .2);
}

#form_subscribe #btn-subscribe i {
  text-align: center;
  font-size: 28px;
  float: left;
  width: 20%;
  background: #171A21;
  color: #ffffff;
  display: table-cell;
  padding: 5px 0 5px 0;
  border-radius: 0 5px 5px 0;
  -moz-border-radius: 0 5px 5px 0;
  -webkit-border-radius: 0 5px 5px 0;
}

@media screen and (max-width: 575px) {
  footer {
      text-align: center;
  }
}
`;

const Footer = () => (
  <>
    <GlobalStyles />

    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-xs-1">
            <div className="widget">
              <h5>Get latest updates</h5>
              <p>Sign up to our newsletter to receive the latest news.</p>
              <form action="blank.php" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                <div className="col text-center">
                  <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" />
                  {' '}
                  <a href="#" id="btn-subscribe"><i className="arrow_right bg-color-secondary" /></a>
                  <div className="clearfix" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="row">
              <div className="col-sm-6 col-xs-1">
                <div className="widget">
                  <h5>Marketplace</h5>
                  <ul>
                    <li><a href="#">Brands</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><Link href="/about-us">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-xs-1">
                <div className="widget">
                  <h5>Resources</h5>
                  <ul>
                    <li><Link href="/how-it-works">How does it work</Link></li>
                    <li><Link href="/seller-page">Sellers</Link></li>
                    <li><Link href="/buyer-page">Buyers</Link></li>
                    <li><Link href="/certification">Certification Process</Link></li>
                    <li><Link href="/faq">FAQ</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-xs-1">
            <div className="widget">
              <h5>Join the community</h5>
              <div className="social-icons">
                <a href="#"><i className="fa fa-facebook fa-lg" /></a>
                <a href="#"><i className="fa fa-twitter fa-lg" /></a>
                <a href="#"><i className="fa fa-instagram fa-lg" /></a>
                <a href="#"><i className="fa fa-youtube fa-lg" /></a>
                <a href="#"><i className="fa fa-envelope-o fa-lg" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div className="subfooter_left">
            <a href="#">Terms and Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="subfooter_right">
            <p className="mb-0">
              © Copyright 2022
              {' '}
              <a href="#">DesignBook</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </>
);
export default Footer;
