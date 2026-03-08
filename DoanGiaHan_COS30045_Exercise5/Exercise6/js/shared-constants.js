const margin = {top:40, right:30, bottom:50, left:60};

const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const bodyBackgroundColor = "#ffffff";
const barColor = "#69b3a2";

const xScale = d3.scaleLinear().range([0,width]);
const yScale = d3.scaleLinear().range([height,0]);

const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(20);

const filters_screen = [
    {id:"all", label:"All", isActive:true},
    {id:"LED", label:"LED", isActive:false},
    {id:"LCD", label:"LCD", isActive:false},
    {id:"OLED", label:"OLED", isActive:false}
];

// scatterplot chart
const marginS = {top:40, right:30, bottom:50, left:60};

const widthS = 900 - marginS.left - marginS.right;
const heightS = 500 - marginS.top - marginS.bottom;

const xScaleS = d3.scaleLinear().range([0,widthS]);
const yScaleS = d3.scaleLinear().range([heightS,0]);

// colour scale for screen types
const colorScale = d3.scaleOrdinal()
    .domain(["LED","LCD","OLED"])
    .range(["#1f77b4","#ff7f0e","#2ca02c"]);

// tooltip size
const tooltipWidth = 120;
const tooltipHeight = 40;

let innerChartS;