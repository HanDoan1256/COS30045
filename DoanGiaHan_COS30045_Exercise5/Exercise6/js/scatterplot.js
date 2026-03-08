function drawScatterplot(data){

const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", widthS + marginS.left + marginS.right)
    .attr("height", heightS + marginS.top + marginS.bottom);

innerChartS = svg.append("g")
    .attr("transform","translate("+marginS.left+","+marginS.top+")");

// X scale (Star rating)
xScaleS.domain([
    0,
    d3.max(data,d=>d.star)
]);

// Y scale (Energy consumption)
yScaleS.domain([
    0,
    d3.max(data,d=>d.energyConsumption)
]);

// draw circles
innerChartS.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d=>xScaleS(d.star))
    .attr("cy", d=>yScaleS(d.energyConsumption))
    .attr("r",4)
    .attr("fill", d=>colorScale(d.screenTech))
    .attr("opacity",0.5);


// ----- LEGEND -----

const legend = innerChartS.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (widthS - 120) + ", 20)");

const screenTypes = ["LED","LCD","OLED"];

legend.selectAll("rect")
    .data(screenTypes)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d,i) => i * 25)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", d => colorScale(d));

legend.selectAll("text")
    .data(screenTypes)
    .enter()
    .append("text")
    .attr("x", 25)
    .attr("y", (d,i) => i * 25 + 12)
    .text(d => d)
    .style("font-size", "12px")
    .attr("alignment-baseline","middle");

// x axis
innerChartS.append("g")
    .attr("transform","translate(0,"+heightS+")")
    .call(d3.axisBottom(xScaleS));

// y axis
innerChartS.append("g")
    .call(d3.axisLeft(yScaleS));

}