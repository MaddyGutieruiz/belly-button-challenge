// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
//const url = "C://Users/castr/OneDrive/Desktop/UCD_DataBootcamp/Challenge_Assignments/Module14_challenge/Starter_Code/StarterCode/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Dashboard
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Using D3 to create sample and populate drowpdown menu
    d3.json(url).then((data) => {
        
        // sample
        let names = data.names;

        names.forEach((id) => {

            // creating loop to fill output from dropdown menu
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Setting sample_one
        let sample_one = names[0];

        console.log(sample_one);

        // Building plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);

    });
};

// populating the metadata
function buildMetadata(sample) {

    // Use D3 to retrieve metadata
    d3.json(url).then((data) => {

        let metadata = data.metadata;

        // Filtering based on sample
        let value = metadata.filter(result => result.id == sample);

        // creating an array for filter
        console.log(value)

        let valueData = value[0];

        // Clearing out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Bar Chart
function buildBarChart(sample) {

    // using D3 to retrieve the data
    d3.json(url).then((data) => {

        // retrieving sample data so we can populate the other data
        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        // adding array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // adding items to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Bubble chart
function buildBubbleChart(sample) {

    // Using D3 to retrieve the data
    d3.json(url).then((data) => {
        
        // Adding sample data
        let sampleInfo = data.samples;

        // Filtering data
        let value = sampleInfo.filter(result => result.id == sample);

        // adding in array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Setting up the bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initialize function
init();

