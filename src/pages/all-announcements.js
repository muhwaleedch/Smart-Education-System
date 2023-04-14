import React, {Component} from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import AllAnnouncements from "../components/AllAnnouncements/AllAnnouncements";

const AllAnnouncement = ()=> {
        return (
            <React.Fragment>
                <AdminHeader />
                <AllAnnouncements />
            </React.Fragment>
        );
    }

export default AllAnnouncement;