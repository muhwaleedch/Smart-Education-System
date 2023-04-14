import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useSelector} from "react-redux";
import axios from "axios";
import {useRouter} from "next/router";

const CourseSidebar = () => {
  const router = useRouter();
  const {courseId} = router.query;

  const userPayload = useSelector(state => state.userInfo);
  const [studentsEnrolled, setStudentEnrolled] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/course/students-registered-count?courseId=${courseId}`)
      .then(response => {
        setStudentEnrolled(response.data.payload);
      })
      .catch(() => {
      });
  }, []);

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
                      <FontAwesomeIcon icon={['fas', 'user']}/>
                    </i>
                  </div>
                  <div className="course__video-info">
                    <h5>
                      <span>Instructor :</span> {userPayload?.userPayload?.firstName}&nbsp;{userPayload?.userPayload?.lastName}
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
                      <span>Lectures :</span>{32}
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i>
                      <FontAwesomeIcon icon={['fas', 'clock']}/>
                    </i>
                  </div>
                  <div className="course__video-info">
                    <h5>
                      <span>Duration :</span>16 weeks
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i>
                      <FontAwesomeIcon icon={['fas', 'user']}/>
                    </i>
                  </div>
                  <div className="course__video-info">
                    <h5>
                      <span>Enrolled :</span>{studentsEnrolled}
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                </li>
              </ul>
            </div>
            <div className="course__enroll-btn">
              <Link href="/add-quiz">
                <a className="e-btn e-btn-7 w-100">
                  Add Quiz{' '}
                  <i>
                    <FontAwesomeIcon icon={['fas', 'arrow-right']}/>
                  </i>
                </a>
              </Link>
            </div>
            <br/>
            <div className="course__enroll-btn">
              <Link href={`/add-quiz?courseId=${courseId}`}>
                <a className="e-btn e-btn-7 w-100">
                  Add Assignment{' '}
                  <i>
                    <FontAwesomeIcon icon={['fas', 'arrow-right']}/>
                  </i>
                </a>
              </Link>
            </div>
            <br/>
            <div className="course__enroll-btn">
              <Link href={`/questionbank?courseId=${courseId}`}>
                <a className="e-btn e-btn-7 w-100">
                  Question Bank{' '}
                  <i>
                    <FontAwesomeIcon icon={['fas', 'arrow-right']}/>
                  </i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CourseSidebar;
