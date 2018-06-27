import React from "react";
import axios from "./axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
// import QrReader from "react-qr-reader";

export default class TicketToPdf extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.createPDF = this.createPDF.bind(this);
    }
    componentDidMount(){
        console.log(this.props);
    }
    createPDF(){
        console.log("create pdf called");
        const input = document.getElementById('pdfContentContainer');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 5, 5, 200, 285);
                // pdf.output('dataurlnewwindow');
                pdf.save(`${this.props.curWater.name}-${this.props.user.last}-${this.props.user.first}.pdf`);
            })
            .catch((err) =>{
                console.log(err);
            })
        ;
    }

    render(){
        return(
            <div id="pdfContainer">
                <div id="pdfContentContainer">
                    <div id="ticketHeader">
                        <h1>Tageskarte</h1>
                    </div>
                    <div id="ticketFisher">
                        <h1>Fichereiberechtigte /-r</h1>
                        <h3>{this.props.user.last + ", " + this.props.user.first}</h3>
                        <h3>{this.props.user.street + ", " + this.props.user.postcode + " " +this.props.user.birthplace}</h3>
                        <h3>{this.props.user.licensenumber}</h3>
                    </div>
                    <div id="ticketWater">
                        <h1>Gewässer</h1>
                        <h3>{this.props.curWater.name}</h3>
                        <h3>{this.props.curWater.club}</h3>
                        <h3>{this.props.curWater.adress}</h3>
                        <h2>Regeln und Vorschriften</h2>
                        <h3>{this.props.curWater.rules}</h3>
                    </div>
                    <div id="ticketQRCode">
                        <QRCode value={this.props.curWater.name + "#" + this.props.curWater.club} />
                    </div>
                </div>
                <div id="pdfBuyCnacleButton">
                    <h1 onClick={this.createPDF}>Kaufen</h1>
                    <h1 onClick={this.props.cancle}> Abbrechen</h1>
                </div>
            </div>
        );
    }
}
