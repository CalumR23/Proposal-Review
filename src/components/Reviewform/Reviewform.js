import React, { Component } from 'react';
import './Reviewform.css';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

export default class Reviewform extends
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
                    
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Reviewer#1</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Reviewer#2</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Reviewer#3</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formControlTextarea">
                        <Form.Label>Email Body</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                   </Button>
                </Form>
            </div>
        )
    }
}