import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";
import MenuSidebar from "./MenuSidebar";

export default class HeaderLoggedIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.showMenu = this.showMenu.bind(this);
        this.closemenu = this.closemenu.bind(this);
    }
    showMenu(){
        this.setState({
            menuVis: true
        });
    }
    closemenu(){
        console.log("hide menu clicked");
        this.setState({
            menuVis: false
        });
    }
    render(){
        return(
            <div>
                <div id="headerLoggedIn">
                    <Link to ="/"><img id="headerLoggedInLogo" src="/assets/outlinefishLogo.svg"/></Link>
                    <img onClick={this.showMenu}  id="headerLoggedInBurger" src="/assets/burgermenu.png" />
                </div>
                {this.state.menuVis && <MenuSidebar close={this.closemenu} />}
            </div>
        );}
}
