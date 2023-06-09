import React from 'react';
import CourseSidebarMain from '../components/CourseSidebar/CourseSidebarMain';
import Footer from '../components/Layout/Footer/Footer';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';

class CourseSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <HeaderThree />
        <CourseSidebarMain />
        <Footer />
      </React.Fragment>
    );
  }
}

export default CourseSidebar;
