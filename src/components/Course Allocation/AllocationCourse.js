import React, {useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';

import FUNCTION_UTILS from './../../utils/formik-utils';
import axios from "axios";

const AssignCourse = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const formik = useFormik({
    initialValues: {
      departmentId: '',
      courseId: '',
      teacherId: '',
    },
    onSubmit: values => {
      handleAllocateCourse(values);
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

  const handleAllocateCourse = values => {
    axios.post(
      `http://localhost:8080/api/v1/admin/actions/allocate-courses-teacher`, [values]
    )
      .then(() => {
        formik.resetForm();
      })
      .catch(() => {
      });
  };

  const onDepartmentChange = (e) => {
    formik.handleChange(e);
    (async () => {
      const result = await axios.get(
        `http://localhost:8080/api/v1/admin/teacher/all-by-department?departmentId=${e.target.value}`
      );
      setTeachers(result.data.payload);
    })();
    (async () => {
      const result = await axios.get(
        `http://localhost:8080/api/v1/admin/course/all-by-department?departmentId=${e.target.value}`
      );
      setCourses(result.data.payload);
    })();
    formik.setFieldValue("courseId", "");
    formik.setFieldValue("teacherId", "");
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
                    Course Allocation{' '}
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
                  name="departmentId"
                  value={formik.values['departmentId']}
                  onChange={onDepartmentChange}
                  style={{
                    border:
                      formik.touched['departmentId'] &&
                      formik.errors['departmentId']
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
                {FUNCTION_UTILS.getFormikError(formik, 'departmentId')}
                <div className="sign__form">
                  <div className="sign__input-wrapper mb-10">
                    <h6>Select Course</h6>
                    <div className="sign__input">
                      <TextField
                        select
                        label="Select Course"
                        fullWidth
                        placeholder="Select Course"
                        disabled={courses.length === 0}
                        helperText="Select Course"
                        margin="normal"
                        variant="outlined"
                        name="courseId"
                        value={formik.values['courseId']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['courseId'] && formik.errors['courseId']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      >
                        {courses.map(option => (
                          <MenuItem key={option.courseId} value={option.courseId}>
                            {option.courseName}
                          </MenuItem>
                        ))}
                      </TextField>
                      {FUNCTION_UTILS.getFormikError(formik, 'courseId')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <div className="sign__input">
                      <TextField
                        label="Select Teacher"
                        select
                        fullWidth
                        placeholder="Enter Teacher Name"
                        name="teacherId"
                        disabled={teachers.length === 0}
                        value={formik.values['teacherId']}
                        onChange={formik.handleChange}
                        helperText="Select Teacher"
                        margin="normal"
                        variant="outlined"
                        style={{
                          border:
                            formik.touched['teacherId'] &&
                            formik.errors['teacherId']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      >
                        {teachers.map(option => (
                          <MenuItem key={option.teacherId} value={option.teacherId}>
                            {option.firstName}&nbsp;{option.lastName}
                          </MenuItem>
                        ))}
                      </TextField>
                      {FUNCTION_UTILS.getFormikError(formik, 'teacherId')}
                    </div>
                  </div>
                  <br/>
                  <button type="submit" className="e-btn  w-100">
                    Assign Course
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

export default AssignCourse;
