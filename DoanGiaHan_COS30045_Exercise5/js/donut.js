(function(){

const width = 600;
const height = 420;
const radius = 150;

const svg = d3.select("#donut")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)
.style("width","100%")
.style("height","100%")
.append("g")
.attr("transform","translate(250,220)");

d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data=>{

data.forEach(d=>{
d.energy = +d["Mean(Labelled energy consumption (kWh/year))"];
});

const color = d3.scaleOrdinal()
.domain(data.map(d=>d.Screen_Tech))
.range(d3.schemeCategory10);

const pie = d3.pie()
.value(d=>d.energy);

const arc = d3.arc()
.innerRadius(radius*0.5)
.outerRadius(radius);

// draw slices
svg.selectAll("path")
.data(pie(data))
.enter()
.append("path")
.attr("d",arc)
.attr("fill",d=>color(d.data.Screen_Tech));


// -------------------
// VALUE LABELS
// -------------------

const labelArc = d3.arc()
.innerRadius(radius*0.7)
.outerRadius(radius*0.7);

svg.selectAll("text.slice")
.data(pie(data))
.enter()
.append("text")
.attr("class","slice")
.attr("transform",d=>`translate(${labelArc.centroid(d)})`)
.attr("text-anchor","middle")
.style("font-size","12px")
.text(d => Math.round(d.data.energy) + " kWh");


// -------------------
// TITLE
// -------------------

d3.select("#donut svg")
.append("text")
.attr("x",width/2)
.attr("y",30)
.attr("text-anchor","middle")
.attr("font-size","18px")
.attr("font-weight","bold")
.text("Energy Consumption by Screen Technology");


// -------------------
// LEGEND (APPENDIX)
// -------------------

const legend = d3.select("#donut svg")
.append("g")
.attr("transform","translate(420,120)");

legend.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x",0)
.attr("y",(d,i)=> i*25)
.attr("width",15)
.attr("height",15)
.attr("fill",d=>color(d.Screen_Tech));

legend.selectAll("text")
.data(data)
.enter()
.append("text")
.attr("x",25)
.attr("y",(d,i)=> i*25 + 12)
.text(d=>`${d.Screen_Tech} (${d.energy} kWh)`)
.style("font-size","14px");

});

})();
