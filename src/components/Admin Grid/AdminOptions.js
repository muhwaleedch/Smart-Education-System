import React, {Component} from 'react';
import Link from 'next/link';

class AdminOption extends Component {
  render() {
    return (
      <main>
        <section className="hero__area hero__height d-flex align-items-center grey-bg-2 p-relative">
          <div className="hero__shape">
            <img
              className="hero-1-circle"
              src="assets/img/shape/hero/hero-1-circle.png"
              alt="img not found"
            />
            <img
              className="hero-1-circle-2"
              src="assets/img/shape/hero/hero-1-circle-2.png"
              alt="img not found"
            />
            <img
              className="hero-1-dot-2"
              src="assets/img/shape/hero/hero-1-dot-2.png"
              alt="img not found"
            />
          </div>
          <div className="container">
            <div className="row align-items-end">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8">
                <div className="section__title-wrapper mb-45">
                  <h2 className="section__title">
                    {' '}
                    <span className="yellow-bg">
                      Dashboard{' '}
                      <img
                        src="assets/img/shape/yellow-bg-2.png"
                        alt="img not found"
                      />{' '}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g></g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href="/instructor">
                        <a>Teachers</a>
                      </Link>
                    </h4>
                    <p>Manage Teachers</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g></g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href="/all-student">
                        <a>Students</a>
                      </Link>
                    </h4>
                    <p>Manage Students</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g></g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href="all-events">
                        <a>Events</a>
                      </Link>
                    </h4>
                    <p>Manage Events</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g></g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href="/all-announcements">
                        <a>Announcements</a>
                      </Link>
                    </h4>
                    <p>Manage Announcements</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g></g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href="/admin-time">
                        <a>TimeTable</a>
                      </Link>
                    </h4>
                    <p>Upload TimeTable</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g></g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href="/all-courses">
                        <a>Course</a>
                      </Link>
                    </h4>
                    <p>Add Courses</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g></g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href="/course-allocation">
                        <a>Assign Courses</a>
                      </Link>
                    </h4>
                    <p>Course Allocation</p>
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

export default AdminOption;
