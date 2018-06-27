import React from "react";
import { HashRouter, BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import WelcomeHeader from "./WelcomeHeader";
import WelcomeBody from "./WelcomeBody";
import RegisterUser from "./RegisterUser";
import Login from "./Login";

export default class WelcomeUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showLogin = this.showLogin.bind(this);
        this.hideLogin = this.hideLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.hideRegister = this.hideRegister.bind(this);
    }
    showLogin(){
        this.setState({
            loginVis: true
        });
    }
    hideLogin(){
        this.setState({
            loginVis: false
        });
    }
    showRegister(){
        this.setState({
            registerVis: true
        });
    }
    hideRegister(){
        this.setState({
            registerVis: false
        });
    }
    render() {
        return (
            <div>
                {this.state.registerVis && (
                    <RegisterUser closeRegister={this.hideRegister} />
                )}
                {this.state.loginVis && <Login closeLogin={this.hideLogin} />}
                <WelcomeHeader
                    openRegister={this.showRegister}
                    openLogin={this.showLogin}
                />
                <WelcomeBody />
            </div>
        );
    }
}
