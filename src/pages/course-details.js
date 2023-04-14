import React from 'react';
import CourseDetailsMain from '../components/CourseDetails/CourseDetailsMain';
import TeacherHeader from "../components/Layout/Header/TeacherHeder";

const CourseDetails = () => {

  return (
    <React.Fragment>
      <TeacherHeader/>
      <CourseDetailsMain/>
    </React.Fragment>
  );
}

export default CourseDetails;
