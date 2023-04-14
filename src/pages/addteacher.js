import React from 'react';
import AddNewTeacher from '../components/Add Teacher/AddNewTeacher';
import AdminHeader from '../components/Layout/Header/AdminHeader';

const AddTeacher = () => {
  return (
    <React.Fragment>
      <AdminHeader />
      <AddNewTeacher />
    </React.Fragment>
  );
};

export default AddTeacher;
