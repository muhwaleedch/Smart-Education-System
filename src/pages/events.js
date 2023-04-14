import React, {Component, useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Header from '../components/Layout/Header/Header';
import HeaderAfter from './header-after-login';
import Event from '../components/Home/EventSection';
import Footer from '../components/Layout/Footer/Footer';
import AnnouncementsSection from '../components/Home/AnnouncementSection';
import EventSection from '../components/Home/EventSection';
class Events extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <EventSection />
        <Footer />
      </React.Fragment>
    );
  }
}
export default Events;
