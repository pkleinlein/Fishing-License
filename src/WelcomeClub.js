import React from "react";
import axios from "./axios";
import {Link, BrowserRouter} from "react-router-dom";

import WelcomeClubHeader from "./WelcomeClubHeader";
import WelcomeClubBody from "./WelcomeClubBody";
import RegisterClub from "./RegisterClub";
import LoginClub from "./LoginClub";

export default class WelcomeClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <RegisterClub />
                <WelcomeClubHeader />
                <WelcomeClubBody />
            </div>
        );
    }
}
