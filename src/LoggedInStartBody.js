import React from "react";
import axios from "./axios";


export default class LoggedInStartBody extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div id="lsbbContainer">
                <div id="lsbbContent">

                    <div id="topContent">
                        <div id="imageUploader">
                            <img src={this.props.state.photo || "/assets/defaultpicture.png"} />
                        </div>
                        <div id="nextToImg">
                            <div className="listTop">
                                <h3>Name: </h3><p> {this.props.state.first}</p>
                            </div>
                            <div className="listTop">
                                <h3>Nachname: </h3><p> {this.props.state.last}</p>
                            </div>
                            <div className="listTop">
                                <h3>Geburtstag: </h3><p> {this.props.state.birthday}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bottomContent">
                        <div className="listBottom">
                            <h3>Straße: </h3><p> {this.props.state.street}</p>
                        </div>
                        <div className="listBottom">
                            <h3>Postleitzahl:</h3><p>{this.props.state.postcode}</p>
                        </div>
                        <div className="listBottom">
                            <h3>Ort:</h3><p>{this.props.state.birthplace}</p>
                        </div>
                        <div className="listBottom">
                            <h3>Fischereinscheinnummer:</h3><p>{this.props.state.licensenumber}</p>
                        </div>
                        <div className="listBottom">
                            <h3>E-Mail Adresse:</h3><p>{this.props.state.email}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
