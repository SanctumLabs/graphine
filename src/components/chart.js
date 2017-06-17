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

    //noinspection JSMethodCanBeStatic
    /**
     * Starts drawing chart onto DOM
     * */
    _startDrawing(){
        //Create SVG element
        let svg = d3.select("#container")
            .append("svg")
            .attr("width", constants.WIDTH + constants.MARGIN.left + constants.MARGIN.right)
            .attr("height", constants.HEIGHT + constants.MARGIN.top + constants.MARGIN.bottom)
            .append("g")
            .attr("transform", "translate(" + constants.MARGIN.left + "," + constants.MARGIN.top + ")");

        //text labels
        svg.selectAll("text").data(this.state.data)
            .enter()
            .append("text")
            .text(function(d) {
                return d.Name;
            })
            .attr("x", function(d) {
                return d3Configs.xScale(d.behind);
            })
            .attr("y", function(d) {
                return d3Configs.yScale(d.Place);
            })
            .attr("transform", "translate(15,+4)");

        //create xAxis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + constants.HEIGHT + ")")
            .call(d3Configs.xAxis)
            .append("text")
            .attr("x", 300)
            .attr("y", 35)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text("Minutes Behind Fastest Time");

        //Create Y axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 0)")
            .call(d3Configs.yAxis)
            .append("text")
            .attr("x", 0)
            .attr("y", -35)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .text("Ranking");

        //Add title & subtitle to SvG element
        //Could also be done in HTML
        svg.append("text")
            .attr("x", (constants.WIDTH / 2))
            .attr("y", -constants.MARGIN.top / 2)
            .attr("text-anchor", "middle")
            .attr("class", "title")
            .text("Doping in Professional Bicycle Racing");

        svg.append("text")
            .attr("x", (constants.WIDTH / 2))
            .attr("y", -constants.MARGIN.top / 2 + 35)
            .attr("text-anchor", "middle")
            .attr("class", "subtitle")
            .text("35 Fastest times up Alpe d'Huez");

        svg.append("text")
            .attr("x", (constants.WIDTH / 2))
            .attr("y", -constants.MARGIN.top / 2 + 55)
            .attr("text-anchor", "middle")
            .attr("class", "asterix")
            .text("Normalized to 13.8km distance");


        //legend
        //circles with fill
        //gray circle
        svg.append("circle")
            .attr("cx", function(d) {
                return d3Configs.xScale(10);
            })
            .attr("cy", function(d) {
                return d3Configs.yScale(20);
            })
            .attr("r", 5)
            .attr("fill", "#333");

        svg.append("text")
            .attr("x", function(d) {
                return d3Configs.xScale(7);
            })
            .attr("y", function(d) {
                return d3Configs.yScale(20)+4;
            })
            .attr("text-anchor", "left")
            .attr("class", "legend")
            .text("No doping allegations");

        //red circle
        svg.append("circle")
            .attr("cx", function(d) {
                return d3Configs.xScale(10);
            })
            .attr("cy", function(d) {
                return d3Configs.yScale(23);
            })
            .attr("r", 5)
            .attr("fill", "#f44");

        svg.append("text")
            .attr("x", function(d) {
                return d3Configs.xScale(7);
            })
            .attr("y", function(d) {
                return d3Configs.yScale(23)+4;
            })
            .attr("text-anchor", "left")
            .attr("class", "legend")
            .text("Riders with doping allegations");

        // append data
        svg.selectAll("circle")
            .data(this.state.data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return d3Configs.xScale(d.behind);
            })
            .attr("cy", function(d) {
                return d3Configs.yScale(d.Place);
            })
            .attr("r", 5)
            .attr("fill", function(d) {
                if (d.Doping === "") {
                    return "#333";
                }
                return "#f44";
            })
            .attr("data-legend", function(d) {
                return d.legend;
            })
            .on("mouseover", function(d) {
                d3Configs.tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);

                d3Configs.tooltip.html(d3Configs.createToolTip(d))
                    .style("left", ( constants.WIDTH/2) + "px")
                    .style("top", (280) + "px");
            })
            .on("mouseout", function(d) {
                d3Configs.tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }

    //noinspection JSMethodCanBeStatic
    render(){
        this._startDrawing();
        //noinspection CheckTagEmptyBody
        return(
            <div id="container"></div>
        )
    }
    
}