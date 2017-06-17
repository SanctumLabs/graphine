import React, { Component } from 'react';
import * as d3 from 'd3';
import * as d3Configs from '../constants/d3configs';
import * as constants from '../constants/constants';
import fetchData from '../api/api';


export default class Chart extends Component{
    constructor(){
        super();
        this.state ={
            data : []
        };

        this._startDrawing = this._startDrawing.bind(this);
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
        });
    }

    componentDidMount(){
        // start drawing onto DOM
        this._startDrawing();
    }

    //noinspection JSMethodCanBeStatic
    /**
     * Starts drawing chart onto DOM
     * */
    _startDrawing(){
        //Create SVG element
        let svg = d3.select("#container").append("svg")
            .attr("width", constants.WIDTH + constants.MARGIN.left + constants.MARGIN.right)
            .attr("height", constants.HEIGHT + constants.MARGIN.top + constants.MARGIN.bottom)
            .append("g")
            .attr("transform", "translate(" + constants.MARGIN.left + "," + constants.MARGIN.top + ")");

    }

    //noinspection JSMethodCanBeStatic
    render(){
        //noinspection CheckTagEmptyBody
        return(
            <div id="container"></div>
        )
    }
    
}