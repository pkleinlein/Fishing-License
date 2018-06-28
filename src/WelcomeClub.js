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
        this.showRegClub = this.showRegClub.bind(this);
        this.hideRegClub = this.hideRegClub.bind(this);
        this.showLogClub = this.showLogClub.bind(this);
        this.hideLogClub = this.hideLogClub.bind(this);
    }
    showRegClub(){
        this.setState({
            regClubVis: true
        });
    }
    hideRegClub(){
        this.setState({
            regClubVis: false
        });
    }
    showLogClub(){
        this.setState({
            logClubVis: true
        });
    }
    hideLogClub(){
        this.setState({
            logClubVis: false
        });
    }
    render(){
        return (
            <div>
                {this.state.logClubVis && <LoginClub hideLogClub={this.hideLogClub} />}
                {this.state.regClubVis && <RegisterClub hideRegClub={this.hideRegClub} />}
                <WelcomeClubHeader />
                <WelcomeClubBody showRegClub={this.showRegClub} showLogClub={this.showLogClub}/>
            </div>
        );
    }
}
