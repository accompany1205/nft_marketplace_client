"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Breakpoint,
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import Link from "next/link";
import useOnclickOutside from "react-cool-onclickoutside";
import { useAppDispatch, useTypedSelector } from "../hooks/store";
import { useDispatch } from "react-redux";
import { reset } from "../redux/slices/authSlice";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

interface INavProps {
  children: JSX.Element | string;
  href: string;
}

const NavLink = (props: INavProps) => {
  return <Link className="non-active" {...props} />;
};

const Header = function ({ className }: any) {
  const { token } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const [showmenu, btn_icon] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header?.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > (sticky ? sticky : 0)) {
        header?.classList.add("sticky");
        totop?.classList.add("show");
      } else {
        header?.classList.remove("sticky");
        totop?.classList.remove("show");
      }
      if (window.pageYOffset > (sticky ? sticky : 0)) {
        closeMenu();
      }
    });
    return () => {
      // @ts-ignore
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header className={`navbar white ${className}`} id="myHeader">
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
              className="xs-hide border border-1 border-color"
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
                      <span className="lines"></span>
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
                      <span className="lines"></span>
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <div>
                    <div className="dropdown-custom btn">
                      About
                      <span className="lines"></span>
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <NavLink href="/activity">
                    <>
                      Help
                      <span className="lines"></span>
                    </>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <div>
                    <div className="dropdown-custom btn">
                      Sell
                      <span className="lines"></span>
                    </div>
                  </div>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          {isLoggedIn ? (
            <div className="mainside">
              <div className="connect-wal">
                <button className="btn-main lead" onClick={handleLogout}>
                  Logout
                </button>
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

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
