import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Cta from '../Home/CtaSection';
import Link from 'next/link';

class EventDetailsMain extends Component {
    render() {
        return (
            <main>
                <section className="page__title-area pt-120">
                    <div className="page__title-shape">
                        <img
                            className="page-title-shape-5 d-none d-sm-block"
                            src="assets/img/page-title/page-title-shape-1.png"
                            alt="img not found"
                        />
                        <img
                            className="page-title-shape-6"
                            src="assets/img/page-title/page-title-shape-2.png"
                            alt="img not found"
                        />
                        <img
                            className="page-title-shape-7"
                            src="assets/img/page-title/page-title-shape-4.png"
                            alt="img not found"
                        />
                        <img
                            className="page-title-shape-8"
                            src="assets/img/page-title/page-title-shape-5.png"
                            alt="img not found"
                        />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-9 col-xl-8">
                                <div className="page__title-content mb-25 pr-40">
                                    <div className="page__title-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link href="/">
                                                        <a>Home</a>
                                                    </Link>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <Link href="/event-details">
                                                        <a>Event</a>
                                                    </Link>
                                                </li>
                                                <li
                                                    className="breadcrumb-item active"
                                                    aria-current="page">
                                                    Become a product Manager learn the skills & job.
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <span className="page__title-pre purple-bg">
                    Art & Design
                  </span>
                                    <h5 className="page__title-3">
                                        Become a product manager learn the Skills & job.
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="event__area pb-110">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-8 col-xl-8 col-lg-8">
                                <div className="events__wrapper">
                                    <div className="events__details mb-35">
                                        <h3>Description</h3>
                                        <p>
                                            He legged it up the kyver have it mush super me old mucker
                                            cheeky naff that are you taking the piss, blow off down
                                            the pub bite your arm off the wireless boot cor blimey
                                            guvnor happy days bender what a load of rubbish, say
                                            pardon me horse play spiffing Why car boot gosh bubble and
                                            squeak. Cheers Richard bugger show off show off pick your
                                            nose and blow off get stuffed mate chancer in my flat loo,
                                            bevvy amongst hunky-dory bender bubble and squeak me old
                                            mucker vagabond, barmy spend a penny chimney pot young
                                            delinquent bum bag the bee's knees chap, gosh nice one
                                            knees up the wireless Charles such a fibber. Mush barmy
                                            bleeding Jeffrey pardon me barney grub loo cup of tea
                                            bubble and squeak bugger all mate say, I bloke matie boy
                                            tickety-boo give us a bell up the duff bugger lurgy wind
                                            up I don't want no agro.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-4">
                                <div className="events__sidebar pl-70">
                                    <div className="events__sidebar-widget white-bg mb-20">
                                        <div className="events__sidebar-shape">
                                            <img
                                                className="events-sidebar-img-2"
                                                src="assets/img/events/event-shape-2.png"
                                                alt="img not found"
                                            />
                                            <img
                                                className="events-sidebar-img-3"
                                                src="assets/img/events/event-shape-3.png"
                                                alt="img not found"
                                            />
                                        </div>
                                        <div className="events__info">
                                            <div
                                                className="events__info-meta mb-25 d-flex align-items-center justify-content-between">
                                            </div>
                                            <div className="events__info-content mb-35">
                                                <ul>
                                                    <li className="d-flex align-items-center">
                                                        <div className="events__info-icon">
                                                            <i>
                                                                <FontAwesomeIcon
                                                                    icon={['fas', 'calendar-alt']}
                                                                />
                                                            </i>
                                                        </div>
                                                        <div className="events__info-item">
                                                            <h5>
                                                                <span>End: </span> July 26, 2022 12:30 am
                                                            </h5>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex align-items-center">
                                                        <div className="events__info-icon">
                                                            <i>
                                                                <FontAwesomeIcon icon={['fas', 'clock']}/>
                                                            </i>
                                                        </div>
                                                        <div className="events__info-item">
                                                            <h5>
                                                                <span>Time:</span> 10:45 AM-01:30 PM
                                                            </h5>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex align-items-center">
                                                        <div className="events__info-icon">
                                                            <i>
                                                                <FontAwesomeIcon
                                                                    icon={['fas', 'address-card']}
                                                                />
                                                            </i>
                                                        </div>
                                                        <div className="events__info-item">
                                                            <h5>
                                                                <span>Venue: </span> New York, TX 82760, US
                                                            </h5>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        );
    }
}

export default EventDetailsMain;