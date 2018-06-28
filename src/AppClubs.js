import React from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

import HeaderLoggedInClub from "./HeaderLoggedInClub";
import ScannerClub from "./ScannerClub";
import WatersClub from "./WatersClub";

export default class AppClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        axios
            .get("/clubById")
            .then(({data}) =>{
                this.setState({
                    id: data.club.id,
                    name: data.club.name,
                    ceo: data.club.ceo,
                    clubNumber: data.club.clubNumber,
                    street: data.club.street,
                    postcode: data.club.postcode,
                    city: data.club.city,
                    icon: data.club.icon,
                    email: data.club.email
                });
            }).catch((err) =>{
                console.log(err);
            });
    }
    render(){
        if (!this.state.id) {
            return <h1>loading.....</h1>;
        }
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="*" render={() => <HeaderLoggedInClub  /> } />
                        <Route path="/scanner" render={() => <ScannerClub  /> } />
                        <Route path="/WatersClub" render={() => <WatersClub  club={this.state}/> } />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
