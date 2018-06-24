import React from "react";
import axios from "./axios";

export default class RegisterWater extends React.Component {
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
        const {name, club, adress, description, rules, stocking} = this;
        axios
            .post("/registerWater", {name, club, adress, description, rules, stocking})
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
                    <div id="innerRegister">
                        {this.state.error && <div className="err">Oops! You suck</div>}
                        <input type="text" name="name" placeholder="Name" onChange={this.handleInput}/>
                        <input type="text" name="club" placeholder="Verein" onChange={this.handleInput}/>
                        <input type="text" name="adress" placeholder="Adresse" onChange={this.handleInput}/>
                        <input type="text" name="description" placeholder="Beschreibung" onChange={this.handleInput}/>
                        <input type="text" name="rules" placeholder="Regeln" onChange={this.handleInput}/>
                        <input type="text" name="stocking" placeholder="Besatz" onChange={this.handleInput}/>
                        <button onClick={this.handleSubmit}>Registrieren</button>
                    </div>
                </div>
            </div>
        );
    }
}
