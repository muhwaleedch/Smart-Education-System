import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
// disable ssr
import {Tab, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CourseSidebar from './CourseSidebar';
import {useRouter} from "next/router";
import axios from "axios";
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
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
  const [variables, setVariables] = useState({page: 1});
  const [isModalVisible, setModalVisibility] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [studentsRegistered, setStudentsRegistered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditingData, setEditingData] = useState(null);

  const [studentQuizData, setQuizData] = useState([]);
  const [studentAssignmentsData, setStudentAssignmentsData] = useState([]);

  function getAllQuizFromStudents() {
    axios.get(`http://localhost:8080/api/v1/teacher/get-quiz-statuses?courseId=${courseId}&teacherId=${userPayload?.userPayload?.teacherId}`)
      .then(response => {
        setQuizData(response.data.payload);
      })
      .catch(() => {
      });
  }

  function getAllAssignmentsFromStudents() {
    axios.get(`http://localhost:8080/api/v1/teacher/get-assignment-statuses?courseId=${courseId}&teacherId=${userPayload?.userPayload?.teacherId}`)
      .then(response => {
        setStudentAssignmentsData(response.data.payload);
      })
      .catch(() => {
      });
  }


  function getCourseDetails() {
    axios.get(`http://localhost:8080/api/v1/admin/course/details?courseId=${courseId}`)
      .then(response => {
        setCourseDetails(response.data.payload);
      })
      .catch(() => {
      });
  }

  const getStudentsRegistered = () => {
    axios.get(`http://localhost:8080/api/v1/course/get-registered-students?courseId=${courseId}`)
      .then(response => {
        setStudentsRegistered(response.data.payload);
      })
      .catch(() => {
      });
  };

  useEffect(() => {
    getCourseDetails();
    getStudentsRegistered();
    getAllQuizFromStudents();
    getAllAssignmentsFromStudents();
  }, []);

  const attemptedAssignmentColumns = [
    {Header: "Total Marks Obtained", accessor: "totalMarksObtained"},
    {Header: "Sheet Name", accessor: "assignment.sheetName"},
    {Header: "Syllabus", accessor: "assignment.syllabus"},
    {Header: "Start Time", accessor: "assignment.startTime"},
    {Header: "End Time", accessor: "assignment.endTime"},
  ];


  const handleCourseEdit = (rowData) => {
    formik.setValues({
      lectureNumber: rowData.lectureNumber,
      topic: rowData.topic
    })
      .then(() => {
        setModalVisibility(true);
        setEditingData(rowData.courseContentId);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handleCourseDelete = (rowData) => {
    axios.delete(`http://localhost:8080/api/v1/course/delete-course-content?courseContentId=${rowData.courseContentId}&courseId=${courseId}`)
      .then(() => {
        getCourseDetails();
      })
      .catch(() => {});
  };

  const columns = [
    {accessor: 'courseContentId', Header: 'Course Content Id', style: {textAlign: "center"}},
    {accessor: 'lectureNumber', Header: 'Lecture Number', style: {textAlign: "center"}},
    {Header: "Topic", accessor: 'topic', style: {textAlign: "center"}},
    {
      Header: "Actions", accessor: '', style: {textAlign: "center"}, Cell: props => {
        return (
          <div>
            <span style={{marginRight: "10px"}} onClick={() => handleCourseEdit(props.original)}>Edit</span>
            <span onClick={() => handleCourseDelete(props.original)}>Delete</span>
          </div>
        );
      }
    },
  ];

  const studentColumns = [
    {accessor: "firstName", Header: "First Name"},
    {accessor: "lastName", Header: "Last Name"},
    {accessor: "registrationNumber", Header: "Registration Number"},
    {accessor: "emailAddress", Header: "Email Address"},
  ];

  const onChangeFileHandlerForCDF = (e) => {
    const files = e.target.files;
    if (Object.keys(files).length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      axios.post("http://localhost:8080/api/v1/uploadFile", formData)
        .then(response => {
          return axios.put(`http://localhost:8080/api/v1/course/update-cdf-url?courseId=${courseId}&url=${response.data}`)
        })
        .then(response => {
          setCourseDetails(response.data.payload);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

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

  const formik = useFormik({
    initialValues: {
      lectureNumber: '',
      topic: ''
    },
    onSubmit: values => {
      handleCreateContentSave(values);
    },
  });

  const handleCreateContentSave = (values) => {
    const formValues = values;
    formValues.course = {
      courseId: +courseId,
    };
    formValues.mimeTypeFileUploads = uploadedFiles;
    if (!isEditingData) {
      axios.post(`http://localhost:8080/api/v1/course/add-course-contents?courseId=${courseId}`, formValues)
        .then(response => {
          setCourseDetails(response.data.payload);
          setModalVisibility(false);
        })
        .catch(() => {
        });
    } else {
      formValues.courseContentId = isEditingData;
      axios.put(`http://localhost:8080/api/v1/course/update-course-content?courseId=${courseId}`, formValues)
        .then(response => {
          setCourseDetails(response.data.payload);
          setModalVisibility(false);
          setEditingData(null);
        })
        .catch(() => {
        });
    }
  };

  const handleUploadFileForCourseContent = (e) => {
    const files = e.target.files;
    if (Object.keys(files).length > 0) {
      const uploadedFilesData = [];
      for (let i = 0; i < Object.keys(files).length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        axios.post("http://localhost:8080/api/v1/uploadFile", formData)
          .then(response => {
            uploadedFilesData.push({title: files[i].name, urlToFile: response.data})
          })
          .catch(error => {
            console.log('error', error);
          });
      }
      setUploadedFiles(uploadedFilesData);
    }
  };

  const quizDataColumns = [
    {Header: "Status", accessor: "quizAttemptStatus"},
    {Header: "Total Marks Obtained", accessor: "totalMarksObtained"},
    {Header: "Total Quiz Marks", accessor: "quiz.totalQuizMarks"},
    {Header: "Sheet Name", accessor: "quiz.sheetName"},
    {Header: "Start Time", accessor: "quiz.startTime"},
    {Header: "End Time", accessor: "quiz.endTime"},
    {Header: "Syllabus", accessor: "quiz.syllabus"},
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
            <br/><br/><br/><br/>
            <div className="row">
              <div className="col-xxl-8 col-xl-8 col-lg-8">
                <div className="course__wrapper">
                  <div className="page__title-content mb-25">
                    <h5 className="page__title-3">{courseDetails.courseName}</h5>
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
                                <FontAwesomeIcon icon={['fas', 'book']}/>
                              </i>
                              <span>Course Content</span>
                            </button>
                          </Tab>
                          <Tab>
                            <button className="nav-link" type="button">
                              <i>
                                <FontAwesomeIcon icon={['fas', 'user']}/>
                              </i>
                              <span>Members</span>
                            </button>
                          </Tab>
                          <Tab>
                            <button className="nav-link" type="button">
                              <i>
                                <FontAwesomeIcon icon={['fas', 'user']}/>
                              </i>
                              <span>Quizzes</span>
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
                          <h1>Upload CDF</h1>
                          {courseDetails?.cdfURL ? (<p>Existing CDF can be found at <a rel="noreferrer" target="_blank"
                                                                                       href={courseDetails.cdfURL}>{courseDetails.cdfURL}</a>
                          </p>) : null}
                          <input type="file" onChange={onChangeFileHandlerForCDF}/>
                        </TabPanel>
                        <TabPanel>
                          <div className="d-flex justify-content-between">
                            <h1 className="d-flex justify-content-between">Course Contents</h1>
                            <button className="e-btn" onClick={() => {
                              setModalVisibility(true)
                            }}>Create Content
                            </button>
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
                          <h1>Registered Students</h1>
                          <p>These students are registered in the course</p>
                          <div className="mt-20">
                            <ReactTable
                              className="student-registered=student"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={studentsRegistered || []}
                              columns={studentColumns}
                              onPageChange={pg => handlePageChange(pg)}
                              page={variables.page - 1}
                              manual
                              pages={Math.ceil(studentsRegistered?.length / 10)}
                              showPageSizeOptions={false}
                              showPageJump={true}
                              minRows={1}
                            />
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <h1>Quizzes Data</h1>
                          <div className="mt-20">
                            <ReactTable
                              className="student-quizzes"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={studentQuizData || []}
                              columns={quizDataColumns}
                              onPageChange={pg => handlePageChange(pg)}
                              page={variables.page - 1}
                              manual
                              pages={Math.ceil(studentQuizData?.length / 10)}
                              showPageSizeOptions={false}
                              showPageJump={true}
                              minRows={1}
                            />
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <h1>Assignments Data</h1>
                          <div className="mt-20">
                            <ReactTable
                              className="student-assignments"
                              loading={loading}
                              NoDataComponent={CustomNoDataComponent}
                              loadingText={<div>...loading</div>}
                              data={studentAssignmentsData || []}
                              columns={attemptedAssignmentColumns}
                              onPageChange={pg => handlePageChange(pg)}
                              page={variables.page - 1}
                              manual
                              pages={Math.ceil(studentAssignmentsData?.length / 10)}
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
                <CourseSidebar/>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Dialog open={isModalVisible} onClose={() => {
        setModalVisibility(false);
        formik.resetForm();
      }}>
        <DialogTitle>Course Content</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              onChange={formik.handleChange}
              name="lectureNumber"
              type="number"
              id="lectureNumber"
              fullWidth
              label="Lecture Number"
              value={formik.values["lectureNumber"]}
              className="mb-3"
            />
            <TextField
              onChange={formik.handleChange}
              name="topic"
              type="text"
              id="topic"
              label="Topic"
              fullWidth
              value={formik.values["topic"]}
              className="mb-3"
            />
            <input type="file" onChange={handleUploadFileForCourseContent} multiple/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setModalVisibility(false);
              formik.resetForm();
            }}>Cancel</Button>
            <button className="e-btn" type="submit">Submit</button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default CourseDetailsMain;
