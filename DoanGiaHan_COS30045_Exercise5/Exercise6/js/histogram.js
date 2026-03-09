function drawHistogram(data){

const svg = d3.select("#histogram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate("+margin.left+","+margin.top+")");

svg.append("text")
    .attr("x", width/2)
    .attr("y", -10)
    .attr("text-anchor","end")
    .style("font-size","13px")
    .text("Labeled Energy Consumption (kWh/year)");

const bins = binGenerator(data);

xScale.domain([
    d3.min(bins, d=>d.x0),
    d3.max(bins, d=>d.x1)
]);

yScale.domain([
    0,
    d3.max(bins, d=>d.length)
]);

svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", d=>xScale(d.x0))
    .attr("y", d=>yScale(d.length))
    .attr("width", d=>xScale(d.x1)-xScale(d.x0)-1)
    .attr("height", d=>height - yScale(d.length))
    .attr("fill", barColor);

svg.append("g")
    .attr("class","x-axis")
    .attr("transform","translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class","y-axis")
    .call(d3.axisLeft(yScale));

}

