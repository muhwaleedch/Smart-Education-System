import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {loginUser} from "../../redux/actions/user";

const SignInMain = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [studentSignInData, setStudentSignInData] = useState({
    emailAddress: '',
    password: ''
  });

  const onHandleChange = (updatedValue, key) => {
    setStudentSignInData({...studentSignInData, [key]: updatedValue});
  };

  const userLogin = () => {
    dispatch(loginUser({...studentSignInData, role: "STUDENT"}, router))
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
                  Student Login <br/>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <form onSubmit={(e) => {e.preventDefault();}}>
                    <div className="sign__input-wrapper mb-25">
                      <h5>Email</h5>
                      <div className="sign__input">
                        <input type="text" placeholder="Enter Email " onChange={(e) => {
                          onHandleChange(e.target.value, "emailAddress");
                        }}/>
                        <i>
                          <FontAwesomeIcon icon={['fas', 'envelope']}/>
                        </i>
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-10">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input type="password" placeholder="Password" onChange={(e) => {
                          onHandleChange(e.target.value, "password");
                        }}/>
                        <i>
                          <FontAwesomeIcon icon={['fas', 'lock']}/>
                        </i>
                      </div>
                    </div>
                    <div className="sign__action d-sm-flex justify-content-between mb-30">
                    </div>
                    <button className="e-btn  w-100" type="button" onClick={userLogin}>
                      <span></span> Sign In
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

export default SignInMain;
