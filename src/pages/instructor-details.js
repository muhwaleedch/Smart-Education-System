import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import HeaderFour from '../components/Layout/Header/HeaderStyleFour';
import InstructorDetailsMain from '../components/InstructorDetails/InstructorDetailsMain';

class InstructorDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <HeaderFour />
        <InstructorDetailsMain />
        <Footer />
      </React.Fragment>
    );
  }
}

export default InstructorDetails;
