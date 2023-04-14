import React from 'react';
import StudentHeader from '../components/Layout/Header/StudentHeader';
import StudentCourses from '../components/Courses/StudentCourses';

const TeacherCourse = ()=> {
    return (
      <React.Fragment>
        <StudentHeader />
        <StudentCourses />
      </React.Fragment>
    );
  }

export default TeacherCourse;
