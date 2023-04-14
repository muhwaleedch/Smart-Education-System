import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useSelector} from "react-redux";
import axios from "axios";

const TeacherCourses = () => {
  const userPayload = useSelector(state => state.userInfo);

  const [teacherCourses, setTeacherCourses] = useState([]);

  useEffect(() => {
    if (userPayload?.userPayload?.teacherId) {
      axios.post(`http://localhost:8080/api/v1/teacher/get-courses?teacherId=${userPayload.userPayload.teacherId}`)
        .then(response => {
          setTeacherCourses(response.data.payload);
        })
        .catch(() => {
        });
    }
  }, [userPayload?.userPayload?.teacherId]);

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
                  <br/>
                  <span className="yellow-bg">
                    Courses{' '}
                    <img
                      src="assets/img/shape/yellow-bg-2.png"
                      alt="img not found"
                    />{' '}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {teacherCourses.map((item, index) => (
              <div
                key={index}
                className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M178.7,492H120c-55.2,0-100-44.8-100-100V120C20,64.8,64.8,20,120,20h58.7C123.7,20,81,64.8,81,120v272   C81,447.2,123.7,492,178.7,492z M355.5,204.8l18.9-85.5c4.8-24.1,16.7-46.3,34.1-63.7l35.4-35.4c-15.1-1.4-30.7,3.7-42.3,15.3   l-61.1,61.1c-17.4,17.4-29.3,39.6-34.1,63.7L295,217l56.7-11.3C352.9,205.4,354.2,205.1,355.5,204.8L355.5,204.8z"
                        />
                        <path
                          className="st1"
                          d="M299,512H120C53.8,512,0,458.2,0,392V120C0,53.8,53.8,0,120,0h183c11,0,20,9,20,20s-9,20-20,20H120   c-44.1,0-80,35.9-80,80v272c0,44.1,35.9,80,80,80h179c44.1,0,80-35.9,80-80V272c0-11,9-20,20-20s20,9,20,20v120   C419,458.2,365.2,512,299,512z M298.9,236.6l56.7-11.3c28.1-5.6,53.7-19.3,73.9-39.6l61.1-61.1c28.5-28.5,28.5-74.8,0-103.2   c-28.5-28.5-74.8-28.5-103.2,0l-61.1,61.1c-20.3,20.3-33.9,45.8-39.6,73.9l-11.3,56.7c-1.3,6.6,0.7,13.3,5.5,18.1   c3.8,3.8,8.9,5.9,14.1,5.9C296.3,237,297.6,236.9,298.9,236.6L298.9,236.6z M462.4,49.7c6.2,6.2,9.7,14.5,9.7,23.3   s-3.4,17.1-9.7,23.3l-61.1,61.1c-14.7,14.7-33.2,24.6-53.5,28.6l-27.3,5.4l5.4-27.3c4.1-20.3,14-38.8,28.6-53.5l61.1-61.1   c6.2-6.2,14.5-9.7,23.3-9.7S456.1,43.4,462.4,49.7L462.4,49.7z"
                        />
                        <path
                          className="st2"
                          d="M319,352H101c-11,0-20-9-20-20s9-20,20-20h218c11,0,20,9,20,20S330.1,352,319,352z M211,387   c-13.8,0-25,11.2-25,25s11.2,25,25,25s25-11.2,25-25S224.8,387,211,387z"
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="category__content">
                    <h4 className="category__title">
                      <Link href={`/course-details?courseId=${item.courseId}`}>
                        <a>{item.courseCode}</a>
                      </Link>
                    </h4>
                    <p>{item.courseName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TeacherCourses;
