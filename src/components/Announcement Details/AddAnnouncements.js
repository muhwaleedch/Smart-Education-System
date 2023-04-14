import React from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';

import FUNCTION_UTILS from './../../utils/formik-utils';
import {announcementValidationSchema} from '../../utils/formikValidations';

const AddingAnnouncement = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: announcementValidationSchema,
    onSubmit: values => {
      handleAddAnnouncement(values);
    },
  });

  const handleAddAnnouncement = values => {
    router.push('all-announcements');
    console.log('values', values);
  };

  return (
    <main>
      <section className="hero__area hero__height align-items-center grey-bg-2 p-relative">
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
          <div className="row align-items-center justify-content-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8">
              <br />
              <br />
              <br />
              <div className="section__title-wrapper mb-45">
                <h2 className="section__title">
                  <span className="yellow-bg">
                    Add Announcement
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />
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
                    <h6>Announcement Title</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Title"
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
                    <h6>Announcement Description</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Description"
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
                  <br />
                  <button type="submit" className="e-btn  w-100">
                    <span></span> Add Announcement
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

export default AddingAnnouncement;
