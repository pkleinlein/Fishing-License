import React from "react";
import axios from "./axios";

import RegisterWater from "./RegisterWater";

export default class WatersClub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            h1Vis: true
        };
        this.showWaterUploader = this.showWaterUploader.bind(this);
        this.hideWaterUploader = this.hideWaterUploader.bind(this);
    }
    componentDidMount() {
        const clubId = this.props.club.id;
        console.log(clubId);
        axios
            .get("/getWatersForClub", { params: { clubId } })
            .then(resp => {
                this.setState({
                    clubWaters: resp.data
                });
            })
            .then(() => {
                console.log("thats the state ", this.state.clubWaters);
            })
            .catch(err => {
                console.log(err);
            });
    }
    showWaterUploader() {
        this.setState({
            waterUplVis: true,
            h1Vis: false
        });
    }
    hideWaterUploader() {
        this.setState({
            waterUplVis: false,
            h1Vis: true
        });
    }
    render() {
        return (
            <div>
                <div id="iDontEvenKnow">
                    {this.state.h1Vis && (
                        <h1
                            id="openRegWater"
                            className="hoverWaterReg"
                            onClick={this.showWaterUploader}
                        >
                            + Gewässer hinzufügen
                        </h1>
                    )}
                </div>
                {this.state.waterUplVis && (
                    <RegisterWater
                        club={this.props.club}
                        hideWaterUploader={this.hideWaterUploader}
                    />
                )}
                <div id="clubWatersContainer">

                    {this.state.clubWaters == 0 && <h1 id="messageClubWaters">Sie haben noch kein Gewässer registriert...</h1>}

                    {this.state.clubWaters &&
                        this.state.clubWaters.map(water => {
                            return (
                                <div id="clubWater" key={water.id}>
                                    <div>
                                        <img
                                            className="waterPic"
                                            src={
                                                water.photo ||
                                                "/assets/lake.jpg"
                                            }
                                        />
                                        <h1 className="waterName">
                                            {water.name}
                                        </h1>
                                    </div>
                                    <div id="clubWaterText">
                                        <div>
                                            <h3>Verein:</h3>
                                            <p>{water.club}</p>
                                        </div>
                                        <div>
                                            <h3>Adresse:</h3>
                                            <p>{water.adress}</p>
                                        </div>
                                        <div>
                                            <h3>Besatz:</h3>
                                            <p>{water.stocking}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
