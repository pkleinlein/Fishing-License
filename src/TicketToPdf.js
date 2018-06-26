import React from "react";
import axios from "./axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default class TicketToPdf extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.createPDF = this.createPDF.bind(this);
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
                pdf.save(`${this.props.curWater.name}-test.pdf`);
            })
        ;
    }

    render(){
        return(
            <div id="pdfContainer">
                <div id="pdfContentContainer">
                    <h1>{this.props.curWater.name}</h1>
                    <h1>{this.props.curWater.club}</h1>
                    <h1>{this.props.curWater.adress}</h1>
                    <h3>{this.props.curWater.description}</h3>
                    <h3>{this.props.curWater.rules}</h3>
                    <h3>{this.props.curWater.stocking}</h3>
                </div>
                <div id="pdfBuyCnacleButton">
                    <h1 onClick={this.createPDF}>Kaufen</h1>
                    <h1 onClick={this.props.cancle}> Abbrechen</h1>
                </div>
            </div>
        );
    }
}
