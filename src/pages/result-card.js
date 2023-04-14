import React, {Component} from 'react';
import StudentHeader from '../components/Layout/Header/StudentHeader';
import Result from '../components/ResultCard/Result';

class ResultCard extends Component {
  render() {
    return (
      <React.Fragment>
        <StudentHeader />
        <Result />
      </React.Fragment>
    );
  }
}

export default ResultCard;
