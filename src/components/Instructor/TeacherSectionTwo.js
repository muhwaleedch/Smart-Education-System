import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import ReactTable from 'react-table-6';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';

import FUNCTION_UTILS from './../../utils/formik-utils';

import 'react-table-6/react-table.css';
import axios from 'axios';
import {designations} from "../Add Teacher/AddNewTeacher";

const departments = [
  {
    value: 'Department of Computer Science',
    label: 'CS',
  },
  {
    value: 'Department of Electrical and Electronics Engineering',
    label: 'EE',
  },
  {
    value: 'Department of Mechanical Engineering',
    label: 'ME',
  },
  {
    value: 'Department of Software Engineering',
    label: 'SE',
  },
];

const TeacherTwo = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [variables, setVariables] = useState({page: 1});
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllTeachers();
  }, [render]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        'http://localhost:8080/api/v1/admin/actions/all-departments'
      );
      setDepartments(result.data.payload);
    })();
  }, []);

  const getAllTeachers = async () => {
    setLoading(true);
    try {
      const data = await axios.get('http://localhost:8080/api/v1/admin/teacher/all');
      setTeachers(data.data.payload);
    } catch (error) {
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      department: '',
      designation: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      employeeCode: '',
      password: '',
    },
    onSubmit: values => {
      handleDialogSave(values);
    },
  });

  const handlePageChange = pg => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };

  const handleSearch = e => {
    e.preventDefault();
    let obj = {};
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }

    let searchVal = obj.value;
    if (searchVal) {
      setVariables({
        ...variables,
        _any: searchVal,
        page: 1,
        searchBy: [obj.searchBy],
      });
    }
  };

  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Second Name',
      accessor: 'lastName',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Department',
      accessor: 'department.departmentName',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Designation',
      accessor: 'designation',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Email',
      accessor: 'emailAddress',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Employee Code',
      accessor: 'employeeCode',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Contact No',
      accessor: 'phoneNumber',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Actions',
      style: {textAlign: 'center'},
      accessor: '',
      Cell: props => (
        <div className="d-flex justify-content-evenly">
          <div
            style={{cursor: 'pointer'}}
            onClick={() => {
              handleEdit(props.original);
            }}>
            Edit
          </div>
          <div
            style={{cursor: 'pointer'}}
            onClick={() => {
              handleDelete(props.original);
            }}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  const handleEdit = data => {
    console.log('data', data);
    setDialogue(true);
    formik.setValues(data);
  };

  const handleDelete = data => {
    axios.delete(`http://localhost:8080/api/v1/admin/teacher/delete?teacherId=${data.teacherId}`)
      .then(() => {
        return getAllTeachers();
      })
      .catch(() => {
      });
  };

  const handleDialogCancel = () => {
    setDialogue(false);
  };

  const handleDialogSave = values => {
    setRender(!render);
    axios.put(`http://localhost:8080/api/v1/admin/teacher/update`, {
      ...values,
      department: {departmentId: values.department}
    })
      .then(() => {
        return getAllTeachers()
      })
      .catch(() => {
      });
    setDialogue(false);
  };

  const CustomNoDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No Teachers found</div>;
  };

  return (
    <section className="hero__area hero__height align-items-center grey-bg-2 p-relative">
      <div className="hero__shape">
        <img
          className="hero-1-circle"
          src="assets/img/shape/hero/hero-1-circle.png"
          alt="img not found"
        />
        <img
          className="hero-1-circle-2"
          src="assets/img/shape/hero/hero-1-circle-2.png"
          alt="img not found"
        />
        <img
          className="hero-1-dot-2"
          src="assets/img/shape/hero/hero-1-dot-2.png"
          alt="img not found"
        />
      </div>
      <br/>

      <div className="container">
        <div className="row">
          <div className="col-xxl-6 offset-xxl-3">
            <div className="section__title-wrapper text-center mt-60 mb-60">
              <h2 className="section__title">
                Our <br/>
                Talented{' '}
                <span className="yellow-bg">
                  {' '}
                  Teachers{' '}
                  <img
                    src="assets/img/shape/yellow-bg-2.png"
                    alt="img not found"
                  />
                </span>
                <br/>
              </h2>
            </div>
            <div className="header__btn ml-20 pl-200 d-flex justify-content-end ">
              <Link href="/addteacher">
                <a className="e-btn">Add New Teacher</a>
              </Link>
            </div>
            <br/>
          </div>
        </div>
        <div className="mt-20">
          <ReactTable
            className="invoices-table"
            loading={loading}
            NoDataComponent={CustomNoDataComponent}
            loadingText={<div>...loading</div>}
            data={teachers ? teachers : []}
            columns={columns}
            onPageChange={pg => handlePageChange(pg)}
            page={variables.page - 1}
            manual
            pages={Math.ceil(teachers.length / 10)}
            showPageSizeOptions={false}
            showPageJump={true}
            minRows={1}
          />
        </div>
      </div>
      <Dialog
        open={dialogue}
        onClose={() => setDialogue(false)}
        fullWidth={'md'}>
        <DialogTitle>Update Teacher</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              label="Department"
              name="department"
              value={formik.values['department']}
              onChange={formik.handleChange}
              style={{
                border:
                  formik.touched['department'] && formik.errors['department']
                    ? '2px solid #FF6565'
                    : null,
              }}
              helperText="Select Department"
              margin="normal"
              variant="outlined">
              {departments.map(option => (
                <MenuItem key={option.departmentId} value={option.departmentId}>
                  {option.departmentName}
                </MenuItem>
              ))}
            </TextField>
            {FUNCTION_UTILS.getFormikError(formik, 'department')}
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              label="Designation"
              name="designation"
              value={formik.values['designation']}
              onChange={formik.handleChange}
              style={{
                border:
                  formik.touched['designation'] && formik.errors['designation']
                    ? '2px solid #FF6565'
                    : null,
              }}
              helperText="Select Designation"
              margin="normal"
              variant="outlined">
              {designations.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {FUNCTION_UTILS.getFormikError(formik, 'designation')}
            <div className="sign__form">
              <div className="sign__input-wrapper mb-10">
                <h6>Enter First Name</h6>
                <div className="sign__input">
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formik.values['firstName']}
                    onChange={formik.handleChange}
                    style={{
                      border:
                        formik.touched['firstName'] && formik.errors['firstName']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                  />
                  {FUNCTION_UTILS.getFormikError(formik, 'firstName')}
                </div>
              </div>
              <div className="sign__input-wrapper mb-10">
                <h6>Enter Last Name</h6>
                <div className="sign__input">
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formik.values['lastName']}
                    onChange={formik.handleChange}
                    style={{
                      border:
                        formik.touched['lastName'] && formik.errors['lastName']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                  />
                  {FUNCTION_UTILS.getFormikError(formik, 'lastName')}
                </div>
              </div>
              <div className="sign__input-wrapper mb-10">
                <h6>Email</h6>
                <div className="sign__input">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="emailAddress"
                    value={formik.values['emailAddress']}
                    onChange={formik.handleChange}
                    style={{
                      border:
                        formik.touched['emailAddress'] && formik.errors['emailAddress']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                  />
                  {FUNCTION_UTILS.getFormikError(formik, 'emailAddress')}
                </div>
              </div>
              <div className="sign__input-wrapper mb-10">
                <h6>Contact Number</h6>
                <div className="sign__input">
                  <input
                    type="text"
                    placeholder="Enter Contact Number"
                    name="phoneNumber"
                    value={formik.values['phoneNumber']}
                    onChange={formik.handleChange}
                    style={{
                      border:
                        formik.touched['phoneNumber'] &&
                        formik.errors['phoneNumber']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                  />
                  {FUNCTION_UTILS.getFormikError(formik, 'phoneNumber')}
                </div>
              </div>
              <div className="sign__input-wrapper mb-10">
                <h6>EmployeeCode</h6>
                <div className="sign__input">
                  <input
                    type="text"
                    placeholder="Enter Employee Code"
                    name="employeeCode"
                    value={formik.values['employeeCode']}
                    onChange={formik.handleChange}
                    style={{
                      border:
                        formik.touched['employeeCode'] &&
                        formik.errors['employeeCode']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                  />
                  {FUNCTION_UTILS.getFormikError(formik, 'employeeCode')}
                </div>
              </div>
              <div className="sign__input-wrapper mb-10">
                <h6>Password</h6>
                <div className="sign__input">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={formik.values['password']}
                    onChange={formik.handleChange}
                    style={{
                      border:
                        formik.touched['password'] && formik.errors['password']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                  />
                  {FUNCTION_UTILS.getFormikError(formik, 'password')}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogCancel()}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </section>
  );
};

export default TeacherTwo;
