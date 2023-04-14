import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import ReactTable from 'react-table-6';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useFormik} from 'formik';

import FUNCTION_UTILS from '../../utils/formik-utils';

import 'react-table-6/react-table.css';
import {useRouter} from "next/router";
import axios from "axios";

const QuestionBank = () => {
  const router = useRouter();
  const {courseId} = router.query;

  const [assignQuizDialog, setAssignQuizDialog] = useState(false);
  const [assignAssignmentDialog, setAssignAssignmentDialog] = useState(false);

  const [quizAssignData, setQuizAssignData] = useState({
    startDate: '',
    endDate: '',
    quizId: ''
  });

  const [assignmentAssignData, setAssignmentAssignData] = useState({
    startDate: '',
    endDate: '',
    assignmentId: ''
  });

  const [loading, setLoading] = useState(false);
  const [quizDialog, setQuizDialog] = useState(false);
  const [variables, setVariables] = useState({page: 1});
  const [quizes, setquizes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  function getAllQuizzes() {
    axios.get(`http://localhost:8080/api/v1/teacher/get-quiz-for-course?courseId=${courseId}`)
      .then(response => {
        setquizes(response.data.payload);
      })
      .catch(() => {
      });
  }

  function getAllAssignments() {
    axios.get(`http://localhost:8080/api/v1/teacher/get-assignment-for-course?courseId=${courseId}`)
      .then(response => {
        setAssignments(response.data.payload);
      })
      .catch(() => {
      });
  }

  useEffect(() => {
    getAllQuizzes();
    getAllAssignments();
  }, [courseId]);

  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      description: '',
      lastDate: '',
      time: '',
      venue: '',
    },
    onSubmit: values => {
      handleQuizDialogSave(values);
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

  const handleQuizEdit = data => {
    setQuizDialog(true);
    formik.setValues(data);
  };
  const handleQuizAssign = data => {
    console.log('assin');
    setQuizAssignData({...quizAssignData, quizId: data.quizId});
    setAssignQuizDialog(true);
  };

  const handleQuizDelete = data => {
    axios.delete(`http://localhost:8080/api/v1/teacher/delete-quiz?quizId=${data.quizId}`)
      .then(() => {
        getAllQuizzes();
      })
      .catch(() => {
      });
  };

  const handleAssignEdit = data => {
    setQuizDialog(true);
    formik.setValues(data);
    setAssignmentAssignData({...assignmentAssignData, assignmentId: data.assignmentId});
    setAssignAssignmentDialog(true);
  };
  const handleAssignAssign = data => {
    console.log('assin');
  };

  const handleAssignDelete = data => {
    axios.delete(`http://localhost:8080/api/v1/teacher/delete-assignment?assignmentId=${data.assignmentId}`)
      .then(() => {
        getAllAssignments();
      })
      .catch(() => {
      });
  };

  const handleQuizDialogCancel = () => {
    setQuizDialog(false);
  };
  const handleQuizDialogSave = values => {
    console.log('values', values);
    setQuizDialog(false);
  };

  const CustomNoQuizDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No quiz found</div>;
  };
  const CustomNoAssignmentDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No assignment found</div>;
  };

  const quizColumns = [
    {
      Header: 'Sheet Name',
      accessor: 'sheetName',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Syllabus',
      accessor: 'syllabus',
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
              handleQuizAssign(props.original);
            }}>
            Assign
          </div>
          <div
            style={{cursor: 'pointer'}}
            onClick={() => {
              handleQuizEdit(props.original);
            }}>
            Edit
          </div>
          <div
            style={{cursor: 'pointer'}}
            onClick={() => {
              handleQuizDelete(props.original);
            }}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  // const assignColumns = [
  //   {
  //     Header: 'Sheet Name',
  //     accessor: 'sheetName',
  //     style: {textAlign: 'center'},
  //   },
  //   {
  //     Header: 'Syllabus',
  //     accessor: 'syllabus',
  //     style: {textAlign: 'center'},
  //   },
  //   {
  //     Header: 'Actions',
  //     style: {textAlign: 'center'},
  //     accessor: '',
  //     Cell: props => (
  //       <div className="d-flex justify-content-evenly">
  //         <div
  //           style={{cursor: 'pointer'}}
  //           onClick={() => {
  //             handleAssignAssign(props.original);
  //           }}>
  //           Assign
  //         </div>
  //         <div
  //           style={{cursor: 'pointer'}}
  //           onClick={() => {
  //             handleAssignEdit(props.original);
  //           }}>
  //           Edit
  //         </div>
  //         <div
  //           style={{cursor: 'pointer'}}
  //           onClick={() => {
  //             handleAssignDelete(props.original);
  //           }}>
  //           Delete
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  const assignQuizToStudents = () => {
    axios.patch(`http://localhost:8080/api/v1/teacher/assign-quiz?quizId=${quizAssignData.quizId}`, {
      startDate: new Date(quizAssignData.startDate).getTime(),
      endDate: new Date(quizAssignData.endDate).getTime()
    })
      .then(() => {
        history.back();
      })
      .catch(() => {
      });
  };

  return (
    <>
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
                    Question Bank
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />
                  </span>
                    <br/>
                  </h2>
                </div>
                <div className="header__btn d-flex justify-content-end ">
                  <Link href={`/add-new-quiz-assign?courseId=${courseId}`}>
                    <a className="e-btn">Add New</a>
                  </Link>
                </div>
                <br/>
              </div>
            </div>

            <div className="mt-10 mb-20">
              <h2 className="section__title">
              <span className="yellow-bg">
                Quiz
                <img
                  src="assets/img/shape/yellow-bg-2.png"
                  alt="img not found"
                />
              </span>
                <br/>
              </h2>
              <ReactTable
                loading={loading}
                NoDataComponent={CustomNoQuizDataComponent}
                loadingText={<div>...loading</div>}
                data={quizes ? quizes : []}
                columns={quizColumns}
                onPageChange={pg => handlePageChange(pg)}
                page={variables.page - 1}
                manual
                pages={Math.ceil(quizes.length / 10)}
                showPageSizeOptions={false}
                showPageJump={true}
                minRows={1}
              />
            </div>
            <div className="mt-10 mb-20">
              {/*<h2 className="section__title">*/}
              {/*<span className="yellow-bg">*/}
              {/*  Assignment*/}
              {/*  <img*/}
              {/*    src="assets/img/shape/yellow-bg-2.png"*/}
              {/*    alt="img not found"*/}
              {/*  />*/}
              {/*</span>*/}
              {/*  <br/>*/}
              {/*</h2>*/}
              {/*<ReactTable*/}
              {/*  loading={loading}*/}
              {/*  NoDataComponent={CustomNoAssignmentDataComponent}*/}
              {/*  loadingText={<div>...loading</div>}*/}
              {/*  data={assignments ? assignments : []}*/}
              {/*  columns={assignColumns}*/}
              {/*  onPageChange={pg => handlePageChange(pg)}*/}
              {/*  page={variables.page - 1}*/}
              {/*  manual*/}
              {/*  pages={Math.ceil(assignments.length / 10)}*/}
              {/*  showPageSizeOptions={false}*/}
              {/*  showPageJump={true}*/}
              {/*  minRows={1}*/}
              {/*/>*/}
            </div>
            <Dialog
              open={quizDialog}
              onClose={() => setQuizDialog(false)}
              fullWidth={'md'}>
              <DialogTitle>Add Event</DialogTitle>
              <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Category Name</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Category Name"
                        name="category"
                        value={formik.values['category']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['category'] &&
                            formik.errors['category']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'category')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Title</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Title"
                        name="title"
                        value={formik.values['title']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['title'] && formik.errors['title']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'title')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Description</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Description"
                        name="description"
                        value={formik.values['description']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['description'] &&
                            formik.errors['description']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'description')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Last Date</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Last Date"
                        name="lastDate"
                        value={formik.values['lastDate']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['lastDate'] &&
                            formik.errors['lastDate']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'lastDate')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Time</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Time"
                        name="time"
                        value={formik.values['time']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['time'] && formik.errors['time']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'time')}
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h6>Event Venue</h6>
                    <div className="sign__input">
                      <input
                        type="text"
                        placeholder="Enter Event Venue"
                        name="venue"
                        value={formik.values['venue']}
                        onChange={formik.handleChange}
                        style={{
                          border:
                            formik.touched['venue'] && formik.errors['venue']
                              ? '2px solid #FF6565'
                              : null,
                        }}
                      />
                      {FUNCTION_UTILS.getFormikError(formik, 'venue')}
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleQuizDialogCancel()}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        </section>
      </main>
      <Dialog
        open={assignQuizDialog}
        id="quiz-assignment"
        onClose={() => {
          setAssignQuizDialog(false)
        }}
      >
        <DialogTitle>
          Assign Quiz
        </DialogTitle>
        <DialogContent>
          <label htmlFor="startDatetime">Start Datetime</label>
          <input value={quizAssignData.startDate} id="startDatetime" type="datetime-local" className="w-100 mb-3"
                 placeholder="startDate" onChange={(e) => {
            setQuizAssignData({...quizAssignData, startDate: e.target.value})
          }}/>
          <label htmlFor="endDatetime">End Datetime</label>
          <input value={quizAssignData.endDate} id="endDatetime" type="datetime-local" placeholder="endDate"
                 className="w-100 mb-3" onChange={(e) => {
            setQuizAssignData({...quizAssignData, endDate: e.target.value})
          }}/>
        </DialogContent>
        <DialogActions>
          <button className="e-btn" onClick={assignQuizToStudents}>Assign</button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={assignAssignmentDialog}
        id="assignment-assignment"
        onClose={() => {
          setAssignAssignmentDialog(false)
        }}
      >
        <DialogTitle>
          Assign Assignment
        </DialogTitle>
        <DialogContent>
          <input value={assignmentAssignData.startDate} type="datetime-local" placeholder="startDate" onChange={(e) => {
            setAssignmentAssignData({...assignmentAssignData, startDate: e.target.value})
          }}/>
          <input value={assignmentAssignData.endDate} type="datetime-local" placeholder="endDate" onChange={(e) => {
            setAssignmentAssignData({...assignmentAssignData, endDate: e.target.value})
          }}/>
        </DialogContent>
        <DialogActions>
          <button className="e-btn" onClick={() => {
          }}>Assign
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionBank;
