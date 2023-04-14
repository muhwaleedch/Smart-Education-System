import React, {Component} from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import TeacherTwo from './TeacherSectionTwo';
import Banner from '../Home/BannerSection';
import Cta from '../Home/CtaSection';

class InstructorMain extends Component {
  render() {
    return (
      <main>
        <TeacherTwo />
      </main>
    );
  }
}

export default InstructorMain;