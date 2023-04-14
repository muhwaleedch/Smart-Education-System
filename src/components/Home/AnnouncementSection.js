import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

class AnnouncementsSection extends Component {
  render() {
    return (
      <main>
        <section className="events__area pt-115 pb-120 p-relative">
          <div className="events__shape">
            <img
              className="events-1-shape"
              src="assets/img/events/events-shape.png"
              alt="img not found"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xxl-4 offset-xxl-4">
                <div className="section__title-wrapper mb-60 text-center">
                  <h2 className="section__title">
                    <span className="yellow-bg yellow-bg-big">
                      Announcements
                      <img
                        src="assets/img/shape/yellow-bg.png"
                        alt="img not found"
                      />
                    </span>
                  </h2>
                  <p>Announcements available</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="events__item mb-10 hover__active">
                  <div className="events__item-inner d-sm-flex align-items-center justify-content-between white-bg">
                    <div className="events__content">
                      <h3 className="events__title">
                          <a>Sports Week</a>
                        <p>Sports week from 22nd March to 27th March</p>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="events__item mb-10 hover__active active">
                  <div className="events__item-inner d-sm-flex align-items-center justify-content-between white-bg">
                    <div className="events__content">
                      <h3 className="events__title">
                          <a>Ehsaas Scholarship</a>
                        <p>To check the Ehsaas Program Application status, check NADRA Portal. Enter your CNIC number and code number on a portal to confirm your registration.</p>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="events__item mb-10 hover__active">
                  <div className="events__item-inner d-sm-flex align-items-center justify-content-between white-bg">
                    <div className="events__content">
                      <h3 className="events__title">
                          <a>Scholarship MS</a>
                        <p>Latest MS Mphil Scholarships 2022. Use our Scholarship search to find out suitable Scholarship opportunities in the country and outside the county.></p>
                      </h3>
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

export default AnnouncementsSection;
