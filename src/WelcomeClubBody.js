import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

export default class WelcomeClubBody extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <div id="welcomeClubBody">
                    <div id="welcomeClubBodyContent">
                        <h1>So funktioniert die Regestrierung für ihren Verein:</h1>
                        <div id="logAndRegClub">
                            <h1 id="logClub">Login</h1>
                            <h1 id="regClub">Registrieren</h1>
                        </div>
                    </div>
                </div>
                <div id="welcomeFooter">
                    <h3>Kontakt</h3>
                    <h3>Impressum</h3>
                    <h3>Social Media</h3>
                    <h3>Über uns</h3>
                </div>
            </div>
        );
    }
}
