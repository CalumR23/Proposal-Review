import React, { Component } from 'react';
import './Home.css';
import Header from '../Header';
import Footer from '../Footer';
import Subform from '../Subform';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    }
  }

  componentDidMount() {
    axios.get('/login/success').then((response)=> {
      this.setState({
        isAuth: response.data.success
      })
    });
  }

  render() {

    let noLoggedInMessage = (
      <div>
        <p>You have not logged in yet. Please Log In to View Home Page.</p>
        <a href='/'>Log In</a>
      </div>
    );

    let loggedInMessage = (
      <div>
        <Header />
        <Subform />
        <Footer />
      </div>
    );

    return (
      <div>
        {this.state.isAuth ? loggedInMessage : noLoggedInMessage}
      </div>
    )
  }
}
