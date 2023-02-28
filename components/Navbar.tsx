import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import {
  Breakpoint,
  BreakpointProvider,
  setDefaultBreakpoints,
} from 'react-socks';
import Link from 'next/link';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useTypedSelector } from '../hooks/store';
import { reset } from '../redux/slices/authSlice';
import WalletContext, {
  WalletServiceProviders,
} from '../services/WalletService/WalletContext';
import WalletConnector from './WalletConnector';

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
  header#myHeader.navbar.sticky.white {
    background: #8677a8;
    border-bottom: solid 1px #8677a8;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(131,100,226,.1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  header a p{
    margin: 0;
    font-size: 1.2rem;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #8677a8;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;
interface INavProps {
  children: JSX.Element | string;
  href: string;
}

const NavLink = (props: INavProps) => (
  <Link className="non-active" {...props} />
);

const Header = ({ className }: any) => {
  const { token } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useMemo(() => !!token, [token]);

  const [howDoesItWorkOpen, setHowDoesItWorkOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const onHowDoesItWorkClick = () => {
    setHowDoesItWorkOpen(!howDoesItWorkOpen);
  };

  const closeHowDoesItWork = () => {
    setHowDoesItWorkOpen(false);
  };

  const onAboutClick = () => {
    setAboutOpen(!aboutOpen);
  };

  const closeAbout = () => {
    setAboutOpen(false);
  };

  const ref = useOnclickOutside(() => {
    closeHowDoesItWork();
    closeAbout();
  });

  const [showmenu, btnIcon] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    const header = document.getElementById('myHeader');
    const totop = document.getElementById('scroll-to-top');
    const sticky = header?.offsetTop;

    const scrollCallBack = window.addEventListener('scroll', () => {
      btnIcon(false);
      if (window.pageYOffset > (sticky || 0)) {
        header?.classList.add('sticky');
        totop?.classList.add('show');
      } else {
        header?.classList.remove('sticky');
        totop?.classList.remove('show');
      }
      if (window.pageYOffset > (sticky || 0)) {
        closeHowDoesItWork();
      }
    });
    return () => {
      // @ts-ignore
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  const { disconnectWallet, accountId } = useContext(WalletContext);
  return (
    <>
      <GlobalStyles />

      <header className={`navbar white ${className}`} id="myHeader">
        <WalletConnector showModal={showModal} setShowModal={setShowModal} />

        <div className="container">
          <div className="row w-100-nav">
            <div className="logo px-0">
              <div className="navbar-title navbar-item">
                <NavLink href="/">
                  <p> DESIGN BOOK </p>
                </NavLink>
              </div>
            </div>
            {/* <div className="search">
              <input
                id="quick_search"
                className="xs-hide"
                name="quick_search"
                placeholder="search item here..."
                type="text"
              />
            </div> */}
            <BreakpointProvider>
              <Breakpoint l down>
                {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <div>Home</div>
                  </div>
                  <div className="navbar-item">
                    <div>Marketplace</div>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={onHowDoesItWorkClick}
                      >
                        How does it work
                      </div>
                      {howDoesItWorkOpen && (
                        <div className="item-dropdown">
                          <div
                            className="dropdown"
                            onClick={closeHowDoesItWork}
                          >
                            <NavLink href="/">Buyer</NavLink>
                            <NavLink href="/">Seller</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={onAboutClick}
                      >
                        About
                      </div>
                      {aboutOpen && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeAbout}>
                            <NavLink href="/">Certification</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">Help</div>
                </div>
                )}
              </Breakpoint>

              <Breakpoint xl>
                <div className="menu">
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        // onMouseEnter={handleBtnClick}
                        // onMouseLeave={closeMenu}
                      >
                        Browse
                        <span className="lines" />
                        {/* {openMenu && (
                        <div className="item-dropdown">
                          <div
                            className="dropdown"
                            onClick={closeHowDoesItWork}
                          >
                            <NavLink href="/">Buyer</NavLink>
                            <NavLink href="/">Seller</NavLink>
                          </div>
                        </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div>
                      <div className="dropdown-custom btn">
                        <NavLink href="/nft/pid">News</NavLink>
                        <span className="lines" />
                      </div>
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div>
                      <div className="dropdown-custom btn">
                        About
                        <span className="lines" />
                      </div>
                    </div>
                  </div>
                  <div className="navbar-item">
                    <NavLink href="/activity">
                      <>
                        Help
                        <span className="lines" />
                      </>
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <div>
                      <div className="dropdown-custom btn">
                        Sell
                        <span className="lines" />
                      </div>
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div className="mainside">
                      {isLoggedIn
                        ? (
                          <div
                            className="connect-wal"
                            onClick={() => {
                              if (accountId) disconnectWallet(WalletServiceProviders.HASHPACK);
                              else {
                                setShowModal(true);
                              }
                            }}
                          >
                            <span>
                              {accountId ? 'Disconnect Wallet' : 'Connect Wallet'}
                            </span>
                          </div>
                        )
                        : (
                          <div className="mainside">
                            <div className="connect-wal">
                              <NavLink href="/register">Sign Up</NavLink>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    {isLoggedIn ? (
                      <div className="mainside">
                        <div className="connect-wal" onClick={handleLogout}>
                          <NavLink href="/login">Logout</NavLink>
                        </div>
                      </div>
                    ) : (
                      <div className="mainside">
                        <div className="connect-wal">
                          <NavLink href="/login">Login</NavLink>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Breakpoint>
            </BreakpointProvider>
          </div>

          <button
            type="button"
            className="nav-icon"
            onClick={() => btnIcon(!showmenu)}
          >
            <div className="menu-line white" />
            <div className="menu-line1 white" />
            <div className="menu-line2 white" />
          </button>
        </div>
      </header>
    </>
  );
};
export default Header;
