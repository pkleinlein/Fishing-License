import React from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

import HeaderLoggedInClub from "./HeaderLoggedInClub";
import ScannerClub from "./ScannerClub";

export default class AppClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="*" render={() => <HeaderLoggedInClub  /> } />
                        <Route path="/scanner" render={() => <ScannerClub  /> } />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
