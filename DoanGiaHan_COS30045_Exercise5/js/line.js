(function(){

const width = 900;
const height = 420;
const margin = {top:60,right:40,bottom:70,left:90};

const svg = d3.select("#line")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)
.style("width","100%")
.style("height","100%");

d3.csv("data/Ex5_ARE_Spot_Prices.csv").then(data=>{

data.forEach(d=>{
d.Year = +d.Year;
d.price = +d["Average Price (notTas-Snowy)"];
});

const x = d3.scaleLinear()
.domain(d3.extent(data,d=>d.Year))
.range([margin.left,width-margin.right]);

const y = d3.scaleLinear()
.domain([0,d3.max(data,d=>d.price)])
.range([height-margin.bottom,margin.top]);

// axes
svg.append("g")
.attr("transform",`translate(0,${height-margin.bottom})`)
.call(d3.axisBottom(x));

svg.append("g")
.attr("transform",`translate(${margin.left},0)`)
.call(d3.axisLeft(y));

// line
const line = d3.line()
.x(d=>x(d.Year))
.y(d=>y(d.price));

svg.append("path")
.datum(data)
.attr("fill","none")
.attr("stroke","#d62728")
.attr("stroke-width",2)
.attr("d",line);

// title
svg.append("text")
.attr("x",width/2)
.attr("y",30)
.attr("text-anchor","middle")
.attr("font-size","18px")
.attr("font-weight","bold")
.text("Electricity Spot Price Trend (1998–2024)");

// labels
svg.append("text")
.attr("x",width/2)
.attr("y",height-15)
.attr("text-anchor","middle")
.text("Year");

svg.append("text")
.attr("transform","rotate(-90)")
.attr("x",-height/2)
.attr("y",25)
.attr("text-anchor","middle")
.text("Electricity Price");

});

})();
