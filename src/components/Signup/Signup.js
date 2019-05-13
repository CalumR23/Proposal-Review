import React, { Component } from "react";
import "./Signup.css";
import Header from "../Header";
import Footer from "../Footer";
import Sform from "../Sform";


export default class Signup extends
    React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <body>
                <div>
                <Header />
                    <Sform />
                    <Footer />  
                </div>
            </body>
        )
    }
}