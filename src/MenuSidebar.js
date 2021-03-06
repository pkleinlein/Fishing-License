import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

export default class MenuSidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div id="menuSidebar">
                <div id="menuCloseX">
                    <p onClick={this.props.close}>X</p>
                </div>
                <div id="menuLinks">
                    <Link to="/gewaesser"><h1 onClick={this.props.close}>Gewässer</h1></Link>
                    <Link to="/AllClubs"><h1 onClick={this.props.close}>Vereine</h1></Link>
                    <h1>Tageskarten</h1>
                    <h1>Kontakt</h1>
                    <h1>Über Uns</h1>
                    <h1>Hilfe</h1>
                    <a href="/logout"><h1>Logout</h1></a>
                </div>
            </div>
        );
    }
}
