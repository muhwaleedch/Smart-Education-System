import React from 'react';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';

class BlogDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <HeaderThree />
        <main>
        </main>
        <FooterThree />
      </React.Fragment>
    );
  }
}

export default BlogDetails;
