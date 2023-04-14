import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import axios from "axios";
import {useRouter} from "next/router";
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';


const addQuiz = () => {
  const router = useRouter();
  const {courseId} = router.query;

  const [loading, setLoading] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    syllabus: "",
    sheetName: "",
    courseId: "",
    fileUrl: "",
    startTime: "",
    endTime: ""
  });
  const [isModalVisible, setModalVisibility] = useState(false);
  const [variables, setVariables] = useState({page: 1});
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    getAllCreatedAssignments();
  }, []);

  useEffect(() => {
    setAssignmentData({...assignmentData, courseId: courseId});
  }, [courseId]);

  const getAllCreatedAssignments = () => {
    axios.get(`http://localhost:8080/api/v1/teacher/get-assignment-for-course?courseId=${courseId}`)
      .then(response => {
        setAssignments(response.data.payload);
      })
      .catch(() => {
      })
  };

  const closeModal = () => {
    setAssignmentData({
      courseId: '',
      fileUrl: '',
      sheetName: '',
      syllabus: ''
    })
    setModalVisibility(false);
  };

  const createAssignment = () => {
    axios.post(`http://localhost:8080/api/v1/teacher/create-assignment?syllabus=${assignmentData.syllabus}&sheetName=${assignmentData.sheetName}&courseId=${courseId}&fileUrl=${assignmentData.fileUrl}&startTime=${new Date(assignmentData.startTime).getTime()}&endTime=${new Date(assignmentData.endTime).getTime()}`)
      .then(() => {
        closeModal();
        getAllCreatedAssignments();
      })
      .catch(() => {
      });
  };

  function uploadAssignmentFileGetUrl(e) {
    const files = e.target.files;
    if (Object.keys(files).length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      axios.post("http://localhost:8080/api/v1/uploadFile", formData)
        .then(response => {
          setAssignmentData({...assignmentData, fileUrl: response.data})
        })
        .catch(() => {
        });
    }
  }


  const handlePageChange = pg => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };

  const CustomNoDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No courses found</div>;
  };

  const columns = [
    {Header: "Sheet Name", accessor: "sheetName"},
    {Header: "Syllabus", accessor: "syllabus"},
    {
      Header: "File", accessor: "fileUrl", Cell: props => {
        return <a rel="noreferrer" target="_blank" href={props.original.fileUrl}>{props.original.sheetName}</a>
      }
    },
    {
      Header: 'Start Time', accessor: 'startTime', Cell: props => {
        return <span>{new Date(props.original.startTime).toLocaleString()}</span>
      }
    },
    {
      Header: 'End Time', accessor: 'endTime', Cell: props => {
        return <span>{new Date(props.original.endTime).toLocaleString()}</span>
      }
    }
  ];

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
                    Add Assignment
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />
                  </span>
                    <br/>
                  </h2>
                </div>
                <div className="header__btn d-flex justify-content-evenly ">
                  <a className="e-btn" onClick={() => {
                    setModalVisibility(true);
                  }}>Add New Assignment</a>
                </div>
                <br/>
              </div>
            </div>
          </div>
          <div className="mt-20 p-5">
            <ReactTable
              className="invoices-table"
              loading={loading}
              NoDataComponent={CustomNoDataComponent}
              loadingText={<div>...loading</div>}
              data={assignments}
              columns={columns}
              onPageChange={pg => handlePageChange(pg)}
              page={variables.page - 1}
              manual
              pages={Math.ceil(assignments.length / 10)}
              showPageSizeOptions={false}
              showPageJump={true}
              minRows={1}
            />
          </div>
        </section>
      </main>
      <Dialog open={isModalVisible} onClose={closeModal}>
        <DialogTitle>Create Assignment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Syllabus"
            value={assignmentData.syllabus}
            onChange={(e) => {
              setAssignmentData({...assignmentData, syllabus: e.target.value});
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Sheet Name"
            value={assignmentData.sheetName}
            onChange={(e) => {
              setAssignmentData({...assignmentData, sheetName: e.target.value});
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Start Time"
            value={assignmentData.startTime}
            onChange={(e) => {
              setAssignmentData({...assignmentData, startTime: e.target.value});
            }}
            margin="normal"
            type="datetime-local"
          />
          <TextField
            fullWidth
            label="End Time"
            value={assignmentData.endTime}
            onChange={(e) => {
              setAssignmentData({...assignmentData, endTime: e.target.value});
            }}
            type="datetime-local"
            margin="normal"
          />
          <input type="file" onChange={uploadAssignmentFileGetUrl}/>
        </DialogContent>
        <DialogActions>
          <button className="e-btn" onClick={closeModal}>Close</button>
          <button className="e-btn" onClick={createAssignment}>Create Assigment</button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default addQuiz;
