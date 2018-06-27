import React from "react";
import { HashRouter, BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import WelcomeUser from "./WelcomeUser";
import WelcomeClub from "./WelcomeClub";

export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/welcome"
                            component = {WelcomeUser}
                        />
                        <Route excat path="/clubs"
                            component = {WelcomeClub}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
