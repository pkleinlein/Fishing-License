import React from "react";
import axios from "./axios";
// import QrReader from "react-qr-reader";

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
            this.setState({
                result: data
            });
        }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: "100%" }}
                />
                <p>{this.state.result}</p>
            </div>
        );
    }
}
