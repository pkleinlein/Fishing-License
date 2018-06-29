import React, { Component } from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upload = this.upload.bind(this);
        this.setFile = this.setFile.bind(this);
    }
    setFile(e) {
        this.file = e.target.files[0];
    }
    upload(e) {
        e.preventDefault();
        console.log(this.file);
        const formData = new FormData();
        formData.append("file", this.file);
        axios.post("/upload", formData).then(({ data }) => {
            this.props.setImage(data);
        });
    }
    render() {
        return (
            <div onDoubleClick={this.props.hideUp} id="uploader">
                <div id="innerUploader">
                    <input id="file" name="file" type="file" onChange={this.setFile} />
                    <button id="uploadImgBut" onClick={this.upload}> Upload </button>
                </div>
            </div>
        );
    }
}

// <h1 onClick={this.props.closeModal} id="close">X</h1>
