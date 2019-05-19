import React, { Component } from 'react';
import './Home.css';
import Header from '../Header';
import Footer from '../Footer';
import Subform from '../Subform';

export default class Home extends
  React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Subform />
        <Footer />
      </div>
    )
  }
}
