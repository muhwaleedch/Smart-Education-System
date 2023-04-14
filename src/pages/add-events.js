import React, {Component} from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import AddingEvent from '../components/EventDetails/AddEvents';

class AddEvent extends Component {
  render() {
    return (
      <React.Fragment>
        <AdminHeader />
        <AddingEvent />
      </React.Fragment>
    );
  }
}

export default AddEvent;
