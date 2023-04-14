import React from 'react';
import CourseDetailsMain from '../components/CourseDetails/CourseDetailsMain';
import StudentHeader from '../components/Layout/Header/StudentHeader';
import CourseDetailStudent from '../components/CourseDetails/CourseDetailStudent';

class CourseDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <StudentHeader />
        <CourseDetailStudent />
      </React.Fragment>
    );
  }
}

export default CourseDetails;
