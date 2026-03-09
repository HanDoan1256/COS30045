(function(){

const width = 900;
const height = 420;
const margin = {top:60,right:40,bottom:80,left:90};

const svg = d3.select("#bar")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)
.style("width","100%")
.style("height","100%");

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

// axes
svg.append("g")
.attr("transform",`translate(0,${height-margin.bottom})`)
.call(d3.axisBottom(x));

svg.append("g")
.attr("transform",`translate(${margin.left},0)`)
.call(d3.axisLeft(y));

// bars
svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x",d=>x(d.Screen_Tech))
.attr("y",d=>y(d.energy))
.attr("width",x.bandwidth())
.attr("height",d=>height-margin.bottom-y(d.energy))
.attr("fill","#f28e2b");

// title
svg.append("text")
.attr("x",width/2)
.attr("y",30)
.attr("text-anchor","middle")
.attr("font-size","18px")
.attr("font-weight","bold")
.text("Energy Consumption for 55-inch TVs");

// x label
svg.append("text")
.attr("x",width/2)
.attr("y",height-20)
.attr("text-anchor","middle")
.text("Screen Technology");

// y label
svg.append("text")
.attr("transform","rotate(-90)")
.attr("x",-height/2)
.attr("y",25)
.attr("text-anchor","middle")
.text("Average Energy Consumption (kWh/year)");

});

})();
