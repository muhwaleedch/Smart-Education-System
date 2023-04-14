import React, {Component, useEffect, useState} from 'react';
import AdminHeader from "../components/Layout/Header/AdminHeader";
import AdminGrid from "./admin-grid";
class Admin extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminHeader />
                <AdminGrid/>
            </React.Fragment>
        );
    }
}
export default Admin;