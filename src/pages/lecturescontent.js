import * as React from 'react';
import HeaderAfter from './header-after-login';
import Footer from '../components/Layout/Footer/Footer';
import {DataGrid} from '@mui/x-data-grid';

const columns = [
  {field: 'id', headerName: 'ID', width: 50},
  {field: 'firstName', headerName: 'First name', width: 130},
  {field: 'lastName', headerName: 'Last name', width: 130},
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
];

const rows = [
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
  {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
  {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
  {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
  {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
  {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export default function DataTable() {
  return (
    <div>
      <div>
        <HeaderAfter />
      </div>
      <div className="pl-50 pr-50">
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2 className="section__title">
          Lecture{' '}
          <span className="yellow-bg yellow-bg-big">
            Content
            <img src="assets/img/shape/yellow-bg.png" alt="img not found" />
          </span>
        </h2>
        <br />
        <div style={{height: 400, width: '100%'}}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={40}
            rowsPerPageOptions={[40]}
          />
        </div>
        <br />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
