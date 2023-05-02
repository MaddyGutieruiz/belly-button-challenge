// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });
  
  // dashboard 
  function init() {
  
      // using D3 to create the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
  
      // using D3 to populate the dropdown menu
      d3.json(url).then((data) => {
          
          let names = data.names;

          names.forEach((id) => {
  
              // adding value of id for each iteration of the loop
              console.log(id);
  
              dropdownMenu.append("option")
              .text(id)
              .property("value",id);
          });
  
          // adding the first sample from the list
          let sample_one = names[0];
  
          // sample_one values
          console.log(sample_one);
  
          // adding in plots
          buildGaugeChart(sample_one);
      });
  };
  
  // Function that builds the gauge chart
  function buildGaugeChart(sample) {
  
      // Use D3 to get the data
      d3.json(url).then((data) => {
  
          // getting the metadata
          let metadata = data.metadata;
  
          // Filter based on sample vslur
          let value = metadata.filter(result => result.id == sample);
            // addign an array
          console.log(value)
          let valueData = value[0];
  
          //adding location of objects to page
          let washFrequency = Object.values(valueData)[6];
          
          // Setting up the gauge chart, code sampled from https://plotly.com/javascript/gauge-charts/
          let trace2 = {
              value: washFrequency,
              domain: {x: [0,1], y: [0,1]},
              title: {
                  text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                  font: {color: "black", size: 16}
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                  axis: {range: [0,10], tickmode: "linear", tick0: 1, dtick: 1},
                  
                  steps: [
                      {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                      {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                      {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                      {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                      {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                      {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                      {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                      {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                      {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                      {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
                  ]
              } 
          };
  
          // Set up the Layout
          let layout = {
              width: 400, 
              height: 400,
              margin: {t: 0, b:0}
          };
  
          // Call Plotly to plot the gauge chart
          Plotly.newPlot("gauge", [trace2], layout)
      });
  };
  
  // Call the initialize function
  init();