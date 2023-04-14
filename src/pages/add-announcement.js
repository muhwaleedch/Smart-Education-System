import React, {Component} from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import AddingAnnouncement from "../components/Announcement Details/AddAnnouncements";

class AddAnnouncement extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminHeader />
                <AddingAnnouncement />
            </React.Fragment>
        );
    }
}

export default AddAnnouncement;
