import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';

import FUNCTION_UTILS from './../../utils/formik-utils';
import axios from "axios";

const semesters = [
  {val: "SEMESTER_I", label: "Semester I"},
  {val: "SEMESTER_II", label: "Semester II"},
  {val: "SEMESTER_III", label: "Semester III"},
  {val: "SEMESTER_IV", label: "Semester IV"},
  {val: "SEMESTER_V", label: "Semester V"},
  {val: "SEMESTER_VI", label: "Semester VI"},
  {val: "SEMESTER_VII", label: "Semester VII"},
  {val: "SEMESTER_VIII", label: "Semester VIII"},
];

const AddNewStudent = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);

  const formik = useFormik({
    initialValues: {
      department: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      registrationNumber: '',
      password: '',
      semesterNumber: '',
    },
    onSubmit: values => {
      handleAddStudent(values);
    },
  });

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        'http://localhost:8080/api/v1/admin/actions/all-departments'
      );
      setDepartments(result.data.payload);
    })();
  }, []);

  const handleAddStudent = values => {
    const formValues = values;
    formValues.department = {departmentId: values.department};
    axios.post('http://localhost:8080/api/v1/admin/student/save', formValues)
      .then(() => {
        return router.push('/all-student');
      })
      .catch(() => {
      });
  };

  return (
    <main>
      <section className="hero__area hero__height d-flex align-items-center grey-bg-2 p-relative">
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
          <div className="row align-items-end">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8">
              <div className="section__title-wrapper">
                <h2 className="section__title">
                  <span className="yellow-bg">
                    Add Student
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="sign__wrapper white-bg">
                <TextField
                  id="outlined-select-currency"
                  select
                  fullWidth
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
                <TextField
                  id="outlined-select-currency"
                  select
                  fullWidth
                  label="Select"
                  name="semesterNumber"
                  value={formik.values['semesterNumber']}
                  onChange={formik.handleChange}
                  style={{
                    border:
                      formik.touched['semesterNumber'] &&
                      formik.errors['semesterNumber']
                        ? '2px solid #FF6565'
                        : null,
                  }}
                  helperText="Select Semester"
                  margin="normal"
                  variant="outlined"
                >
                  {semesters.map(option => (
                    <MenuItem key={option.val} value={option.val}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {FUNCTION_UTILS.getFormikError(formik, 'semesterNumber')}
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
                            formik.touched['phoneNumber'] && formik.errors['phoneNumber']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'phoneNumber')}

                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Registration Number</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Registration Number"
                        name="registrationNumber"
                        value={formik.values['registrationNumber']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['registrationNumber'] && formik.errors['registrationNumber']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'registrationNumber')}
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
                  <br/>
                  <button type="submit" className="e-btn  w-100">
                    Add Student
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddNewStudent;
