import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridMain from '../components/CourseGrid/CourseGridMain';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';

class CourseGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    static getInitialProps({store}) {
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <CourseGridMain/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default CourseGrid;
