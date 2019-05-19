import React, { Component } from 'react';
import './Login.css';
import Header from '../Header';
import Footer from '../Footer';
import Lform from '../Lform';

export default class Login extends
  React.Component {
  constructor(props) {
    super(props);
  }

    render() {
        return (
            <div>
                <Header />
                <Lform />
                <Footer />
            </div>
        )
    }
}
