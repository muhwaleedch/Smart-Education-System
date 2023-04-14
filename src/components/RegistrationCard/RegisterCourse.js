import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';
import {useFormik} from 'formik';


import {registerCourseSchema} from '../../utils/formikValidations'

import FUNCTION_UTILS from './../../utils/formik-utils';

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

const coursesList = [
  {
    value: 'DS',
    label: 'DS',
  },
  {
    value: 'Math',
    label: 'Math',
  },
];

const RegisterCourses = () => {
  const formik = useFormik({
    initialValues: {
      department: '',
      course: '',
    },
    validationSchema: registerCourseSchema,
    onSubmit: values => {
      handleAddTimetable(values);
    },
  });

  const handleAddTimetable = values => {
    console.log('values', values);
  };

  return (
    <main>
      <section className="category__area pt-60 pb-70">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8">
              <div className="section__title-wrapper mb-45">
                <h2 className="section__title">
                  <br />
                  <span className="yellow-bg">
                    Register Courses
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
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {FUNCTION_UTILS.getFormikError(formik, 'department')}
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  name="course"
                  value={formik.values['course']}
                  onChange={formik.handleChange}
                  style={{
                    border:
                      formik.touched['course'] &&
                      formik.errors['course']
                        ? '2px solid #FF6565'
                        : null,
                  }}
                  helperText="Select Course"
                  margin="normal"
                  variant="outlined">
                  {coursesList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {FUNCTION_UTILS.getFormikError(formik, 'course')}
                <div className="sign__form mt-3">
                  
                  <button type='submit' className="e-btn w-100">
                    Enroll
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

export default RegisterCourses;
