import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

import {useFormik} from 'formik';

import FUNCTION_UTILS from './../../utils/formik-utils';
import {loginUser} from './../../redux/actions/user';

const SignAdminIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
    },
    onSubmit: values => {
      handleLogin(values);
    },
  });

  const handleLogin = values => {
    let signData = {
      emailAddress: values.emailAddress,
      password: values.password,
      role: 'ADMIN',
    };
    dispatch(loginUser(signData, router));
  };
  return (
    <main>
      <section className="signup__area po-rel-z1 pt-100 pb-145">
        <div className="sign__shape">
          <img
            className="man-1"
            src="assets/img/icon/sign/man-1.png"
            alt="img not found"
          />
          <img
            className="man-2"
            src="assets/img/icon/sign/man-2.png"
            alt="img not found"
          />
          <img
            className="circle"
            src="assets/img/icon/sign/circle.png"
            alt="img not found"
          />
          <img
            className="zigzag"
            src="assets/img/icon/sign/zigzag.png"
            alt="img not found"
          />
          <img
            className="dot"
            src="assets/img/icon/sign/dot.png"
            alt="img not found"
          />
          <img
            className="bg"
            src="assets/img/icon/sign/sign-up.png"
            alt="img not found"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-55">
                <h2 className="section__title">
                  Admin Login <br />
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="sign__input-wrapper mb-25">
                      <h5>Email</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="emailAddress"
                          placeholder="Enter Email "
                          value={formik.values['emailAddress']}
                          onChange={formik.handleChange}
                          style={{
                            border:
                              formik.touched['emailAddress'] && formik.errors['emailAddress']
                                ? '2px solid #FF6565'
                                : null,
                          }}
                        />
                        <i>
                          <FontAwesomeIcon icon={['fas', 'envelope']} />
                        </i>
                        {FUNCTION_UTILS.getFormikError(formik, 'emailAddress')}
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-10">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formik.values['password']}
                          onChange={formik.handleChange}
                          style={{
                            border:
                              formik.touched['password'] &&
                              formik.errors['password']
                                ? '2px solid #FF6565'
                                : null,
                          }}
                        />

                        <i>
                          <FontAwesomeIcon icon={['fas', 'lock']} />
                        </i>
                        {FUNCTION_UTILS.getFormikError(formik, 'password')}
                      </div>
                    </div>
                    <div className="sign__action d-sm-flex justify-content-between mb-30"></div>
                    <button type="submit" className="e-btn w-100">
                      Sign In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignAdminIn;
