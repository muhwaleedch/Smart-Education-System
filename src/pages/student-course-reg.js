import React, {Component} from 'react';

import StudentHeader from '../components/Layout/Header/StudentHeader';
import RegisterCourse from '../components/RegistrationCard/RegisterCourse';

class StudentCourseReg extends Component {
  render() {
    return (
      <React.Fragment>
        <StudentHeader />
        <RegisterCourse />
      </React.Fragment>
    );
  }
}

export default StudentCourseReg;
