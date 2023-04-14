import React from 'react';
import AdminHeader from "../components/Layout/Header/AdminHeader";
import NewStudent from "../components/Add Student/NewStudent";
import AddCourse from "../components/Courses/AdminAddCourse";

class AddStudent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <AdminHeader/>
                <AddCourse/>
            </React.Fragment>
        );
    }
}

export default AddStudent;
