import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {useFormik} from 'formik';

import FUNCTION_UTILS from './../../utils/formik-utils';

const Input = styled('input')({
  display: 'none',
});

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

const type = [
  {
    value: 'Teacher',
    label: 'Teacher',
  },
  {
    value: 'Student',
    label: 'Student',
  },
];

const UploadTable = () => {
  const formik = useFormik({
    initialValues: {
      department: '',
      designation: '',
    },
    onSubmit: values => {
      handleAddTimetable(values);
    },
  });

  const handleAddTimetable = values => {
    console.log('values', values);
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
                    Upload TimeTable{' '}
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
                  name="designation"
                  value={formik.values['designation']}
                  onChange={formik.handleChange}
                  style={{
                    border:
                      formik.touched['designation'] &&
                      formik.errors['designation']
                        ? '2px solid #FF6565'
                        : null,
                  }}
                  helperText="Select Designation"
                  margin="normal"
                  variant="outlined">
                  {type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {FUNCTION_UTILS.getFormikError(formik, 'designation')}
                <div className="sign__form">
                  <Stack direction="column" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                      />
                      <Button variant="contained" component="span">
                        Upload
                      </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"></IconButton>
                    </label>
                  </Stack>
                  <br />
                  <button type='submit' className="e-btn w-100">
                    Submit
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

export default UploadTable;
