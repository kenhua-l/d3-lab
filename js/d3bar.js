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

//choose color for each label
var color = d3.scaleOrdinal(d3.schemeCategory20b);

//get data from csv
d3.csv("data/weekdays.csv", function(d) {
  //clean data
  d.count = +d.count;
  return d;
}, function(error, dataset) {
  //callback function is the data read is successful
  if (error) throw error;

  //define the axes' scale types and values
  var x = d3.scaleBand()
  .domain(dataset.map(function(d) { return d.label; }))
  .rangeRound([0, width-50])
  .paddingInner(0.1);

  var y = d3.scaleLinear()
  .domain([0, d3.max(dataset,function(d){ return d.count;})]) //the max without the 50k rounds down to 400k. So, I hack it with a +50k
  .rangeRound([height, 0]);

  //draw the bars - draw svg rects
  svg.append("g")
  .selectAll("rect")
  .data(dataset) //repeated draw for each data
  .enter()
  .append("rect")
  //starting x value (bar's left) - its a translation
  .attr("transform", function(d) {
    var xOffset = x(d.label) + 20; //this x() method returns the magical pixel number to draw the rect
    return "translate(" + xOffset + ",0)";
  })
  //starting y value (bar's top)
  .attr("y", function(d) {
    return y(d.count); //this y() method returns the magical pixel number to draw the rect
  })
  //define width and height
  .attr("width", x.bandwidth()-40)
  .attr("height", function(d) {
    return height -  y(d.count);
  })
  //fill color according to label
  .attr("fill", function(d) {
    return color(d.label);
  });

  //draw the x-axis
  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  //draw the y-axis
  svg.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y).ticks(null, "s"))
  //write the y-axis label
  .append("text")
  .attr("x", 2)
  .attr("y", y(y.ticks().pop()) + 0.5)
  .attr("dy", "0.32em") //dy is relative coordinates - while y is absolute
  .attr("class", "y-label")
  .text("Count");

  //create legends - append the rect and text
  var legend = svg.append("g")
  .attr("class", "legend-font")
  .selectAll("g")
  .data(color.domain())
  .enter().append("g")
  .attr("transform", function(d, i) {
    return "translate(0," + i * 20 + ")";
  });

  legend.append("rect")
  .attr("x", width -19)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", color);

  legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9.5)
  .attr("dy", "0.32em")
  .text(function(d) {return d;});
});
