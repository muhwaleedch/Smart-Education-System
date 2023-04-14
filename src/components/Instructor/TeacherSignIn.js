import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {loginUser} from "../../redux/actions/user";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const SignInTeacher = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [teacherLoginDetails, setTeacherLoginDetails] = useState({
    emailAddress: '',
    password: ''
  });

  const onChangeHandler = (updateValue, key) => {
    setTeacherLoginDetails({...teacherLoginDetails, [key]: updateValue});
  };

  const handleLogin = () => {
    let signData = {
      emailAddress: teacherLoginDetails.emailAddress,
      password: teacherLoginDetails.password,
      role: 'TEACHER',
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
                  Teacher Login <br/>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                  }}>
                    <div className="sign__input-wrapper mb-25">
                      <h5>Email</h5>
                      <div className="sign__input">
                        <input type="email" onChange={(e) => {
                          onChangeHandler(e.target.value, 'emailAddress');
                        }} placeholder="Enter Email "/>
                        <i>
                          <FontAwesomeIcon icon={['fas', 'envelope']}/>
                        </i>
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-10">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input onChange={(e) => {
                          onChangeHandler(e.target.value, 'password');
                        }} type="password" placeholder="Password"/>
                        <i>
                          <FontAwesomeIcon icon={['fas', 'lock']}/>
                        </i>
                      </div>
                    </div>
                    <div className="sign__action d-sm-flex justify-content-between mb-30">
                    </div>
                    <button onClick={handleLogin} className="e-btn w-100">
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
}

export default SignInTeacher;
