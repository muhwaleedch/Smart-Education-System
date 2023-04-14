import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import {teacherValidationSchema} from '../../utils/formikValidations'

import FUNCTION_UTILS from './../../utils/formik-utils';
import axios from "axios";

export const designations = [
  {
    value: 'Professor',
    label: 'Professor',
  },
  {
    value: 'Assistant Professor',
    label: 'Assistant Professor',
  },
  {
    value: 'Head of Department',
    label: 'Head of Department',
  },
  {
    value: 'Visiting Professor',
    label: 'Visiting Professor',
  },
];

const AddNewTeacher = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);

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
    validationSchema: teacherValidationSchema,
    onSubmit: values => {
      handleAddTeacher(values);
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

  const handleAddTeacher = (values) => {
    axios.post('http://localhost:8080/api/v1/admin/teacher/save', {
      ...values,
      department: {departmentId: values.department}
    })
      .then(() => {
        router.push('/instructor');
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
              <br/>
              <br/>
              <br/>
              <br/>
              <div className="section__title-wrapper mb-45">
                <h2 className="section__title">
                  {' '}
                  <span className="yellow-bg">
                    Add Teacher{' '}
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />{' '}
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
                  label="Select"
                  fullWidth
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
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  fullWidth
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
                    <h6>Employee Code</h6>
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
                            formik.touched['password'] &&
                            formik.errors['password']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'password')}
                    </div>
                  </div>
                  <br/>
                  <button type="submit" className="e-btn  w-100">
                    Add Teacher
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

export default AddNewTeacher;
