import React from 'react';
import AdminHeader from "../components/Layout/Header/AdminHeader";
import AllStudents from "../components/AllStudents/AllStudents";

const AllStudent = () => {
  return (
    <React.Fragment>
      <AdminHeader/>
      <AllStudents/>
    </React.Fragment>
  );
}

export default AllStudent;
