import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends
  React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
            <body>
                <div>
                    <h3>Success!</h3>
                        <p>Email has been sent succesfully.</p>
                </div>
            </body>
    );
  }
}
