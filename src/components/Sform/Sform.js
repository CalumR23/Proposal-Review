import React, { Component } from 'react';
import './Sform.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Sform extends
    React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
          <Form>
          <Form.Group controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="name" placeholder="Enter name" />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                      </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                      Submit
                   </Button>
              </Form>
          </div>
        )
    }
}
