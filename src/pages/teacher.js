import React from 'react';

import TeacherHeader from '../components/Layout/Header/TeacherHeder';
import TeacherCourses from '../components/Courses/TeacherCourses';

const Teacher= ()=>{
    return (
      <React.Fragment>
        <TeacherHeader />
        <TeacherCourses />
      </React.Fragment>
    );
  }

export default Teacher;
