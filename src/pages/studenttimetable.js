import React, {Component} from 'react';

import StudentHeader from '../components/Layout/Header/StudentHeader';
import Studenttt from '../components/Timetable/Studenttt';

class StudentTime extends Component {
  render() {
    return (
      <React.Fragment>
        <StudentHeader />
        <Studenttt />
      </React.Fragment>
    );
  }
}

export default StudentTime;
