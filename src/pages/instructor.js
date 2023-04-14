import React from 'react';
import InstructorMain from '../components/Instructor/InstructorMain';
import Footer from '../components/Layout/Footer/Footer';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import AdminHeader from "../components/Layout/Header/AdminHeader";

class Instructor extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <AdminHeader />
        <InstructorMain />
      </React.Fragment>
    );
  }
}

export default Instructor;
