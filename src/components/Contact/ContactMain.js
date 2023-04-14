import React, {Component} from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import GetInTouch from './GetInTouchSection';
import Knowledge from './KnowledgeSection';

class ContactMain extends Component {
  render() {
    return (
      <main>


        {/* Getintouch-start */}
        <GetInTouch />

      </main>
    );
  }
}

export default ContactMain;
