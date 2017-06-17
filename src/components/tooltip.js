import React from 'react';
import * as d3tip from 'd3-tip';
import * as d3 from 'd3';

const tooltip = () => {
    let tip = d3tip.tip()
        .attr('class', 'd3-tip')
        .html(function(d) {
            let tooltipHTML = "<span class = 'name'>" + d.Name + "</span><br/>" + d.Year + "<br/>" + d.Nationality;
            tooltipHTML += d.doping !== "" ?  "<br/>" + d.Doping : "<br/>No doping allegations";
            return tooltipHTML;
        });

    let tool = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    return({tool})
};
