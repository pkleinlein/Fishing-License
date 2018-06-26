import React from "react";
import axios from "./axios";


export default class WaterProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        console.log("hiii", this.props);
        const id = this.props.match.params.id;
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
    render(){
        if(!this.state.curWater){
            return <div>loading...</div>;
        }
        return (
            <div id="gewaesserProfileContainer">
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
                        <h1>Tageskarte kaufen</h1>
                    </div>
                </div>
            </div>
        );
    }
}
