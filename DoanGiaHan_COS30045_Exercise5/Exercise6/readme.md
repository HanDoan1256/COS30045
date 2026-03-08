Visualisations
1. Histogram

The histogram displays the frequency distribution of TV energy consumption.

Features

Binned energy consumption values

Interactive filter buttons for screen technology

Dynamic updates when filters are applied

Filters include:

All

LED

LCD

OLED

Selecting a filter updates the histogram to display only the selected screen type.

2. Scatterplot

The scatterplot visualises the relationship between Energy Consumption and Star Rating.

Axes

X-axis: Star Rating

Y-axis: Energy Consumption

Additional Features

Colour Encoding

Different screen technologies are represented using colours:

Screen Type	Colour
LED	Blue
LCD	Orange
OLED	Green

A legend is displayed to help users interpret the colours.

Tooltip Interaction

When hovering over a data point, a tooltip displays:

Screen Size (in inches)

This allows users to explore additional details about each TV model.

File Structure
project-folder
│
├── index.html
│
├── css
│   ├── base.css
│   └── visualisations.css
│
├── js
│   ├── shared-constants.js
│   ├── histogram.js
│   ├── scatterplot.js
│   ├── interactions.js
│   └── load-data.js
│
└── data
    └── Ex6_TVdata.csv


AI Use Declaration

Artificial Intelligence tools were used during the development of this assignment.

Generative AI (ChatGPT) was used to assist with:

Understanding D3.js concepts

Debugging JavaScript errors

Generating example code structures

Improving documentation and explanations

All generated code was reviewed, tested, and modified by the student to ensure it met the assignment requirements and functioned correctly within the project.

I am still responsible for the final implementation, integration, and understanding of all submitted code.


Doan Gia Han
COS30045 – Data Visualisation
Swinburne University of Technology Vietnam