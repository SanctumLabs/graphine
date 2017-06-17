import React from 'react';
import * as d3 from 'd3';

const tooltip = () => {

    let tool = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    return({tool})
};

export default tooltip;