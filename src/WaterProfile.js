import React from "react";
import axios from "./axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import TicketToPdf from "./TicketToPdf";


export default class WaterProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.showTicket = this.showTicket.bind(this);
        this.cancleTicket = this.cancleTicket.bind(this);
    }
    componentDidMount(){
        console.log("hiii", this.props);
        const id = this.props.id;
        axios
            .get(`/gewaesser/${id}.json`)
            .then(({data}) =>{
                console.log(data.data);
                this.setState({
                    curWater: data.data
                });
            })
            .catch((err) =>{
                console.log(err);
            });
    }
    showTicket(){
        this.setState({
            ticketVis: true
        });
    }
    cancleTicket(){
        this.setState({
            ticketVis: false
        });
    }
    render(){
        if(!this.state.curWater){
            return <div>loading...</div>;
        }
        return (
            <div id="gewaesserProfileContainer">
                {this.state.ticketVis && <TicketToPdf
                    curWater={this.state.curWater}
                    cancle={this.cancleTicket}
                    user={this.props.user}
                />}
                <div id="innerGPContainer">
                    <div id="GPimageData">
                        <div id="GPimage"><img src={this.state.curWater.photo || "/assets/lake.jpg"} /></div>
                        <div id="GPdata">
                            <h1>{this.state.curWater.name}</h1>
                            <h3>{this.state.curWater.club}</h3>
                            <h3>{this.state.curWater.adress}</h3>
                        </div>
                    </div>
                    <div id="descriptionStockingRules">
                        <h3>Beschreibung</h3><p>{this.state.curWater.description}</p>
                        <h3>Besatz</h3><p>{this.state.curWater.stocking}</p>
                        <h3>Regeln und Vorschriften</h3><p>{this.state.curWater.rules}</p>
                    </div>
                    <div id="buyBotton">
                        <h1 onClick={this.showTicket}>Tageskarte kaufen</h1>
                    </div>
                </div>
            </div>
        );
    }
}
