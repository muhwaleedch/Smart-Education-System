import * as yup from 'yup';

const phoneRegExp = /^[0-9]{10}$/g;

export const registerCourseSchema = yup.object().shape({

  course: yup
    .string()
    .required('course is required'),
  department: yup
    .string('Enter department')
    .required('department is required'),
});
export const announcementValidationSchema = yup.object().shape({

  title: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('title is required'),
  description: yup
    .string('Enter description')
    .required('description is required'),
});

export const eventValidationSchema = yup.object().shape({
  category: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('category is required'),
  title: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('title is required'),
  description: yup
    .string('Enter description')
    .required('description is required'),
  time: yup
    .number()
    .required('time is required'),
  lastDate: yup
    .number()
    .required('last Date is required'),
  venue: yup
    .number()
    .typeError('venue must be a number')
    .min(1, 'Enter valid number.')
    .required('venue is required'),
});

export const teacherValidationSchema = yup.object().shape({
  department: yup
    .string()
    .required('Department is required'),
  designation: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('designation is required'),
  firstName: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('Last name is required'),
  emailAddress: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phoneNumber: yup
    .number()
    .required('Phone no is required'),
  employeeCode: yup
    .number()
    .typeError('employeeCode No must be a number')
    .min(1, 'Enter valid number.')
    .required('employeeCode No is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
});

export const studentValidationSchema = yup.object().shape({
  department: yup
    .string()
    .required('Department is required'),
  firstName: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, 'At least 3 character required')
    .required('Last name is required'),
  emailAddress: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phoneNumber: yup
    .number()
    .required('Phone no is required'),
  registrationNumber: yup
    .string()
    .min(1, 'Enter valid number.')
    .required('Registration No is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
});
