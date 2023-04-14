import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import EventDetailsMain from '../components/EventDetails/EventDetailsMain';
import Header from '../components/Layout/Header/Header';

class AnnouncementDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    static getInitialProps({store}) {
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <EventDetailsMain/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default AnnouncementDetails;
