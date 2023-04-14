import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Head from 'next/head';

const Header = () => {

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
                                                <img src="assets/img/logo/logo.png" alt="logo"/>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="header__category d-none d-lg-block">
                                        <nav>
                                            <ul>
                                                <li>
                                                </li>
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
                                                    <Link href="/events">
                                                        <a>Current Events</a>
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link href="/announcements">
                                                        <a>Announcements</a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contact">
                                                        <a>Contact</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    <div className="header__btn ml-20 d-none d-sm-block">
                                        <Link href="sign-in">
                                            <a className="e-btn">Student</a>
                                        </Link>
                                    </div>
                                    <div className="header__btn ml-20 d-none d-sm-block">
                                        <Link href="teacher-signin">
                                            <a className="e-btn">Teacher</a>
                                        </Link>
                                    </div>
                                    <div className="header__btn ml-20 d-none d-sm-block">
                                        <Link href="admin-signin">
                                            <a className="e-btn">Admin</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </header>
        </React.Fragment>
    );
};

export default Header;
