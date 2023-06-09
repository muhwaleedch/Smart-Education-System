import React from 'react';
import CourseListMain from '../components/CourseList/CourseListMain';
import Footer from '../components/Layout/Footer/Footer';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <HeaderThree />
        <CourseListMain />
        <Footer />
      </React.Fragment>
    );
  }
}

export default CourseList;
