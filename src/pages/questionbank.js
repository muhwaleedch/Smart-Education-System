import React from 'react';
import AdminHeader from "../components/Layout/Header/AdminHeader";
import BankQuestion from "../components/Instructor/QuestionBank";

class QuestionBank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
          <AdminHeader/>
          <BankQuestion/>
        </React.Fragment>
    );
  }
}

export default QuestionBank;
