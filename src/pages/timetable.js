import React, {Component, useEffect, useState} from 'react';

import TeacherHeader from '../components/Layout/Header/TeacherHeder';
import Teachertt from '../components/Timetable/Teachertt';
class TeacherTime extends Component {
  render() {
    return (
      <React.Fragment>
        <TeacherHeader />
        <Teachertt />
      </React.Fragment>
    );
  }
}
export default TeacherTime;
