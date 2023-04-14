import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Head from 'next/head';
import BurgerMenus from './BurgerMenus';
import ShopingCart from './ShopingCart';

const TeacherHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const router = useRouter();
  const [path, setPath] = useState('');
  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  // Sticky Menu Area start
  useEffect(() => {
    window.addEventListener('scroll', sticky);
    return () => {
      window.removeEventListener('scroll', sticky);
    };
  });

  const sticky = e => {
    const header = document.querySelector('.header__area');
    const scrollTop = window.scrollY;
    scrollTop >= 1
      ? header.classList.add('sticky')
      : header.classList.remove('sticky');
  };
  // Sticky Menu Area End

  return (
    <React.Fragment>
      <Head>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        <title>Smart Education System - Developing</title>
      </Head>
      <header>
        <div
          id="header-sticky"
          className="header__area header__transparent header__padding">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-2 col-sm-4 col-6">
                <div className="header__left d-flex">
                  <div className="logo">
                    <Link href="/">
                      <a>
                        <img src="assets/img/logo/logo.png" alt="logo" />
                      </a>
                    </Link>
                  </div>
                  <div className="header__category d-none d-lg-block">
                    <nav>
                      <ul>
                        <li></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-10 col-sm-8 col-6">
                <div className="header__right d-flex justify-content-end align-items-center">
                  <div className="main-menu d-none d-xl-block">
                    <nav id="mobile-menu">
                      <ul>
                        <li>
                          <Link href="/student">
                            <a>Courses</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/studenttimetable">
                            <a> Timetable</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/result-card">
                            <a> Result Card</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/enrolled-courses">
                            <a> Enrolled Courses</a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  {/*<div className="header__search p-relative ml-50 d-none d-md-block">*/}
                  {/*  <form action="#">*/}
                  {/*    <input type="text" placeholder="Search..." />*/}
                  {/*    <button type="submit">*/}
                  {/*      <i>*/}
                  {/*        <FontAwesomeIcon icon={['fas', 'search']} />*/}
                  {/*      </i>*/}
                  {/*    </button>*/}
                  {/*  </form>*/}
                  {/*  <div className="header__cart">*/}
                  {/*    <span*/}
                  {/*      className="cart-toggle-btn"*/}
                  {/*      onClick={() => {*/}
                  {/*        setShopOpen(!shopOpen);*/}
                  {/*      }}>*/}
                  {/*      <div className="header__cart-icon">*/}
                  {/*        <svg viewBox="0 0 24 24">*/}
                  {/*          <circle className="st0" cx="9" cy="21" r="1" />*/}
                  {/*          <circle className="st0" cx="20" cy="21" r="1" />*/}
                  {/*          <path*/}
                  {/*            className="st0"*/}
                  {/*            d="M1,1h4l2.7,13.4c0.2,1,1,1.6,2,1.6h9.7c1,0,1.8-0.7,2-1.6L23,6H6"*/}
                  {/*          />*/}
                  {/*        </svg>*/}
                  {/*      </div>*/}
                  {/*      <span className="cart-item">2</span>*/}
                  {/*    </span>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {/*<div className="header__cart header__cart--responsive">*/}
                  {/*  <span*/}
                  {/*    className="cart-toggle-btn"*/}
                  {/*    onClick={() => {*/}
                  {/*      setShopOpen(!shopOpen);*/}
                  {/*    }}>*/}
                  {/*    <div className="header__cart-icon">*/}
                  {/*      <svg viewBox="0 0 24 24">*/}
                  {/*        <circle className="st0" cx="9" cy="21" r="1" />*/}
                  {/*        <circle className="st0" cx="20" cy="21" r="1" />*/}
                  {/*        <path*/}
                  {/*          className="st0"*/}
                  {/*          d="M1,1h4l2.7,13.4c0.2,1,1,1.6,2,1.6h9.7c1,0,1.8-0.7,2-1.6L23,6H6"*/}
                  {/*        />*/}
                  {/*      </svg>*/}
                  {/*    </div>*/}
                  {/*    <span className="cart-item">2</span>*/}
                  {/*  </span>*/}
                  {/*</div>*/}
                  <div className="header__btn ml-20 d-none d-sm-block">
                    <Link href="sign-in">
                      <a className="e-btn">Profile Name</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BurgerMenus menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div
          onClick={() => setMenuOpen(false)}
          className={menuOpen ? 'body-overlay show' : 'body-overlay'}></div>

        <ShopingCart shopOpen={shopOpen} setShopOpen={setShopOpen} />
        <div
          onClick={() => setShopOpen(false)}
          className={shopOpen ? 'body-overlay show' : 'body-overlay'}></div>
      </header>
    </React.Fragment>
  );
};

export default TeacherHeader;
