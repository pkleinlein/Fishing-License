import React from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

import Uploader from "./Uploader";

export default class ClubProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.showUp = this.showUp.bind(this);
        this.hideUp = this.hideUp.bind(this);
    }
    showUp(){
        this.setState({
            upVis: true
        });
    }
    hideUp(){
        this.setState({
            upVis: false
        });
    }
    render(){
        return(
            <div id="clubProfile">
                <div id="clubProfileWelcome">
                    <h1>Willkommen {this.props.club.name}!</h1>
                </div>
                <div id="clubProfileIcon">
                    <img onClick={this.showUp} id="clubIcon" src={this.props.club.icon || "/assets/defaultpicture.png"} />
                    <p>Klicken um Logo hochzuladen.</p>
                </div>
                {this.state.upVis && <Uploader hideUp={this.hideUp}/>}
                <Link to="/WatersClub"><h1 className="CPh1">Jetzt Gewässer registrieren und Tageskarten verkaufen.</h1></Link>
                <Link to="/scanner"><h1 className="CPh1">Tageskarten unkompliziert und schnell kontrollieren.</h1></Link>
            </div>
        );
    }
}
