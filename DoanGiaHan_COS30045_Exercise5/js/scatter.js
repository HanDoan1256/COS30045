(function(){

const width = 900;
const height = 420;
const margin = {top:60,right:40,bottom:70,left:80};

const svg = d3.select("#scatter")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)
.style("width","100%")
.style("height","100%");

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

// X axis
svg.append("g")
.attr("transform",`translate(0,${height-margin.bottom})`)
.call(d3.axisBottom(x));

// Y axis
svg.append("g")
.attr("transform",`translate(${margin.left},0)`)
.call(d3.axisLeft(y));

// points
svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx",d=>x(d.star2))
.attr("cy",d=>y(d.energy_consumpt))
.attr("r",4)
.attr("fill","#2c7fb8")
.attr("opacity",0.7);

// title
svg.append("text")
.attr("x",width/2)
.attr("y",30)
.attr("text-anchor","middle")
.attr("font-size","18px")
.attr("font-weight","bold")
.text("Energy Consumption vs Star Rating");

// x label
svg.append("text")
.attr("x",width/2)
.attr("y",height-15)
.attr("text-anchor","middle")
.text("Energy Star Rating");

// y label
svg.append("text")
.attr("transform","rotate(-90)")
.attr("x",-height/2)
.attr("y",20)
.attr("text-anchor","middle")
.text("Energy Consumption (kWh/year)");

});

})();
