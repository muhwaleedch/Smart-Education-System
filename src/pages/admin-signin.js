import React, {useEffect} from 'react';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import SignAdminIn from "../components/Admin Grid/SignInAdmin";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const AdminSignIn = () => {
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
      <SignAdminIn />
      <Footer />
    </React.Fragment>
  );
}

export default AdminSignIn;
