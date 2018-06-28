import React from "react";
import axios from "./axios";
import QrReader from "react-qr-reader";


export default class ScannerClub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 1000,
            result: "No result"
        };
        this.handleScan = this.handleScan.bind(this);
    }
    componentDidMount(){
        const d = new Date();
        const b = d.toISOString();
        const a = b.split("T");
        const z = a[0];
        const x = z.replace("-", "");
        const curDatum = x.replace("-", "");
        console.log(curDatum);
        this.setState({
            aktDatum: curDatum
        });
    }
    handleScan(data) {
        if (data) {
            let curDatum = this.state.aktDatum;
            const array = data.split("#");
            const dateTicket = array[10]+array[9]+array[8];
            console.log(dateTicket);
            if(curDatum.indexOf(dateTicket) != -1){
                this.setState({
                    success:true,
                    result: data,
                    resultFirst: array[0],
                    resultLast: array[1],
                    resultStreet: array[2],
                    resultPostcode: array[3],
                    resultCity: array[4],
                    resultLicensenumber: array[5],
                    valid: true,
                    notValid: false
                });
            }
            else{
                this.setState({
                    success:true,
                    result: data,
                    resultFirst: array[0],
                    resultLast: array[1],
                    resultStreet: array[2],
                    resultPostcode: array[3],
                    resultCity: array[4],
                    resultLicensenumber: array[5],
                    valid: false,
                    notValid: true
                });
            }
        }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        return (
            <div id="scannerContainer">
                <div id="innerScanner">
                    <div id="qrReader">
                        <QrReader
                            delay={this.state.delay}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: "20%" }}
                        />
                        {this.state.success &&
                        <div id="scanResult">
                            <p>Name:    {this.state.resultFirst}</p>
                            <p>Nachname:    {this.state.resultLast}</p>
                            <p>Straße:    {this.state.resultStreet}</p>
                            <p>Postleitzahl:    {this.state.resultPostcode}</p>
                            <p>Ort:    {this.state.resultCity}</p>
                            <p>Fischereischeinnummer:   {this.state.resultLicensenumber}</p>
                            {this.state.valid && <div id="gultig"><p>GÜLTIG</p></div>}
                            {this.state.notValid && <div id="ungultig>"><p id="ungultig">UNGÜLTIG</p></div>}
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
