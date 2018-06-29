import React from "react";
import axios from "./axios";


export default class AllClubs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        axios
            .get("/getAllClubsReg")
            .then(resp => {
                this.setState({
                    club: resp.data
                });
            })
            .then(() => {
                console.log("thats the state ", this.state.club);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div id="watersClubContainer">
                <div id="iDontEvenKnow">

                    <h1
                        id="openRegWater"
                        className="hoverWaterReg"
                    >
                            Registrierte Vereine:
                    </h1>

                </div>
                <div id="clubWatersContainer">
                    {this.state.club &&
                        this.state.club.map(club => {
                            return (
                                <div id="clubWater" key={club.id}>
                                    <div id="allClubsEverything">
                                        <img
                                            className="waterPic"
                                            src={
                                                club.icon ||
                                                "/assets/lake.jpg"
                                            }
                                        />
                                        <h1 className="waterName">
                                            {club.name}
                                        </h1>
                                    </div>
                                    <div id="clubWaterText">
                                        <div>
                                            <h3>Ansprechpartner:</h3>
                                            <p>{club.ceo}</p>
                                        </div>
                                        <div>
                                            <h3>Adresse:</h3>
                                            <p>{club.street}</p>
                                            <p>{club.postcode}</p>
                                            <p>{club.city}</p>
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
