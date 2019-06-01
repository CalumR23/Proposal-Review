import React, { Component } from 'react';
import './Reviewform.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Reviewform extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
    axios.get('/user/all').then((response)=> {
        let reviewers = response.data.users
        this.setState({
          users: reviewers
        });
      })
    }

    handleSubmit(e) {
        //Form validation
        e.preventDefault();
        if (reviewer_one === reviewer_two || reviewer_one === reviewer_three || reviewer_two === reviewer_three) {
        this.setState({
            validForm: false
        });
        return;
    }
}
    
    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="applicant">
                        <Form.Label>Applicant Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" />
                    </Form.Group>
                    
                    <Form.Group controlId="reviewer_one">
                      <Form.Label>Reviewer 1</Form.Label>
                      <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers' multiple>
                        {this.state.users.map((user, index)=> {
                          return <option value={user.email} key={index}>{fullName(user.firstName,user.lastName)} —— {user.email}</option>
                        })}
                      </Form.Control>
                  </Form.Group>
                    
                  <Form.Group controlId="reviewer_two">
                      <Form.Label>Reviewer 2</Form.Label>
                      <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers' multiple>
                        {this.state.users.map((user, index)=> {
                          return <option value={user.email} key={index}>{fullName(user.firstName,user.lastName)} —— {user.email}</option>
                        })}
                      </Form.Control>
                  </Form.Group>
                    
                  <Form.Group controlId="reviewer_three">
                      <Form.Label>Reviewer 3</Form.Label>
                      <Form.Control style={{width: '300px'}} as="select" name='emails' className='reviewers' multiple>
                        {this.state.users.map((user, index)=> {
                          return <option value={user.email} key={index}>{fullName(user.firstName,user.lastName)} —— {user.email}</option>
                        })}
                      </Form.Control>
                  </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                   </Button>
                </Form>
            </div>
        )
    }
}