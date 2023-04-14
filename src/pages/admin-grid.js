import React from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import AdminOptions from '../components/Admin Grid/AdminOptions';

class AdminGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <AdminOptions />
      </React.Fragment>
    );
  }
}

export default AdminGrid;
