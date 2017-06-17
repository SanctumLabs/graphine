/**
 * @author lusinabrian on 17/06/17.
 * @notes: Configurations for D3
 */
import * as d3 from 'd3';
import * as constants from './constants';

export const formatTime = d3.timeFormat("%H:%M");

export const formatMinutes = function(d) {
        let t = new Date(2012, 0, 1, 0, d);
        t.setSeconds(t.getSeconds() + d);
        return formatTime(t);
    };

export function friendlySeconds(seconds) {
    return parseInt(seconds / 60) + ":" + seconds % 60;
}

export function createToolTip(d) {
    let tooltipHTML = "<span class = 'name'>" + d.Name + ": " + d.Nationality + "</span>";
    tooltipHTML += "<br/>Year: " + d.Year + ", Time: " + friendlySeconds(d.Seconds) + "<br/>";
    tooltipHTML += d.doping !== "" ?  "<br/>" + d.Doping :"<br/>No Doping Allegation";
    return tooltipHTML;
}

export const tooltip = d3.select("body").append("div").attr("class", "tooltip")
    .style("opacity", 0);

export const yScale = d3.scaleLinear().domain([1, 36]).range([0, constants.HEIGHT]);
export const xScale = d3.scaleLinear().domain([60 * 3.5, 0]).range([0, constants.WIDTH]);
export const yAxis = d3.axisLeft(yScale).ticks(8);
export const xAxis = d3.axisBottom(xScale).ticks(6).tickFormat(formatMinutes);
