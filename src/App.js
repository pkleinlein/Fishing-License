import React from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HeaderLoggedIn from "./HeaderLoggedIn";
import LoggedInStartBody from "./LoggedInStartBody";

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        axios
            .get("/user")
            .then(({data}) =>{
                this.setState({
                    id: data.user.id,
                    first: data.user.first,
                    last: data.user.last,
                    birthday: data.user.birthday,
                    street: data.user.street,
                    postcode: data.user.postcode,
                    birthplace: data.user.birthplace,
                    photo: data.user.photo,
                    licensenumber: data.user.licensenumber,
                    email: data.user.email
                });
            })
            .catch((err) =>{
                console.log(err);
            });
    }
    render(){
        if (!this.state.id) {
            return null;
        }
        return(
            <div id="app">
                <BrowserRouter>
                    <div>
                        <Route path="*" render={() => <HeaderLoggedIn  /> } />
                        <Route exact path="/" render ={() =>(
                            <LoggedInStartBody
                                state={this.state}
                            />
                        )} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }

}
