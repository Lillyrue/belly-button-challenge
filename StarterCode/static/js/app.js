const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  console.log(data);
  let sampleValues = data.samples[0].sample_values;
  console.log(sampleValues);
  let otuIds = data.samples[0].otu_ids;
  console.log(otuIds);
  let otuLabels = data.samples[0].otu_labels;
  console.log(otuLabels);


// Graph the horizontal bar chart with dropdown menu
// Create an array of category labels
  let labels = Object.keys(data.otuIds);

// Display the plot
  function init() {
    let data = [{
      values: sampleValues,
      labels: labels,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    }];

    let layout = {
    height: 600,
    width: 800
    };

  Plotly.newPlot("bar", data, layout);
  }

// On change to the DOM, call getData()
  d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdown = d3.select('#dropdown')
    .selectAll('option')
    .data(topOtuIds)
    .enter()
    .append('option')
    .text(function(d) { return d; })
    .attr('value', function(d) { return d; });

    var svg = d3.select('#chart')
    .append('svg')
    .attr('width', 500)
    .attr('height', 300);

// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("bar", "values", [newdata]);
}

init();


// Create the bubble chart
  let trace2 = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIds
    }
  };

  let data = [trace2];

  var layout2 = {
    xaxis: {
        title: 'OTU IDs'
      },
    yaxis: {
      title: 'Sample Values'
      }
  };

  Plotly.newPlot('bubble', data, layout2);

// Create table with Metadata information
  let metadata = data.metadata[0];
  var table = d3.select('#metadata')
    .append('table')
    .attr('class', 'table');

  let tbody = table.append('tbody');

  Object.entries(metadata).forEach(function([key, value]) {
    var row = tbody.append('tr');
    var cell1 = row.append('td').text(key);
    var cell2 = row.append('td').text(value);
  });

  for (const [key, value] of Object.entries(metadata)) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${value}`;
    document.body.appendChild(p);
  }
});