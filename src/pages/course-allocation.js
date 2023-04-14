import React, {Component} from 'react';
import AdminHeader from '../components/Layout/Header/AdminHeader';
import AssignCourse from "../components/Course Allocation/AllocationCourse";


class AllocationCourse extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminHeader />
                <AssignCourse />
            </React.Fragment>
        );
    }
}

export default AllocationCourse;
