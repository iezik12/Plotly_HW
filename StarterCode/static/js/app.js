// Function to pull names from json file and add them in the filter



function buildDashboard(name) {
d3.json("StarterCode/data/samples.json").then(function(data) {
    
    //Populate dropdown with names
    populateDropdown(data["names"]);
    if (name === undefined)  
    {
        name = data.names[0];
        console.log(name)
    }
    var filterdSamples = data.samples.filter(sample => sample.id == name)[0]
    var filterdMetadata = data.metadata.filter(md => md.id == name)[0]
    //Populate the page with the first value
    x_data = filterdSamples["otu_ids"];
    y_data = filterdSamples["sample_values"];
    hoverText = filterdSamples["otu_labels"];
    metadata = filterdMetadata;

    //Draw the chart on load
    drawChart(x_data, y_data, hoverText, metadata);
    

});
}


function populateDropdown(names) {
    
    var selectTag = d3.select("#selDataset");
    var options = selectTag.selectAll('option').data(names);
    
    options.enter()
    .append('option')
    .attr('value', function(d) {
        return d;
    })
    .text(function(d) {
        return d;
    });
    
};


function drawChart(x_data, y_data, hoverText, metadata) {


    var metadata_panel = d3.select("#sample-metadata");
    metadata_panel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        metadata_panel.append("p").text(`${key}: ${value}`);
    });
  
    var trace = {
        x: x_data,
        y: y_data,
        text: hoverText,
        type: 'bar',
        orientation: 'h'
    };
  
    var data = [trace];
  
    Plotly.newPlot('bar', data);
  
    var trace2 = {
        x: x_data,
        y: y_data,
        text: hoverText,
        mode: 'markers',
        marker: {
            size: y_data,
            color: x_data
        }
    };
  
    var data2 = [trace2];
  
    Plotly.newPlot('bubble', data2);
  
  
  };

  
  
  d3.select("#selDataset").on("change",handleChange);

  function handleChange() {
      var selectedValue = d3.select("#selDataset").property("value") 
  
      buildDashboard(selectedValue)
  }
  
  buildDashboard()