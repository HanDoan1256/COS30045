// interactions.js
// Creates filter buttons and updates histogram when clicked

function populateFilters(data){

    const filterDiv = d3.select("#filters");

    filterDiv.selectAll("button")
        .data(filters_screen)
        .enter()
        .append("button")
        .text(d => d.label)
        .attr("class", d => d.isActive ? "active" : "")
        .on("click", function(event, d){

            // reset all buttons
            filters_screen.forEach(f => f.isActive = false);

            // activate clicked button
            d.isActive = true;

            // update button styles
            filterDiv.selectAll("button")
                .classed("active", f => f.isActive);

            // update histogram
            updateHistogram(d.id, data);
        });

}


// update histogram after filtering
function updateHistogram(filterID, data){

let filteredData;

// filter dataset
if(filterID === "all"){
    filteredData = data;
}
else{
    filteredData = data.filter(d => d.screenTech === filterID);
}

// recompute bins
const bins = binGenerator(filteredData);

// update scale domains
xScale.domain([
    d3.min(bins, d => d.x0),
    d3.max(bins, d => d.x1)
]);

yScale.domain([
    0,
    d3.max(bins, d => d.length)
]);

const svg = d3.select("#histogram svg g");

// ----- UPDATE BARS -----

const bars = svg.selectAll("rect")
    .data(bins);

bars.enter()
    .append("rect")
    .merge(bars)
    .transition()
    .duration(600)
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
    .attr("height", d => height - yScale(d.length))
    .attr("fill", barColor);

bars.exit().remove();

// ----- UPDATE AXES -----

svg.select(".x-axis")
    .transition()
    .duration(600)
    .call(d3.axisBottom(xScale));

svg.select(".y-axis")
    .transition()
    .duration(600)
    .call(d3.axisLeft(yScale));

}

let tooltip;

function createTooltip(){

tooltip = innerChartS.append("g")
    .attr("class","tooltip")
    .style("opacity",0);

tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx",6)
    .attr("ry",6)
    .attr("fill","#69b3a2")
    .attr("opacity",0.8);

tooltip.append("text")
    .attr("x",10)
    .attr("y",20)
    .attr("fill","white");

}

function handleMouseEvents(){

d3.selectAll("#scatterplot circle")

.on("mouseenter",(e,d)=>{

    tooltip.select("text")
        .text("Size: "+d.screenSize+" inch");

    tooltip
        .attr("transform",
            "translate("+
            (e.target.getAttribute("cx"))+
            ","+
            (e.target.getAttribute("cy")-30)+
            ")"
        )
        .transition()
        .duration(200)
        .style("opacity",1);

})

.on("mouseleave",()=>{

    tooltip
        .transition()
        .duration(200)
        .style("opacity",0);

});

}
