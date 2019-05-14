import React, { Component } from "react";
import "./Login.css";
import Header from "../Header";
import Footer from "../Footer";
import Lform from "../Lform";

export default class Login extends
    React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Am I just really stupid?</p>
                <Header />
                <Lform />
                <Footer />
            </div>
        )
    }
}
