import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

export default class MenuSidebarClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div id="menuSidebar">
                <div id="menuCloseX">
                    <p onClick={this.props.closeDiv}>X</p>
                </div>
                <div id="menuLinks">
                    <Link to="/WatersClub"><h1 onClick={this.props.closeDiv}>Gewässer</h1></Link>
                    <Link to="/scanner"><h1 onClick={this.props.closeDiv}>Scanner</h1></Link>
                    <h1>Tageskarten</h1>
                    <h1>Kontakt</h1>
                    <a href="/logout"><h1>Logout</h1></a>
                </div>
            </div>
        );
    }
}
