import React, { Component } from 'react';
import './Subform.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Subform extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: [],
        currentUser: {
          firstName: "",
          lastName: "",
          email: ""
        },
        emailSent: false,
        errorMessage: ""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      //Check if User Logged In
      axios.get('/login/success').then((response)=> {
        let current = response.data.user;

        //If logged in, get current user
        axios.get('/user/current', {
          params: {
            id: current
          }
        }).then((response)=> {
          //Save User in State
          let user = response.data.user;
          this.setState({
            currentUser: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          })
        })
      });

      //Populate All Reviewers for DropDown --> Get All
      axios.get('/user/all').then((response)=> {
        let reviewers = response.data.users;
        this.setState({
          users: reviewers
        });
      })
    }

    handleSubmit(e) {
      //Handle Form Submission
      e.preventDefault();
      this.setState({
        emailSent: false
      });

      let { name } = e.target;
      let file = e.target[2].files[0];

      //If no file, return
      if (!file) {
        this.setState({
          errorMessage: <p style={{color: 'red'}}>Please upload a file — file field cannot be empty.</p>
        })
        return;
      }

      let emails = [];

      //Get Values from Multiple Select
      const selected = document.querySelectorAll('.reviewers option:checked');
      const values = Array.from(selected).map(el => el.value); //Array.from --> transforms list into array

      //PUsh emails into queue
      for (let i=0; i<values.length; i++) {
        emails.push(values[i]);
      }

      const url = '/email/proposer';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name.value);
      formData.append('emails', emails);
      const config = { headers: {'Content-Type': 'multipart/form-data' }};

      axios({
        method: 'post',
        url: url,
        data: formData,
        config: config,
      }).then((response)=> {
        if (response.data.success) {
          let inputs = document.querySelectorAll('input');
          inputs.forEach((input)=> input.value = "");
          this.setState({
            emailSent: true,
            errorMessage: ""
          })
        } else {
          this.setState({
            emailSent: false
          })
        }
      });
    }

    render() {
      let { firstName, lastName } = this.state.currentUser;
      //Build Full Name
      let fullName = (firstName, lastName)=> {
        return firstName + " " + lastName;
      }
      return (
          <div>
              <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                  <Form.Group controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="name" name='name' placeholder={fullName(firstName, lastName)}/>
                  </Form.Group>

                  <Form.Group controlId="formControlSelect">
                      <Form.Label>Reviewer</Form.Label>
                      <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers' multiple>
                        {this.state.users.map((user, index)=> {
                          return <option value={user.email + ";" + fullName(user.firstName, user.lastName)} key={index}>{fullName(user.firstName,user.lastName)} —— {user.email}</option>
                        })}
                      </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formAttachment">
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control name='file' type="file"/>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                      Submit
                  </Button>
              </Form>
              <p className='success-message' style={{color: 'green'}}>{this.state.emailSent ? 'Your email has been sent!' : ""}</p>
              {this.state.errorMessage}
        </div>
      )
    }
}
