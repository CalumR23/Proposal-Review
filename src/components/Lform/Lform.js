import React, { Component } from "react";
import "./Lform.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default class Lform extends
    React.Component {


    render() {
        return (
          <div>
              <Form>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
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
