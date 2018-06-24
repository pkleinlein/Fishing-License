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
        const {first, last, birthday, street, postcode, birthplace, licensenumber, email, password} = this;
        axios
            .post("/register", {first, last, birthday, street, postcode, birthplace, licensenumber, email, password})
            .then(resp => {
                if (resp.data.success) {
                    location.replace("/");
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
                        <p onClick={this.props.closeRegister}>X</p>
                    </div>
                    <div id="innerRegister">
                        {this.state.error && <div className="err">Oops! You suck</div>}
                        <input type="text" name="first" placeholder="Name" onChange={this.handleInput}/>
                        <input type="text" name="last" placeholder="Nachname" onChange={this.handleInput}/>
                        <input type="text" name="birthday" placeholder="Geburtsdatum" onChange={this.handleInput}/>
                        <input type="text" name="street" placeholder="Straße und Hausnummer" onChange={this.handleInput}/>
                        <input type="text" name="postcode" placeholder="Postleitzahl" onChange={this.handleInput}/>
                        <input type="text" name="birthplace" placeholder="Geburtsort" onChange={this.handleInput}/>
                        <input type="text" name="licensenumber" placeholder="Fischereinscheinnummer" onChange={this.handleInput}/>
                        <input type="email" name="email" placeholder="E-Mail" onChange={this.handleInput}/>
                        <input type="password" name="password" placeholder="Passwort" onChange={this.handleInput}/>
                        <button onClick={this.handleSubmit}>Registrieren</button>
                    </div>
                </div>
            </div>
        );
    }
}
