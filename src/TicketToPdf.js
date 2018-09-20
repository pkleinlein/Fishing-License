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
        this.ticketBatabaseInsert = this.ticketDatabaseInsert.bind(this);
        this.buyTicket = this.buyTicket.bind(this);
    }
    componentDidMount(){
    }
    buyTicket(){
        this.ticketDatabaseInsert();
        this.createPDF();
    }
    ticketDatabaseInsert(){
        const buyerId = this.props.user.id;
        const buyerFirst = this.props.user.first;
        const buyerLast = this.props.user.last;
        const buyerStreet = this.props.user.street;
        const buyerPostcode = this.props.user.postcode;
        const buyerBirthplace = this.props.user.birthplace;
        const buyerLicensenumber = this.props.user.licensenumber;
        const clubName = this.props.curWater.club;
        const waterAdress = this.props.curWater.adress;
        const waterRules = this.props.curWater.rules;
        const waterName = this.props.curWater.name;
        axios
            .post("/uploadTicket", {buyerId, buyerFirst, buyerLast, buyerStreet, buyerPostcode, buyerBirthplace, buyerLicensenumber, clubName, waterAdress, waterRules, waterName})
            .then(resp => {
                if (resp.data.success) {
                    this.setState({
                        error: false
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            }).catch((err) =>{
                console.log(err);
            });
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
                pdf.save(`${this.props.curWater.name}-${this.props.user.last}-${this.props.user.first}-${this.props.year}-${this.props.month}-${this.props.day}.pdf`);
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
                        <div id ="date">
                            <h3>{this.props.day}.</h3>
                            <h3>{this.props.month}.</h3>
                            <h3>{this.props.year}</h3>
                        </div>
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
                        <QRCode value={this.props.user.first + "#" + this.props.user.last + "#" + this.props.user.street + "#" + this.props.user.postcode+"#" +this.props.user.birthplace + "#"+ this.props.user.licensenumber +"#" + this.props.curWater.name + "#" + this.props.curWater.club + "#" + this.props.day + "#" + this.props.month + "#" + this.props.year} />
                    </div>
                </div>
                <div id="pdfBuyCnacleButton">
                    <h1 onClick={this.buyTicket}>Kaufen</h1>
                    <h1 onClick={this.props.cancle}> Abbrechen</h1>
                </div>
            </div>
        );
    }
}
