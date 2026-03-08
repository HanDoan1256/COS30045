window.onload = function () {

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");


const CreateBarChart = (data) => {

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.BrandCount)])
    .range([0, 900]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Brand))
    .range([30, 800])
    .padding(0.5);

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", d => `translate(0, ${yScale(d.Brand)})`);

  // Bars
  barAndLabel
    .append("rect")
    .attr("x", 150)
    .attr("width", d => xScale(d.BrandCount))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

  // Labels
  barAndLabel
    .append("text")
    .attr("x", 140)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .style("font-size", "12px")
    .attr("text-anchor", "end")
    .text(d => d.Brand);

  barAndLabel
    .append("text")
    .text(d => d.BrandCount)
    .attr("x", d => 150 + xScale(d.BrandCount) + 4)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .style("font-family", "sans-serif")
    .style("font-size", "11px");

};



d3.csv("data/tvdata.csv", d => ({
  Brand: d.Brand,
  BrandCount: +d.BrandCount
})).then(data => {

  console.log(data);

  CreateBarChart(data);

});

}