// Load the CSV file with a row conversion function
d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,       // convert to number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // convert to number
    star: +d.star                    // convert to number
}))
.then(data => {

    // check data loaded
    console.log("Loaded data:", data);

    // call visualization functions
    drawHistogram(data);
    populateFilters(data);
    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();
    
    

})
.catch(error => {
    console.error("Error loading the CSV file:", error);
});
