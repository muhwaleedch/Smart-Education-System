import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useDispatch} from 'react-redux';
import ReactTable from 'react-table-6';

import 'react-table-6/react-table.css';

const EnrolledCourses = () => {
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [variables, setVariables] = useState({page: 1});
  const [enrolCourses, setEnrolCourses] = useState([
    {
      department: 'Department of Computer Science',
      course: 'sdfsdfs',
    },
  ]);

  // useEffect(() => {
  //   if (OrderReducer) {
  //     let searchObj = { ...variables }
  //     delete searchObj.searchBy
  //     dispatch(Actions.studentsLoading(true))
  //     dispatch(Actions.getstudents(searchObj))
  //   }
  // }, [dispatch, variables])

  // useEffect(() => {
  //   if (OrderReducer.studentsList) {
  //     setStudents(OrderReducer.studentsList)
  //   }
  // }, [OrderReducer])

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

  const columns = [
    {
      Header: 'Course',
      accessor: 'course',
      style: {textAlign: 'center'},
    },
    
    {
      Header: 'Department',
      accessor: 'department',
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
             console.log('unenrooled')
            }}>
            UnEnroll
          </div>
        </div>
      ),
    },
  ];

  const CustomNoDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No Enrolled Courses found</div>;
  };

  return (
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
            <div className="section__title-wrapper mt-90 text-center mb-60">
              <h2 className="section__title">
                <span className="yellow-bg">
                  Enrolled Courses
                  <img
                    src="assets/img/shape/yellow-bg-2.png"
                    alt="img not found"
                  />
                </span>
                <br />
              </h2>
            </div>
            <div className="header__btn ml-20 pl-200 d-flex justify-content-end ">
              <Link href="/student-course-reg">
                <a className="e-btn">Enroll New Course</a>
              </Link>
            </div>
            <br />
          </div>
        </div>
        {/* <div className='mb-2 d-flex justify-content-end flex-wrap'>
          <form className='mt-2 mt-sm-0' onSubmit={e => handleSearch(e)}>
           
              <input type='select' name='searchBy' id='searchBy'>
                <option value='firstName'>Name</option>
              </input>
            
            <input
                type='text'
                name='value'
                id='search-inp'
                maxLength={10}
                placeholder='Search'
                required
              />
            <button
              type='button'
              onClick={() => {
                if (
                  document.getElementById('search-inp').value ||
                  document.getElementById('status').value !== 'all'
                ) {
                  document.getElementById('searchBy').value = 'id'
                  document.getElementById('status').value = 'all'
                  document.getElementById('search-inp').value = ''
                  setVariables({ page: 1 })
                }
              }}
              className='btn border border-primary ml-2 bg-white'
            >
              Clear
            </button>
          </form>
        </div> */}
        <div className="mt-20">
          <ReactTable
            className="invoices-table"
            loading={loading}
            NoDataComponent={CustomNoDataComponent}
            loadingText={<div>...loading</div>}
            data={enrolCourses ? enrolCourses : []}
            columns={columns}
            onPageChange={pg => handlePageChange(pg)}
            page={variables.page - 1}
            manual
            pages={Math.ceil(enrolCourses.length / 10)}
            showPageSizeOptions={false}
            showPageJump={true}
            minRows={1}
          />
        </div>
      </div>
    </section>
  );
};

export default EnrolledCourses;
