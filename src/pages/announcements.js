import React, {Component, useEffect, useState} from 'react';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import AnnouncementsSection from '../components/Home/AnnouncementSection';
class Announcements extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <AnnouncementsSection />
        <Footer />
      </React.Fragment>
    );
  }
}
export default Announcements;
