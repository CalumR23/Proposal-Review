import React, { Component } from 'react';
import './Admin.css';
import Header from '../Header';
import Footer from '../Footer';
import Reviewform from '../Reviewform';

export default class Admin extends React.Component {
  componentWillMount() {
    //Check for Regina's Login
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Reviewform />
        <Footer />
      </div>
    )
  }
}
