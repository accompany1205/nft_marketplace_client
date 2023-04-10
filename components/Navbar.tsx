import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Breakpoint,
  BreakpointProvider,
  setDefaultBreakpoints,
} from 'react-socks';
import Link from 'next/link';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../hooks/store';
import { reset } from '../redux/slices/authSlice';
import WalletContext, {
  WalletServiceProviders,
} from '../services/WalletService/WalletContext';
import WalletConnector from './WalletConnector';

interface INavProps {
  children: JSX.Element | string;
  href: string;
}

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props: INavProps) => (
  <Link className="non-active" {...props} />
);

const Header = ({ className }: any) => {
  const { token } = useTypedSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useMemo(() => !!token, [token]);

  const [howDoesItWorkOpen, setHowDoesItWorkOpen] = useState(false);

  const onHowDoesItWorkClick = () => {
    setHowDoesItWorkOpen(!howDoesItWorkOpen);
  };

  const closeHowDoesItWork = () => {
    setHowDoesItWorkOpen(false);
  };

  const ref = useOnclickOutside(() => {
    closeHowDoesItWork();
  });

  const [showmenu, btnIcon] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = useCallback(() => {
    dispatch(reset());
    if (accountId) {
      disconnectWallet(WalletServiceProviders.HASHPACK);
    }
  }, [dispatch]);

  const handleLogin = () => router.push('/login');

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
    <header
      className={`navbar white ${className}`}
      id="myHeader"
      style={{ backgroundColor: 'white' }}
    >
      <WalletConnector showModal={showModal} setShowModal={setShowModal} />

      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <NavLink href="/">
              <img
                src="/static/images/logo-black.png"
                alt="logo"
                style={{
                  width: '150px',
                }}
              />
            </NavLink>
          </div>
          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="Search for brands, items, colours"
              type="text"
            />
          </div>
          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <NavLink href="/">Home</NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink href="/marketplace">Marketplace</NavLink>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={onHowDoesItWorkClick}
                      >
                        How it works
                      </div>
                      {howDoesItWorkOpen && (
                        <div className="item-dropdown">
                          <div
                            className="dropdown"
                            onClick={closeHowDoesItWork}
                          >
                            <NavLink
                              href="/buyer-page"
                              onClick={() => btnIcon(!showmenu)}
                            >
                              Buyer
                            </NavLink>
                            <NavLink
                              href="/seller-page"
                              onClick={() => btnIcon(!showmenu)}
                            >
                              Seller
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <NavLink href="/certification">About</NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink href="/faq">Help</NavLink>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <NavLink href="/">
                    <>
                      Home
                      <span className="lines" />
                    </>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink href="/marketplace">
                    <>
                      Marketplace
                      <span className="lines" />
                    </>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <div ref={ref}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={onHowDoesItWorkClick}
                      onMouseLeave={closeHowDoesItWork}
                    >
                      How it works
                      <span className="lines" />
                      {howDoesItWorkOpen && (
                        <div className="item-dropdown">
                          <div
                            className="dropdown"
                            onClick={closeHowDoesItWork}
                          >
                            <NavLink
                              href="/buyer-page"
                              onClick={() => btnIcon(!showmenu)}
                            >
                              Buyer
                            </NavLink>
                            <NavLink
                              href="/seller-page"
                              onClick={() => btnIcon(!showmenu)}
                            >
                              Seller
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <NavLink href="/certification">
                    <>
                      About
                      <span className="lines" />
                    </>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink href="/faq">
                    <>
                      Help
                      <span className="lines" />
                    </>
                  </NavLink>
                </div>
                {isLoggedIn && (
                  <div className="navbar-item">
                    <div className="mainside">
                      <div
                        className="connect-wal"
                        onClick={() => {
                          if (accountId) {
                            disconnectWallet(WalletServiceProviders.HASHPACK);
                          } else {
                            setShowModal(true);
                          }
                        }}
                      >
                        <span>
                          {accountId ? 'Disconnect Wallet' : 'Connect Wallet'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="navbar-item">
                  <div className="mainside">
                    <div
                      className="connect-wal"
                      onClick={() => (isLoggedIn ? handleLogout() : handleLogin())}
                    >
                      <span>{isLoggedIn ? 'Logout' : 'Login'}</span>
                    </div>
                  </div>
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
  );
};
export default Header;
