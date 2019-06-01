import React, { Component } from 'react';
import './Update.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class Update extends
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
                    <Button variant="primary" type="submit">
                        Add User
                   </Button>
                </Form>
            </div>
        )
    }
}