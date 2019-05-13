import React, { Component } from "react";
import "./Sform.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default class Sform extends
    React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <body>
                <div>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" />
                        </Form.Group>
                        
                        <Form.Group controlId="formControlSelect">
                            <Form.Label>Reviewer</Form.Label>
                            <Form.Control as="select" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formControlTextarea">
                            <Form.Label>Email Body</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        
                        <Form.Group controlId="formAttachment">
                        <Form.Label>Attachment</Form.Label>
                        <Form.control type="file" />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Submit
                         </Button>
                    </Form>;
                </div>
            </body>
        )
    }
}