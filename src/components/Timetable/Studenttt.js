import React, {Component} from 'react';
class Event extends Component {
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
                    Time{' '}
                    <span className="yellow-bg yellow-bg-big">
                      Table
                      <img
                        src="assets/img/shape/yellow-bg.png"
                        alt="img not found"
                      />
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Event;
