import React from "react";
import axios from "./axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import TicketToPdf from "./TicketToPdf";

const year = document.getElementById("year");

export default class WaterProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.showTicket = this.showTicket.bind(this);
        this.cancleTicket = this.cancleTicket.bind(this);
        this.setYear = this.setYear.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.setDay = this.setDay.bind(this);
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
    setYear(e){
        this.setState({
            year: e.target.value
        });
    }
    setMonth(e){
        this.setState({
            month: e.target.value
        });
    }
    setDay(e){
        this.setState({
            day: e.target.value
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
                    year={this.state.year}
                    month={this.state.month}
                    day={this.state.day}
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
                        <h3> Datum wählen: </h3>
                    </div>
                    <div id="dropDown">
                        <select onChange={this.setYear} id="year">
                            <option value="-">-</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                        <select onChange={this.setMonth} id="Month">
                            <option value="-">-</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select onChange={this.setDay} id="Day">
                            <option value="-">-</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                    </div>
                    <div id="buyBotton">
                        <h1 onClick={this.showTicket}>Tageskarte kaufen</h1>
                    </div>
                </div>
            </div>
        );
    }
}
