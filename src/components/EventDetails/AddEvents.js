import React from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';

import {eventValidationSchema} from '../../utils/formikValidations'

import FUNCTION_UTILS from './../../utils/formik-utils';

const AddingEvent = () => {

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      description: '',
      lastDate: '',
      time: '',
      venue: '',
    },
    validationSchema: eventValidationSchema,
    onSubmit: values => {
      handleAddEvent(values);
    },
  });

  const handleAddEvent = values => {
    router.push('all-events')
    console.log('values', values);
  };

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
              <br />
              <br />
              <br />
              <div className="section__title-wrapper mb-45">
                <h2 className="section__title">
                  {' '}
                  <span className="yellow-bg">
                    Add Event{' '}
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />{' '}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
            <div className="sign__wrapper white-bg">
              <div className="sign__form">
                <form onSubmit={formik.handleSubmit}>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Category Name</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Category Name"
                        name="category"
                        value={formik.values['category']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['category'] &&
                            formik.errors['category']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'category')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Title</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Title"
                        name="title"
                        value={formik.values['title']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['title'] && formik.errors['title']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'title')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Description</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Description"
                        name="description"
                        value={formik.values['description']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['description'] &&
                            formik.errors['description']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'description')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Last Date</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Last Date"
                        name="lastDate"
                        value={formik.values['lastDate']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['lastDate'] &&
                            formik.errors['lastDate']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'lastDate')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Time</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Time"
                        name="time"
                        value={formik.values['time']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['time'] && formik.errors['time']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'time')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Venue</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Venue"
                        name="venue"
                        value={formik.values['venue']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['venue'] && formik.errors['venue']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'venue')}
                    </div>
                  </div>
                  <br />
                  <button type="submit" className="e-btn  w-100">
                    Add Event
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddingEvent;
