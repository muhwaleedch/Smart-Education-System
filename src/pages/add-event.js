import React from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import AddEvent from '../components/EventDetails/AddEvents';

const AddNewEvent =()=>{

    return (
      <React.Fragment>
        <AdminHeader />
        <AddEvent />
      </React.Fragment>
    );
  }

export default AddNewEvent;