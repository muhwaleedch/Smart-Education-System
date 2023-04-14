import React from 'react';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import AboutMain from '../components/About/AboutMain';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <HeaderThree />
        <AboutMain />
        <FooterThree />
      </React.Fragment>
    );
  }
}

export default AboutPage;
