import React from "react";
import axios from "./axios";


export default class Waters extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios
            .get("/gewaesser")
            .then((resp) =>{
                console.log(resp.data.data);
            });
    }
    render(){
        return <h1>gewässer</h1>;
    }
}
