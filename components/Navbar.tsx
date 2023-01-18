import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { Breakpoint, BreakpointProvider, setDefaultBreakpoints } from 'react-socks';
import Link from 'next/link';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/store';
import { reset } from '../redux/slices/authSlice';
import WalletContext, { WalletServiceProviders } from '../services/WalletService/WalletContext';
import WalletConnector from './WalletConnector';

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);
interface INavProps {
  children: JSX.Element | string
  href: string
}

const NavLink = (props: INavProps) => <Link className="non-active" {...props} />;

const Header = ({ className }: any) => {
  const { token } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useMemo(() => !!token, [token]);
  const [openMenu, setOpenMenu] = useState(false);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const ref = useOnclickOutside(() => {
    closeMenu();
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
        closeMenu();
      }
    });
    return () => {
      // @ts-ignore
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  const { disconnectWallet, accountId } = useContext(WalletContext);
  return (
    <header className={`navbar white ${className}`} id="myHeader">
      <WalletConnector showModal={showModal} setShowModal={setShowModal} />

      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink href="/">
                <p> NFT MARKET </p>
              </NavLink>
            </div>
          </div>
          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="search item here..."
              type="text"
            />
          </div>
          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick}
                      >
                        Browse
                      </div>
                      {openMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink href="/">Sneakers</NavLink>
                            <NavLink href="/">Shoes</NavLink>
                            <NavLink href="/">Apparel</NavLink>
                            <NavLink href="/">Electronics</NavLink>
                            <NavLink href="/">Trading Cards</NavLink>
                            <NavLink href="/">Collectibles</NavLink>
                            <NavLink href="/">Accessories</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div>
                      <NavLink href="/nft/pid">News</NavLink>
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div>About</div>
                  </div>
                  <div className="navbar-item">
                    <div>Sell</div>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <div ref={ref}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick}
                      onMouseLeave={closeMenu}
                    >
                      Browse
                      <span className="lines" />
                      {openMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink href="/">Sneakers</NavLink>
                            <NavLink href="/">Shoes</NavLink>
                            <NavLink href="/">Apparel</NavLink>
                            <NavLink href="/">Electronics</NavLink>
                            <NavLink href="/">Trading Cards</NavLink>
                            <NavLink href="/">Collectibles</NavLink>
                            <NavLink href="/">Accessories</NavLink>
                          </div>
                        </div>
                      )}
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
                    <div
                      className="connect-wal"
                      onClick={() => {
                        if (accountId) disconnectWallet(WalletServiceProviders.HASHPACK);
                        else {
                          setShowModal(true);
                        }
                      }}
                    >
                      <NavLink href="/deals/50/buyer/pay">{accountId ? 'Disconnect Wallet' : 'Connect Wallet'}</NavLink>
                    </div>
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

        <button type="button" className="nav-icon" onClick={() => btnIcon(!showmenu)}>
          <div className="menu-line white" />
          <div className="menu-line1 white" />
          <div className="menu-line2 white" />
        </button>
      </div>
    </header>
  );
};
export default Header;
