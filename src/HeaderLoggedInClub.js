import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";
import MenuSidebarClub from "./MenuSidebarClub";

export default class HeaderLoggedInClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.showMenu = this.showMenu.bind(this);
        this.closemenuDiv = this.closemenuDiv.bind(this);
    }
    showMenu(){
        this.setState({
            menuVis: true
        });
    }
    closemenuDiv(){
        console.log("hide menu clicked");
        this.setState({
            menuVis: false
        });
    }
    render(){
        return(
            <div id="headerContainer">
                <div id="headerLoggedIn">
                    <Link to ="/"><img id="headerLoggedInLogo" src="/assets/outlinefishLogo.svg"/></Link>
                    <img onClick={this.showMenu}  id="headerLoggedInBurger" src="/assets/burgermenu.png" />
                    {this.state.menuVis && <MenuSidebarClub closeDiv={this.closemenuDiv} />}
                </div>
            </div>
        );}
}
