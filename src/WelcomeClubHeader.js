import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

export default class WelcomeClubHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div id="welcomeHeader">
                <div id="logo">
                    <a href="/logout"><img src="/assets/outlinefishLogo.svg"/></a>
                </div>
            </div>
        );
    }
}
