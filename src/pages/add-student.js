import React from 'react';
import AdminHeader from "../components/Layout/Header/AdminHeader";
import AddStudent from "../components/Add Student/NewStudent.js";

const AddNewStudent = () => {
  return (
    <React.Fragment>
      <AdminHeader/>
      <AddStudent/>
    </React.Fragment>
  );
}

export default AddNewStudent;
