import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import Link from 'next/link';
import {TextField} from "@mui/material";

const CourseSidebar = () => {
  const [query, setQuery] = useState({query: ''});

  const askQuestion = () => {

  };

  return (
    <React.Fragment>
      <div className="course__sidebar pl-70 p-relative">
        <div className="course__sidebar-widget-2 white-bg mb-20">
          <div className="course__video">
            <div className="course__video-content mb-35">
              <ul>
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i>
                      <FontAwesomeIcon icon={['fas', 'home']}/>
                    </i>
                  </div>
                  <div className="course__video-info">
                    <h5>
                      <span>Instructor :</span> Name
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i>
                      <FontAwesomeIcon icon={['fas', 'book']}/>
                    </i>
                  </div>
                  <div className="course__video-info">
                    <h5>
                      <span>Total Lectures :</span>30
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                </li>
              </ul>
            </div>
            <div className="course__enroll-btn">
              <Link href="/course-grid">
                <a className="e-btn e-btn-7 w-100">
                  View Marks{' '}
                  <i>
                    <FontAwesomeIcon icon={['fas', 'arrow-right']}/>
                  </i>
                </a>
              </Link>
            </div>
            <br/>
          </div>
        </div>
        <div className="course__sidebar-widget-2 white-bg mb-20">
          <div className="course__sidebar-course">
            <h3 className="course__sidebar-title">Ask Query</h3>
            <TextField
              fullWidth
              value={query.value}
              label="What is your question?"
              onChange={(e) => {
                setQuery({...query, query: e.target.value});
              }}
              margin="normal"
            />
            <button className="e-btn" onClick={() => {
              askQuestion();
            }}>Ask Question
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CourseSidebar;
