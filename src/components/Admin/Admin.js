import React, { Component } from 'react';
import './Admin.css';
import Header from '../Header';
import Footer from '../Footer';
import Reviewform from '../Reviewform';
import Update from '../Update';

export default class Admin extends
  React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Reviewform />
        <Update />
        <Footer />
      </div>
    )
  }
}
