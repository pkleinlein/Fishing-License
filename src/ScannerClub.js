import React from "react";
import axios from "./axios";
import QrReader from "react-qr-reader";

export default class ScannerClub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: "No result"
        };
        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(data) {
        if (data) {
            const array = data.split("#");
            this.setState({
                success:true,
                result: data,
                resultFirst: array[0],
                resultLast: array[1],
                resultStreet: array[2],
                resultPostcode: array[3],
                resultCity: array[4],
                resultLicensenumber: array[5]
            });
        }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        return (
            <div id="qrReader">
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: "30%" }}
                />
                {this.state.success &&
                <div>
                    <p>Name: {this.state.resultFirst}</p>
                    <p>Nachname: {this.state.resultLast}</p>
                    <p>Straße: {this.state.resultStreet}</p>
                    <p>Postleitzahl: {this.state.resultPostcode}</p>
                    <p>Ort: {this.state.resultCity}</p>
                    <p>Fischereischeinnummer: {this.state.resultLicensenumber}</p>
                </div>
                }
            </div>
        );
    }
}
