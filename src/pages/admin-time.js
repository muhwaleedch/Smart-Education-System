import React from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import UploadTable from '../components/Timetable/UploadTimetable';

class AdminTimeTable extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <AdminHeader />
        <UploadTable />
      </React.Fragment>
    );
  }
}

export default AdminTimeTable;
