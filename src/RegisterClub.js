import React from "react";
import axios from "./axios";

export default class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
    }
    handleSubmit() {
        const {name, ceo, clubNumber, street, postcode, city, email, password} = this;
        axios
            .post("/registerClub", {name, ceo, clubNumber, street, postcode, city, email, password})
            .then(resp => {
                if (resp.data.success) {
                    location.replace("/clubs");
                } else {
                    this.setState({
                        error: true
                    });
                }
            }).catch((err) =>{
                console.log(err);
            });
    }
    render() {
        return (
            <div id="outerRegister">
                <div id="middleRegister">
                    <div id="xButton">
                        <p onClick={this.props.hideRegClub}>X</p>
                    </div>
                    <div id="innerRegister">
                        {this.state.error && <div className="err">Oops! You suck</div>}
                        <input type="text" name="name" placeholder="Name" onChange={this.handleInput}/>
                        <input type="text" name="ceo" placeholder="Vorsitzender" onChange={this.handleInput}/>
                        <input type="text" name="clubNumber" placeholder="Registrierungsnummer" onChange={this.handleInput}/>
                        <input type="text" name="street" placeholder="Straße und Hausnummer" onChange={this.handleInput}/>
                        <input type="text" name="postcode" placeholder="Postleitzahl" onChange={this.handleInput}/>
                        <input type="text" name="city" placeholder="Ort" onChange={this.handleInput}/>
                        <input type="email" name="email" placeholder="E-Mail" onChange={this.handleInput}/>
                        <input type="password" name="password" placeholder="Passwort" onChange={this.handleInput}/>
                        <button onClick={this.handleSubmit}>Verein Registrieren</button>
                    </div>
                </div>
            </div>
        );
    }
}
