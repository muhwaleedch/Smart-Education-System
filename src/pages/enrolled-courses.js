import React, {Component} from 'react';

import StudentHeader from '../components/Layout/Header/StudentHeader';
import EnrolledCourses from '../components/EnrolledCourses/EnrolledCourses';

class StudentCourseReg extends Component {
  render() {
    return (
      <React.Fragment>
        <StudentHeader />
        <EnrolledCourses />
      </React.Fragment>
    );
  }
}

export default StudentCourseReg;
