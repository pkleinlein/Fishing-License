import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Waters extends React.Component {
    constructor(props) {
        super(props);
        this.state = { waters: [] };
    }
    componentDidMount() {
        axios
            .get("/gewaesserDaten")
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    waters: resp.data
                });
            })
            .then(() => {
                console.log("thats the state ", this.state.waters);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        if (!this.state.waters.length) {
            return <div>loading</div>;
        }
        return (
            <div id="watersContainer">
                {this.state.waters &&
                    this.state.waters.map(water => {
                        if (water.id % 2 == 0) {
                            return (
                                <Link
                                    className="eachWater"
                                    to={`/gewaesser/${water.id}`}
                                    key={water.id}
                                >
                                    <div id="eachWaterIMG">
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
                                    <div id="eachWaterText">
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
                                </Link>
                            );
                        } else {
                            return (
                                <Link
                                    className="eachOtherWater"
                                    to={`/gewaesser/${water.id}`}
                                    key={water.id}
                                >
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
                                    <div id="eachOtherWaterText">
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
                                </Link>
                            );
                        }
                    })}
            </div>
        );
    }
}
