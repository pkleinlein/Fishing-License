import React, {Component} from 'react';
import axios from "./axios";
import {Link} from "react-router-dom";

export default class LoginClub extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        axios.post("/loginClub", this.state).then(response => {
            if (response.data.success) {
                location.replace("/clubs");
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render(){
        return (
            <div id="outerLogin">
                <div id="innerLogin">
                    <p onClick={this.props.hideLogClub}>X</p>
                    <form onSubmit={this.onSubmit}>
                        <input onChange={this.onChange} name="email" placeholder="E-Mail" type="text" />
                        <input onChange={this.onChange} name="password" placeholder="Passwort" type="password" />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
