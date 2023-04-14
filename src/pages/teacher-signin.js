import React, {useEffect} from 'react';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import SignInTeacher from "../components/Instructor/TeacherSignIn";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const TeacherSignIn = () => {
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
      <SignInTeacher />
      <Footer />
    </React.Fragment>
  );
}

export default TeacherSignIn;
