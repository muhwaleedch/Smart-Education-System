import React, {useEffect, useState} from 'react';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
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

const AddCourse = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        'http://localhost:8080/api/v1/admin/actions/all-departments'
      );
      setDepartments(result.data.payload);
    })();
  }, []);

  const formik = useFormik({
    initialValues: {
      courseName: '',
      courseCode: '',
      creditHours: '',
      courseDescription: '',
      semesterNumber: '',
      department: '',
    },
    onSubmit: values => {
      handleAddCourse(values);
    },
  });

  const handleAddCourse = values => {
    axios.post(
      'http://localhost:8080/api/v1/admin/course/save',
      {
        courseName: values.courseName,
        courseCode: values.courseCode,
        creditHours: values.creditHours,
        courseDescription: values.courseDescription,
        semesterNumber: values.semesterNumber,
        department: {
          departmentId: values.department
        }
      }
    )
      .then(() => {
        return router.push('/all-courses');
      })
      .catch((e) => {
        console.log('Error Occurred', e);
      })
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
              <div className="section__title-wrapper mb-45">
                <h2 className="section__title">
                  {' '}
                  <span className="yellow-bg">
                      Add course{' '}
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
                  variant="outlined"
                >
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
                    <h6>Course Title</h6>
                    <div className="sign__input">
                      <input type="text" placeholder="Enter Title"
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
                      <input type="text" placeholder="Enter Credit Hour"
                             name="creditHours"
                             value={formik.values['creditHours']}
                             onChange={formik.handleChange}
                             style={{
                               border:
                                 formik.touched['creditHours'] && formik.errors['creditHours']
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
                      <input type="text" placeholder="Enter Course Code"
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
                      <input type="text" placeholder="Enter Course Description"
                             name="courseDescription"
                             value={formik.values['courseDescription']}
                             onChange={formik.handleChange}
                             style={{
                               border:
                                 formik.touched['courseDescription'] && formik.errors['courseDescription']
                                   ? '2px solid #FF6565'
                                   : null,
                             }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'courseDescription')}
                    </div>
                  </div>
                  <br/>
                  <button type='submit' className="e-btn  w-100">
                    Add Course
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddCourse;
