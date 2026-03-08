
(function(){

const width = 600;
const height = 400;
const margin = {top:40,right:40,bottom:60,left:60}
const radius = Math.min(width,height)/2;;

const svgDonut = d3.select("#donut")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)
.style("width","100%")
.style("height","auto")
.append("g")
.attr("transform",`translate(${width/2},${height/2})`);

d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data=>{

data.forEach(d=>{
d.energy = +d["Mean(Labelled energy consumption (kWh/year))"];
});

const pie = d3.pie().value(d=>d.energy);

const arc = d3.arc()
.innerRadius(radius*0.5)
.outerRadius(radius);

const color = d3.scaleOrdinal(d3.schemeCategory10);

svgDonut.selectAll("path")
.data(pie(data))
.enter()
.append("path")
.attr("d",arc)
.attr("fill",d=>color(d.data.Screen_Tech));

});
})();