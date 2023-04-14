import React, {useEffect, useState} from "react";
import StudentHeader from "../components/Layout/Header/StudentHeader";
import {useRouter} from "next/router";
import axios from "axios";
import {useSelector} from "react-redux";

const AttemptQuiz = () => {
  const router = useRouter();
  const {quizId} = router.query;
  const userPayload = useSelector(state => state.userInfo);

  const [quizDetails, setQuizDetails] = useState({});
  const [optionsSelected, setOptionsSelected] = useState([]);

  console.log('optionsSelected', optionsSelected);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/student/get-quiz-details?quizId=${quizId}`)
      .then(response => {
        setQuizDetails(response.data.payload);
        if (response.data.payload) {
          setOptionsSelected(response.data.payload.mcqs.map(mcq => {
            return {mcqId: mcq.mcqId, correctOptionSelected: ''}
          }))
        }
      })
      .catch(() => {
      })
  }, [quizId]);

  const handleChange = (mcqId, e, optionIndex) => {
    setOptionsSelected((prevValue) => {
      return prevValue.map(val => {
        if (val.mcqId === mcqId) {
          val.correctOptionSelected = optionIndex;
        }
        return val;
      })
    })
  };

  const submitQuiz = () => {
    axios.post(`http://localhost:8080/api/v1/student/submit-quiz?quizId=${quizId}&studentId=${userPayload?.userPayload?.studentId}`, optionsSelected)
      .then(() => {
        history.back();
      })
      .catch(() => {});
  };

  return (
    <>
      <StudentHeader/>
      <main>
        <section className="page__title-area pt-120 pb-90 container">
          {Object.keys(quizDetails).length > 0 ? quizDetails.mcqs.map((mcq, index) => {
            return (
              <div key={index}>
                <p>{mcq.questionString}</p>
                <div className="form-check">
                  <input type="radio" id="optionOneLabel" onChange={(e) => {
                    handleChange(mcq.mcqId, e, "a")
                  }} value="a" className="form-check-input" name={`mcq-${index}`}/>
                  <label htmlFor="optionOneLabel" className="form-check-label">{mcq.optionOne}</label>
                </div>
                <div className="form-check">
                  <input type="radio" id="optionTwoLabel" onChange={(e) => {
                    handleChange(mcq.mcqId, e, "b")
                  }} value="b" className="form-check-input" name={`mcq-${index}`}/>
                  <label htmlFor="optionTwoLabel" className="form-check-label">{mcq.optionTwo}</label>
                </div>
                <div className="form-check">
                  <input type="radio" id="optionThreeLabel" onChange={(e) => {
                    handleChange(mcq.mcqId, e, "c")
                  }} value="c" className="form-check-input" name={`mcq-${index}`}/>
                  <label htmlFor="optionThreeLabel" className="form-check-label">{mcq.optionThree}</label>
                </div>
                <div className="form-check">
                  <input type="radio" id="optionFourLabel" onChange={(e) => {
                    handleChange(mcq.mcqId, e, "d")
                  }} value="d" className="form-check-input" name={`mcq-${index}`}/>
                  <label htmlFor="optionFourLabel" className="form-check-label">{mcq.optionFour}</label>
                </div>
              </div>
            );
          }) : null}
          {Object.keys(quizDetails).length > 0 ? (
            <button className="e-btn" onClick={submitQuiz}>Submit Quiz</button>
          ) : null}
        </section>
      </main>
    </>
  );
};

export default AttemptQuiz;
