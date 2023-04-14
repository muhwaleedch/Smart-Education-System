import React, {useEffect} from 'react';
import SignInMain from '../components/SignIn/SignInMain';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const SignIn = () => {
  const router = useRouter();
  const userPayload = useSelector(state => state.userInfo);

  useEffect(() => {
    if (userPayload?.userPayload) {
      router.back();
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <SignInMain />
      <Footer />
    </React.Fragment>
  );
};

export default SignIn;
