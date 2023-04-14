import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import ReactTable from 'react-table-6';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useFormik} from 'formik';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {useRouter} from 'next/router';

import FUNCTION_UTILS from './../../utils/formik-utils';

import 'react-table-6/react-table.css';
import axios from "axios";

const AllEvents = () => {
  const columns = [
    {
      Header: 'Course Name',
      accessor: 'courseName',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Course Code',
      accessor: 'courseCode',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Credit Hours',
      accessor: 'creditHours',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Description',
      accessor: 'courseDescription',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Semester',
      accessor: 'semesterNumber',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Department',
      accessor: 'department.departmentName',
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
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [variables, setVariables] = useState({page: 1});
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        'http://localhost:8080/api/v1/admin/actions/all-departments'
      );
      setDepartments(result.data.payload);
    })();
  }, []);

  const getAllCourses = async () => {
    setLoading(true);
    const result = await axios.get(
      'http://localhost:8080/api/v1/admin/course/all'
    );
    setCourses(result.data.payload);
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      department: '',
      courseName: '',
      creditHours: '',
      courseCode: '',
      courseDescription: '',
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

  const handleEdit = data => {
    setDialogue(true);
    formik.setValues(data);
  };

  const handleDelete = data => {
    axios.delete(
      `http://localhost:8080/api/v1/admin/course/delete?courseId=${data.courseId}`
    )
      .then(() => {return getAllCourses();})
      .catch(() =>{});
  };

  const handleDialogCancel = () => {
    setDialogue(false);
  };
  const handleDialogSave = values => {
    axios.put(
      'http://localhost:8080/api/v1/admin/course/update',
      {...values}
    )
      .then(() => {return getAllCourses();})
      .catch(() =>{});
    setDialogue(false);
  };

  const CustomNoDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No courses found</div>;
  };

  return (
    <main>
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
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3">
              <div className="section__title-wrapper mt-60 text-center mb-60">
                <h2 className="section__title">
                  <span className="yellow-bg">
                    Courses
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />
                  </span>
                  <br/>
                </h2>
              </div>
              <div className="header__btn d-flex justify-content-end ">
                <Link href="/add-course">
                  <a className="e-btn">Add New Course</a>
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
              data={courses ? courses : []}
              columns={columns}
              onPageChange={pg => handlePageChange(pg)}
              page={variables.page - 1}
              manual
              pages={Math.ceil(courses.length / 10)}
              showPageSizeOptions={false}
              showPageJump={true}
              minRows={1}
            />
          </div>
          <Dialog
            open={dialogue}
            onClose={() => setDialogue(false)}
            fullWidth
          >
            <DialogTitle>Add Course</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <DialogContent>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  name="department"
                  value={formik.values['department']}
                  onChange={formik.handleChange}
                  style={{
                    border:
                      formik.touched['department'] &&
                      formik.errors['department']
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
                <div className="sign__form">
                  <div className="sign__input-wrapper mb-10">
                    <h6>Course Title</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Title"
                        name="courseName"
                        value={formik.values['courseName']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['courseName'] && formik.errors['courseName']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'courseName')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Credit Hour</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Credit Hour"
                        name="creditHours"
                        value={formik.values['creditHours']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['creditHours'] &&
                            formik.errors['creditHours']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'creditHours')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Course Code</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Course Code"
                        name="courseCode"
                        value={formik.values['courseCode']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['courseCode'] && formik.errors['courseCode']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'courseCode')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Course Description</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Course Description"
                        name="courseDescription"
                        value={formik.values['courseDescription']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['courseDescription'] &&
                            formik.errors['courseDescription']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'courseDescription')}
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
        </div>
      </section>
    </main>
  );
};

export default AllEvents;
