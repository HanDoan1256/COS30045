(function(){

const width = 600;
const height = 400;
const margin = {top:40,right:40,bottom:60,left:60};

const widthBar = 600;
const heightBar = 400;
const marginBar = {top:40,right:40,bottom:60,left:80};

const svgBar = d3.select("#bar")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)
.style("width","100%")
.style("height","auto");

d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data=>{

data.forEach(d=>{
d.energy = +d["Mean(Labelled energy consumption (kWh/year))"];
});

const x = d3.scaleBand()
.domain(data.map(d=>d.Screen_Tech))
.range([margin.left,width-margin.right])
.padding(0.3);

const y = d3.scaleLinear()
.domain([0,d3.max(data,d=>d.energy)])
.range([height-margin.bottom,margin.top]);

svgBar.append("g")
.attr("transform",`translate(0,${height-margin.bottom})`)
.call(d3.axisBottom(x));

svgBar.append("g")
.attr("transform",`translate(${margin.left},0)`)
.call(d3.axisLeft(y));

svgBar.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x",d=>x(d.Screen_Tech))
.attr("y",d=>y(d.energy))
.attr("width",x.bandwidth())
.attr("height",d=>height-margin.bottom-y(d.energy))
.attr("fill","orange");

});
})();