import React, { Component } from 'react';
import * as d3 from 'd3';
import fetchData from '../api/api';


export default class Chart extends Component{
    constructor(){
        super();
        this.state ={
            data : []
        }
    }

    componentWillMount(){
        let fastestTime = 2210;

        fetchData().then(function(data){
            let formattedData = data;
            // format the data we get from api
            formattedData.forEach((element)=>{
                element.behind = element.Seconds - fastestTime;
                // add the data to the legend
                element.legend = element.Doping !== "" ? "Doping Allegations" : "No Doping allegations";
            });
            this.setState({data : formattedData});
        }.bind(this)).catch((error)=>{
            console.error("Error in Chart when fetching data:", error);
        })
    }

    render(){
        return(
            <div>

            </div>
        )
    }
    
}