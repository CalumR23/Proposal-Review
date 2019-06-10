import React, { Component } from 'react';
import './Reviewform.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';

export default class Reviewform extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        users: [],
        validForm: true,
        emailSent: false
      }
    }

    fullName(firstName, lastName) {
      return firstName + " " + lastName;
    }

    componentDidMount() {
    axios.get('/user/all').then((response)=> {
        let reviewers = response.data.users;
        this.setState({
          users: reviewers
        });
      });
    }

    handleSubmit(e) {
      //Form validation
      e.preventDefault();
      let { reviewer_one, reviewer_two, reviewer_three, applicant } = e.target;

      //Form Validation
      let checkLength = isLength(applicant.value, {min: 3});
      if (!checkLength) {
        this.setState({
          validForm: false
        })
        return;
      }
      else {

        //Send Post Request
        let uniqueReviewers = this.returnUnique([reviewer_one.value, reviewer_two.value, reviewer_three.value]);
        let postObj = {
          applicant: applicant.value,
          reviewers: uniqueReviewers
        };

        console.log(postObj);
        axios.post('/email/admin', postObj).then((response)=> {
          //Email Has Been Sent Successfully
          console.log(response);
          if (response.data.success) {
            this.setState({
              validForm: true,
              emailSent: response.data.success
            })
          }
        })
      }
    }

    returnUnique(objs) {
      //Make Unique Reviewers Array
      let newObjs = [];
      //Only Return Unique Reviewers that were selected
      for (let i=0; i<objs.length; i++) {
        let obj = objs[i];
        let objArray = obj.split(";");

        if (objArray[0] == "") continue; //IF email is None, skip!

        let newObj = {
          name: objArray[1],
          email: objArray[0]
        }
        newObjs.push(newObj);
      }

      return newObjs;
    }

    render() {
      let error_message = "";
      let email_success_message = "";
      let successStyles = {color: 'green', padding: '5px', margin: '0'};
      let errorStyles = {color: 'red', padding: '5px', margin: '0'}

      if (!this.state.validForm) {
        error_message = <p style={errorStyles}>Applicant name must be at least 3 characters long.</p>
      }

      if (this.state.emailSent) {
        email_success_message = <p style={successStyles}>Your Emails were sent successfully!</p>
      }

      return (
          <div>
            <p>If you only want to send to a particular participant, toggle the form field to 'none'</p>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="applicant">
                      <Form.Label>Applicant Name</Form.Label>
                      <Form.Control type="name" placeholder="Enter name" />
                  </Form.Group>

                  <Form.Group controlId="reviewer_one">
                    <Form.Label>Reviewer 1</Form.Label>
                    <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers'>
                      {this.state.users.map((user, index)=> {
                        return <option
                          value={user.email + ";" + this.fullName(user.firstName, user.lastName)}
                          key={index}>{this.fullName(user.firstName,user.lastName)} —— {user.email}
                        </option>
                      })}
                      <option value=''>None</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="reviewer_two">
                    <Form.Label>Reviewer 2</Form.Label>
                    <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers'>
                      {this.state.users.map((user, index)=> {
                        return <option value={user.email + ";" + this.fullName(user.firstName, user.lastName)} key={index}>{this.fullName(user.firstName,user.lastName)} —— {user.email}</option>
                      })}
                      <option value=''>None</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="reviewer_three">
                    <Form.Label>Reviewer 3</Form.Label>
                    <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers'>
                      {this.state.users.map((user, index)=> {
                        return <option value={user.email + ";" + this.fullName(user.firstName, user.lastName)} key={index}>{this.fullName(user.firstName,user.lastName)} —— {user.email}</option>
                      })}
                      <option value=''>None</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send Emails
                 </Button>
              </Form>
              {error_message}
              {email_success_message}
          </div>
      )
    }
}
