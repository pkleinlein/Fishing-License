import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

export default class WelcomeHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div id="welcomeHeader">
                <div id="logo">
                    <img src="/assets/outlinefishLogo.svg"/>
                </div>
                <div id="RegAndLog">
                    <h1 onClick={this.props.openRegister}>Registrieren</h1>
                    <h1 onClick={this.props.openLogin}>Login</h1>
                </div>
            </div>
        );
    }
}
