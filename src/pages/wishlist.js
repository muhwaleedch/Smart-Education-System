import React from 'react';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import MyWishListMain from '../components/MyWishList/MyWishListMain';

class MyWishList extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({store}) {}

  render() {
    return (
      <React.Fragment>
        <HeaderThree />
        <MyWishListMain />
        <FooterThree />
      </React.Fragment>
    );
  }
}

export default MyWishList;
