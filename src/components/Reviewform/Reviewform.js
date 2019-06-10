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
        validForm: true
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
      let uniqueEmails = this.returnUnique([reviewer_one.value, reviewer_two.value, reviewer_three.value]);
      applicant = applicant.value;

      let checkLength = isLength(applicant, {min: 3});
      if (!checkLength) {
        this.setState({
          validForm: false
        })
      } else {
        this.setState({
          validForm: true
        })
      }
    }

    returnUnique(emails) {
      return emails.filter((v, i, a) => {
        return a.indexOf(v) === i && (v != "");
      }); //Check if index of array is its own index;
    }

    render() {
      let error_message = "";
      if (!this.state.validForm) {
        error_message = <p style={{color: 'red', padding: '5px', margin: '0'}}>Applicant name must be at least 3 characters long.</p>
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
                        return <option value={user.email} key={index}>{this.fullName(user.firstName,user.lastName)} —— {user.email}</option>
                      })}
                      <option value=''>None</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="reviewer_two">
                    <Form.Label>Reviewer 2</Form.Label>
                    <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers'>
                      {this.state.users.map((user, index)=> {
                        return <option value={user.email} key={index}>{this.fullName(user.firstName,user.lastName)} —— {user.email}</option>
                      })}
                      <option value=''>None</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="reviewer_three">
                    <Form.Label>Reviewer 3</Form.Label>
                    <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers'>
                      {this.state.users.map((user, index)=> {
                        return <option value={user.email} key={index}>{this.fullName(user.firstName,user.lastName)} —— {user.email}</option>
                      })}
                      <option value=''>None</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send Emails
                 </Button>
              </Form>
              {error_message}
          </div>
      )
    }
}
