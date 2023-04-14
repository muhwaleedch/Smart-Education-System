import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
// disable ssr
import {Tab, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CourseSidebarStudent from './CourseSidebarStudent';
import {useRouter} from "next/router";
import axios from "axios";
import ReactTable from "react-table-6";
import {Chip} from "@mui/material";
import {useSelector} from "react-redux";

const Tabs = dynamic(
  import('react-tabs').then(mod => mod.Tabs),
  {ssr: false},
);

const CourseDetailsMain = () => {
  const router = useRouter();
  const {courseId} = router.query;

  const userPayload = useSelector(state => state.userInfo);

  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState({page: 1});
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attemptedQuizMarks, setAttemptedQuizMarks] = useState([]);
  const [attemptedAssignments, setAttemptedAssignments] = useState([]);

  const getAttemptedQuizMarks = () => {
    axios.get(`http://localhost:8080/api/v1/student/attempted-quiz-details?studentId=${userPayload?.userPayload?.studentId}&courseId=${courseId}`)
      .then(response => {
        setAttemptedQuizMarks(response.data.payload);
      })
      .catch(() => {
      });
  };

  const getAttemptedAssignmentMarks = () => {
    axios.get(`http://localhost:8080/api/v1/student/attempted-assignment-details?studentId=${userPayload?.userPayload?.studentId}&courseId=${courseId}`)
      .then(response => {
        setAttemptedAssignments(response.data.payload);
      })
      .catch(() => {
      });
  };

  function getCourseDetails() {
    axios.get(`http://localhost:8080/api/v1/admin/course/details?courseId=${courseId}`)
      .then(response => {
        setCourseDetails(response.data.payload);
      })
      .catch(() => {
      });
  }

  const getAllActiveQuizzes = () => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/v1/student/active-quizzes?studentId=${userPayload?.userPayload?.studentId}&courseId=${courseId}`)
      .then(response => {
        setQuizzes(response.data.payload);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getAllActiveAssignments = () => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/v1/student/active-assignments?studentId=${userPayload?.userPayload?.studentId}&courseId=${courseId}`)
      .then(response => {
        setAssignments(response.data.payload);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCourseDetails();
    getAllActiveQuizzes();
    getAllActiveAssignments();
    getAttemptedQuizMarks();
    getAttemptedAssignmentMarks();
  }, []);

  const columns = [
    {accessor: 'courseContentId', Header: 'Course Content Id', style: {textAlign: "center"}},
    {accessor: 'lectureNumber', Header: 'Lecture Number', style: {textAlign: "center"}},
    {Header: "Topic", accessor: 'topic', style: {textAlign: "center"}},
    {
      Header: "Files", accessor: '', style: {textAlign: "center"}, Cell: props => {
        console.log('props', props);
        return props.original.mimeTypeFileUploads.map((value, index) => {
          return <Chip key={index} label={<a href={value.urlToFile}>{value.title}</a>}/>
        })
      }
    },
  ];

  const CustomNoDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No Course Contents found</div>;
  };

  const handlePageChange = pg => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };

  const quizColumns = [
    {Header: "Sheet Name", accessor: "sheetName", style: {textAlign: "center"}},
    {
      Header: "Start Time", accessor: "startTime", style: {textAlign: "center"}, Cell: props => {
        return <span>{new Date(props.original.startTime).toLocaleString()}</span>
      }
    },
    {
      Header: "End Time", accessor: "endTime", style: {textAlign: "center"}, Cell: props => {
        return <span>{new Date(props.original.endTime).toISOString()}</span>
      }
    },
    {Header: "Total Quiz Marks", accessor: "totalQuizMarks", style: {textAlign: "center"}},
    {Header: "Syllabus", accessor: "syllabus", style: {textAlign: "center"}},
    {
      Header: "Action", accessor: '', Cell: props => {
        return (
          <>
            <span style={{cursor: "pointer"}} onClick={() => {
              attemptQuiz(props.original)
            }}>Attempt Quiz</span>
          </>
        );
      }
    }
  ];

  const assignmentColumns = [
    {Header: 'Sheet Name', accessor: "assignment.sheetName"},
    {Header: 'Syllabus', accessor: "assignment.syllabus"},
    {
      Header: "Start Time", accessor: "assignment.startTime", style: {textAlign: "center"}, Cell: props => {
        return <span>{new Date(props.original.assignment.startTime).toLocaleString()}</span>
      }
    },
    {
      Header: "End Time", accessor: "assignment.endTime", style: {textAlign: "center"}, Cell: props => {
        return <span>{new Date(props.original.assignment.endTime).toLocaleString()}</span>
      }
    },
    {
      Header: 'Question Paper', accessor: "assignment.fileUrl", Cell: props => {
        return <a href={props.original.assignment.fileUrl} target="_blank"
                  rel="noreferrer">{props.original.assignment.sheetName}</a>
      }
    },
    {Header: 'Status', accessor: "assignmentStatus"},
    {Header: 'Total Marks', accessor: 'totalMarksObtained'},
    {
      Header: "Action", accessor: '', Cell: props => {
        return <input type="file" onChange={(e) => {
          submitAssignment(e, props);
          getAllActiveAssignments();
        }
        }/>
      }
    }
  ];

  const submitAssignment = (e, props) => {
    const files = e.target.files;
    if (Object.keys(files).length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      axios.post("http://localhost:8080/api/v1/uploadFile", formData)
        .then(response => {
          return axios.post(`http://localhost:8080/api/v1/student/submit-assignment?assignmentId=${props.original.assignment.assignmentId}&fileUrl=${response.data}&studentId=${userPayload?.userPayload?.studentId}`)
        })
        .then(() => {
        })
        .catch(() => {
        });
    }
  };

  const attemptQuiz = (props) => {
    router.push(`/attempt-quiz?quizId=${props.quizId}`);
  };

  const attemptedQuizColumns = [
    {Header: "Status", accessor: "quizAttemptStatus"},
    {Header: "Total Marks Obtained", accessor: "totalMarksObtained"},
    {Header: "Total Quiz Marks", accessor: "quiz.totalQuizMarks"},
    {Header: "Sheet Name", accessor: "quiz.sheetName"},
    {Header: "Start Time", accessor: "quiz.startTime"},
    {Header: "End Time", accessor: "quiz.endTime"},
    {Header: "Syllabus", accessor: "quiz.syllabus"},
  ];

  const attemptedAssignmentColumns = [
    {Header: "Total Marks Obtained", accessor: "totalMarksObtained"},
    {Header: "Sheet Name", accessor: "assignment.sheetName"},
    {Header: "Syllabus", accessor: "assignment.syllabus"},
    {Header: "Start Time", accessor: "assignment.startTime"},
    {Header: "End Time", accessor: "assignment.endTime"},
  ];

  return (
    <React.Fragment>
      <main>
        {/* course tab-start */}
        <section className="page__title-area pt-120 pb-90">
          <div className="page__title-shape">
            <img
              className="page-title-shape-5 d-none d-sm-block"
              src="assets/img/page-title/page-title-shape-1.png"
              alt="img not found"
            />
            <img
              className="page-title-shape-6"
              src="assets/img/page-title/page-title-shape-6.png"
              alt="img not found"
            />
            <img
              className="page-title-shape-7"
              src="assets/img/page-title/page-title-shape-4.png"
              alt="img not found"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xxl-8 col-xl-8 col-lg-8">
                <div className="course__wrapper">
                  <div className="page__title-content mb-25">
                    <h5 className="page__title-3">{courseDetails?.courseName}</h5>
                  </div>
                  <div className="course__meta-2 d-sm-flex mb-30">
                  </div>
                  <Tabs>
                    <div className="course__tab-2 mb-45">
                      <ul
                        className="navs nav-tabss"
                        id="courseTab"
                        role="tablist">
                        <TabList>
                          <Tab>
                            <button
                              className="nav-link"
                              type="button"
                              role="tab">
                              <i>
                                <FontAwesomeIcon icon={['fas', 'ribbon']}/>
                              </i>
                              <span>Description</span>
                            </button>
                          </Tab>
                          <Tab>
                            <button className="nav-link" type="button">
                              <i>
                                <FontAwesomeIcon icon={['fas', 'book']}/>
                              </i>
                              <span>CDF</span>
                            </button>
                          </Tab>
                          <Tab>
                            <button className="nav-link" type="button">
                              <i>
                                <FontAwesomeIcon icon="fa-solid fa-chalkboard"/>
                              </i>
                              <span>Lecture Contents</span>
                            </button>
                          </Tab>
                          <Tab>
                            <button className="nav-link" type="button">
                              <i>
                                <FontAwesomeIcon icon={['fas', 'user']}/>
                              </i>
                              <span>Assignments</span>
                            </button>
                          </Tab>
                          <br/>
                          <br/>
                          <Tab>
                            <button className="nav-link" type="button">
                              <i>
                                <FontAwesomeIcon icon={['fas', 'user']}/>
                              </i>
                              <span>Quiz</span>
                            </button>
                          </Tab>
                        </TabList>
                      </ul>
                    </div>
                    <div className="course__tab-content mb-95">
                      <div className="tab-contents">
                        <TabPanel>
                          <div className="course__description">
                            <h3>Course Overview</h3>
                            <p>
                              {courseDetails?.courseDescription}
                            </p>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <h1>Course CDF</h1>
                          {courseDetails?.cdfURL ? (<p>Course CDF can be found at <a rel="noreferrer" target="_blank"
                                                                                     href={courseDetails.cdfURL}>{courseDetails.cdfURL}</a>
                          </p>) : null}
                        </TabPanel>
                        <TabPanel>
                          <div className="d-flex justify-content-between">
                            <h1 className="d-flex justify-content-between">Course Contents</h1>
                          </div>
                          <div className="mt-20">
                            <ReactTable
                              className="course-content-table"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={courseDetails?.courseContents || []}
                              columns={columns}
                              onPageChange={pg => handlePageChange(pg)}
                              page={variables.page - 1}
                              manual
                              pages={Math.ceil(courseDetails?.courseContents?.length / 10)}
                              showPageSizeOptions={false}
                              showPageJump={true}
                              minRows={1}
                            />
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="d-flex justify-content-between">
                            <h1 className="d-flex justify-content-between">Active Assignment</h1>
                          </div>
                          <div className="mt-20">
                            <ReactTable
                              className="active-quizzes-table"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={assignments || []}
                              columns={assignmentColumns}
                              onPageChange={pg => handlePageChange(pg)}
                              page={variables.page - 1}
                              manual
                              pages={Math.ceil(assignments?.length / 10)}
                              showPageSizeOptions={false}
                              showPageJump={true}
                              minRows={1}
                            />
                          </div>


                          <div className="d-flex justify-content-between">
                            <h1 className="d-flex justify-content-between">Attempted Assignments</h1>
                          </div>
                          <div className="mt-20">
                            <ReactTable
                              className="active-quizzes-table"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={attemptedAssignments}
                              columns={attemptedAssignmentColumns}
                              onPageChange={pg => handlePageChange(pg)}
                              page={variables.page - 1}
                              manual
                              pages={Math.ceil(attemptedAssignments?.length / 10)}
                              showPageSizeOptions={false}
                              showPageJump={true}
                              minRows={1}
                            />
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="d-flex justify-content-between">
                            <h1 className="d-flex justify-content-between">Active Quizzes</h1>
                          </div>
                          <div className="mt-20">
                            <ReactTable
                              className="active-quizzes-table"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={quizzes || []}
                              columns={quizColumns}
                              onPageChange={pg => handlePageChange(pg)}
                              page={variables.page - 1}
                              manual
                              pages={Math.ceil(quizzes?.length / 10)}
                              showPageSizeOptions={false}
                              showPageJump={true}
                              minRows={1}
                            />
                          </div>



                          <div className="d-flex justify-content-between">
                            <h1 className="d-flex justify-content-between">Attempted Quizzes</h1>
                          </div>
                          <div className="mt-20">
                            <ReactTable
                              className="active-quizzes-table"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={attemptedQuizMarks || []}
                              columns={attemptedQuizColumns}
                              page={1}
                              manual
                              pages={2}
                              showPageSizeOptions={false}
                              showPageJump={true}
                              minRows={1}
                            />
                          </div>
                        </TabPanel>
                      </div>
                    </div>
                  </Tabs>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4">
                <CourseSidebarStudent/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}

export default CourseDetailsMain;
