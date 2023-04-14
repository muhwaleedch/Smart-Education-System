import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useFormik} from 'formik';

import FUNCTION_UTILS from './../../utils/formik-utils';
import axios from "axios";
import {useRouter} from "next/router";

const questionTypeOptions = [
  {
    value: 'objective',
    label: 'objective',
  },
  // {
  //   value: 'subjective',
  //   label: 'subjective',
  // },
];

const sheetTypeOptions = [
  {
    value: 'quiz',
    label: 'quiz',
  },
  // {
  //   value: 'assignment',
  //   label: 'assignment',
  // },
  // {
  //   value: 'mid',
  //   label: 'mid',
  // },
  // {
  //   value: 'final',
  //   label: 'final',
  // },
];

const AddNewQuizAssign = () => {
  const router = useRouter();
  const {courseId} = router.query;

  const [objectives, setObjectives] = useState([
    {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOption: '',
      marks: ''
    },
  ]);
  const [subjectives, setSubjectives] = useState([
    {
      question: '',
      questionMarks: '',
    },
  ]);

  const formik = useFormik({
    initialValues: {
      sheetType: '',
      sylabus: '',
      sheetName: '',
      questionType: '',
      startTime: new Date('2022-08-18T21:11:54'),
      endTime: new Date('2022-08-18T21:11:54'),
      courseId: ''
    },
    onSubmit: values => {
      handleAddQuestion(values);
    },
  });

  const handleAddQuestion = values => {
    if (values.questionType === "objective") {
      axios.post(`http://localhost:8080/api/v1/teacher/create-quiz?syllabus=${values.sylabus}&sheetName=${values.sheetName}&courseId=${courseId}`, objectives)
        .then(response => {
          router.back();
        })
        .catch(error => {
          console.log('error', error);
        });
    } else if (values.questionType === "subjective") {
      const listToPost = subjectives.map(it => {
        return {questionMarks: +it.questionMarks, question: it.question};
      });
      axios.post(`http://localhost:8080/api/v1/teacher/create-assignment?syllabus=${values.sylabus}&sheetName=${values.sheetName}&courseId=${courseId}&fileUrl=`, listToPost)
        .then(() => {
          router.back();
        })
        .catch(() => {
        });
    }
  };

  const handleObjectivesChange = (e, index) => {
    let data = [...objectives];
    data[index][e.target.name] = e.target.value;
    setObjectives([...data]);
  };
  const handleSubjectivesChange = (e, index) => {
    let data = [...subjectives];
    data[index][e.target.name] = e.target.value;
    setSubjectives([...data]);
  };

  const handleObjectivesAdd = () => {
    setObjectives([
      ...objectives,
      {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '',
        marks: ''
      },
    ]);
  };

  const handleObjectivesRemove = index => {
    const updatedObjectives = objectives.filter(
      (item, itemIndex) => index !== itemIndex,
    );
    setObjectives([...updatedObjectives]);
  };
  const handleSubjectivesAdd = () => {
    setSubjectives([
      ...subjectives,
      {
        question: '',
      },
    ]);
  };

  const handleSubjectivesRemove = index => {
    const updatedSubjectives = subjectives.filter(
      (item, itemIndex) => index !== itemIndex,
    );
    setSubjectives([...updatedSubjectives]);
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
          <div className="row align-items-end justify-content-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8">
              <div className="section__title-wrapper">
                <h2 className="section__title">
                  <span className="yellow-bg">
                    Add New
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 offset-xxl-3 col-xl-9 col-lg-10 offset-lg-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="sign__wrapper white-bg">
                <div className="d-flex">
                  <TextField
                    id="outlined-select-cu"
                    label="Input"
                    name="sheetName"
                    fullWidth
                    value={formik.values['sheetName']}
                    onChange={formik.handleChange}
                    style={{
                      width: 200,
                      border:
                        formik.touched['sheetName'] &&
                        formik.errors['sheetName']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                    helperText="Enter sheetName"
                    margin="normal"
                    variant="outlined"></TextField>
                  {FUNCTION_UTILS.getFormikError(formik, 'sheetName')}
                  <TextField
                    id="outlined-select"
                    label="Input"
                    name="sylabus"
                    fullWidth
                    value={formik.values['sylabus']}
                    onChange={formik.handleChange}
                    style={{
                      width: 200,
                      border:
                        formik.touched['sylabus'] && formik.errors['sylabus']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                    helperText="Enter Sylabus"
                    margin="normal"
                    variant="outlined"></TextField>
                  {FUNCTION_UTILS.getFormikError(formik, 'sylabus')}
                </div>
                <div className="d-flex justify-content-evenly">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    fullWidth
                    name="sheetType"
                    value={formik.values['sheetType']}
                    onChange={formik.handleChange}
                    style={{
                      width: 200,
                      border:
                        formik.touched['sheetType'] &&
                        formik.errors['sheetType']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                    helperText="Select Sheet Type"
                    margin="normal"
                    variant="outlined">
                    {sheetTypeOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {FUNCTION_UTILS.getFormikError(formik, 'sheetType')}
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label="Select"
                    name="questionType"
                    value={formik.values['questionType']}
                    onChange={e => {
                      if (formik.values.questionType === 'subjective') {
                        setObjectives([
                          {
                            question: '',
                            option1: '',
                            option2: '',
                            option3: '',
                            option4: '',
                            correctOption: '',
                            marks: ''
                          },
                        ]);
                      } else {
                        setSubjectives([
                          {
                            question: '',
                            questionMarks: '',
                          },
                        ]);
                      }
                      formik.handleChange(e);
                    }}
                    style={{
                      width: 200,
                      border:
                        formik.touched['questionType'] &&
                        formik.errors['questionType']
                          ? '2px solid #FF6565'
                          : null,
                    }}
                    helperText="Select Question Type"
                    margin="normal"
                    variant="outlined">
                    {questionTypeOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {FUNCTION_UTILS.getFormikError(formik, 'questionType')}
                </div>
                <div className="sign__form">
                  {formik.values.questionType === 'objective' &&
                    objectives.map((item, index) => (
                      <div key={index}>
                        <div className="sign__input-wrapper mb-10">
                          <h6>Enter Question</h6>
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Enter Question"
                              name="question"
                              value={item.question}
                              onChange={e => handleObjectivesChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className="sign__input-wrapper mb-10 d-flex justify-content-between">
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Enter Option 1"
                              name="option1"
                              value={item.option1}
                              onChange={e => handleObjectivesChange(e, index)}
                            />
                          </div>
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Enter Option 2"
                              name="option2"
                              value={item.option2}
                              onChange={e => handleObjectivesChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className="sign__input-wrapper mb-10 d-flex justify-content-between">
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Enter Option 3"
                              name="option3"
                              value={item.option3}
                              onChange={e => handleObjectivesChange(e, index)}
                            />
                          </div>
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Enter Option 4"
                              name="option4"
                              value={item.option4}
                              onChange={e => handleObjectivesChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className="sign__input-wrapper mb-10 d-flex justify-content-center">
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Enter correct Option"
                              maxLength={1}
                              required
                              name="correctOption"
                              value={item.correctOption}
                              onChange={e => handleObjectivesChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className="sign__input-wrapper mb-10 d-flex justify-content-center">
                          <div className="sign__input">
                            <input
                              type="number"
                              placeholder="Enter Marks"
                              required
                              name="marks"
                              value={item.marks}
                              onChange={e => handleObjectivesChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          {index === objectives.length - 1 ? (
                            <button
                              className="e-btn w-10 mb-5 "
                              onClick={() => handleObjectivesAdd()}>
                              Add
                            </button>
                          ) : (
                            <button
                              className="e-btn w-10 mb-5 "
                              onClick={() => handleObjectivesRemove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  {formik.values.questionType === 'subjective' &&
                    subjectives.map((item, index) => (
                      <div key={index}>
                        <div className="sign__input-wrapper mb-10">
                          <h6>Enter Question</h6>
                          <div className="sign__input">
                            <input
                              type="text"
                              placeholder="Enter Question"
                              name="question"
                              value={item.question}
                              onChange={e => handleSubjectivesChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="sign__input-wrapper mb-10">
                            <h6>Enter Question Marks</h6>
                            <div className="sign__input">
                              <input
                                type="text"
                                placeholder="Enter Question"
                                name="questionMarks"
                                value={item.questionMarks}
                                onChange={e =>
                                  handleSubjectivesChange(e, index)
                                }
                              />
                            </div>
                          </div>
                          {index === subjectives.length - 1 ? (
                            <div className="sign__input-wrapper text-align-center">
                              <button
                                className="e-btn w-10"
                                onClick={() => handleSubjectivesAdd()}>
                                Add
                              </button>
                            </div>
                          ) : (
                            <div className="sign__input-wrapper">
                              <button
                                className="e-btn w-10"
                                onClick={() => handleSubjectivesRemove(index)}>
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  <button type="submit" className="e-btn  w-100">
                    Save
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

export default AddNewQuizAssign;
