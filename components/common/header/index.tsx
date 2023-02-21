import React from 'react';

const Header = () => (
  <header className="transparent">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="de-flex sm-pt10">
            <div className="de-flex-col">
              <div className="de-flex-col">
                {/* logo begin */}
                <div id="logo">
                  <a href="index.html">
                      <img alt="" className="logo" src="images/logo-white.png" />
                      <img alt="" className="logo-2" src="images/logo-black.png" />
                    </a>
                </div>
                {/* logo close */}
              </div>
              {/* <div class="de-flex-col">
                                <input id="quick_search" class="xs-hide" name="quick_search"
                                    placeholder="search item here..." type="text" />
                            </div> */}
            </div>
            <div className="de-flex-col header-col-mid">
              {/* mainmenu begin */}
              <ul id="mainmenu">
                <li>
                  <a href="#">
                      Home
                    <span />
                    </a>
                </li>
                <li>
                  <a href="#">
                      Marketplace
                    <span />
                    </a>
                </li>
                <li>
                  <a href="#">
                      How does it work
                    <span />
                    </a>
                  <ul>
                      <li><a href="#">Buyer</a></li>
                      <li><a href="#">Seller</a></li>
                    </ul>
                </li>
                <li>
                  <a href="#">
                      About
                    <span />
                    </a>
                  <ul>
                      <li><a href="#">Certification</a></li>
                    </ul>
                </li>
                <li>
                  <a href="#">
                      Help
                    <span />
                    </a>
                </li>
              </ul>
              <div className="menu_side_area">
                <a href="#" className="btn-main btn-wallet">
                  <i className="icon_wallet_alt" />
                  <span>Login</span>
                </a>
                <span id="menu-btn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
