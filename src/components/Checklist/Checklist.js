import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


export default class Admin extends
    React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Are you able to review this proposal?</h3>
                <Form>
                    {['radio'].map(type => (
                        <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label={`Yes`}
                            />

                            <Form.Check
                                type={type}
                                label={'No'}
                                id={`default-${type}`}
                            />
                        </div>
                    ))}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
