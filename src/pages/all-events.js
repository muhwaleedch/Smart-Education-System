import React, {Component} from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import AllEvents from '../components/AllEvents/AllEvents';

class AddEvent extends Component {
  render() {
    return (
      <React.Fragment>
        <AdminHeader />
        <AllEvents />
      </React.Fragment>
    );
  }
}

export default AddEvent;