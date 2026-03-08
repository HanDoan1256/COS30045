(function(){

const width = 600;
const height = 400;
const margin = {top:40,right:40,bottom:60,left:60};

const svgScatter = d3.select("#scatter")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)
.style("width","100%")
.style("height","auto");

d3.csv("data/Ex5_TV_energy.csv").then(data => {

data.forEach(d=>{
    d.energy_consumpt = +d.energy_consumpt;
    d.star2 = +d.star2;
});

const x = d3.scaleLinear()
.domain(d3.extent(data,d=>d.star2))
.range([margin.left,width-margin.right]);

const y = d3.scaleLinear()
.domain(d3.extent(data,d=>d.energy_consumpt))
.range([height-margin.bottom,margin.top]);

svgScatter.append("g")
.attr("transform",`translate(0,${height-margin.bottom})`)
.call(d3.axisBottom(x));

svgScatter.append("g")
.attr("transform",`translate(${margin.left},0)`)
.call(d3.axisLeft(y));

svgScatter.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx",d=>x(d.star2))
.attr("cy",d=>y(d.energy_consumpt))
.attr("r",4)
.attr("fill","steelblue");

});

})();