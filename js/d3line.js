//Define the dimensions of the bar diagram
var width = 900;
var height = 450;

//create the bar graph svg
var svg = d3.select("#chart")
.append("svg")
.attr('width', width+60)
.attr('height', height+50)
.append("g")
.attr("transform", "translate(" + 40 + "," + 20 + ")");

//get data from csv
d3.csv("data/weekdays.csv", function(d) {
  //clean data
  d.count = +d.count;
  return d;
}, function(error, dataset) {
  //callback function is the data read is successful
  if (error) throw error;

  //define the axises' scale types and values
  var x = d3.scalePoint()
  .domain(dataset.map(function(d) { return d.label; }))
  .range([0, width])
  .padding(0.4)
  .align(0.5); //align left

  var y = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d.count;})])
  .rangeRound([height, 0]);

  //bind data to line
  var line = d3.line()
  .x(function(d) { return x(d.label); })
  .y(function(d) { return y(d.count); })

  //draw line
  svg.append("path")
  .datum(dataset)
  .attr("class", "line")
  .attr("d", line);

  //draw x-axis
  svg.append("g")
  .attr("class", "axis x-axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  //draw the y-axis
  svg.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y).ticks(null, "s"))
  //write the y-axis label
  .append("text")
  .attr("x", 10)
  .attr("y", y(y.ticks().pop()) + 0.5)
  .attr("dy", "0.32em") //dy is relative coordinates - while y is absolute
  .attr("class", "y-label")
  .text("Count");

  //draw the points
  svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("class", "points")
  .attr("cx", function(d) { return x(d.label); })
  .attr("cy", function(d) { return y(d.count); })
  .attr("r", 6);
});
