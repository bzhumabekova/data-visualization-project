dimensions = {
  width: window.innerWidth * 0.30,
  height: window.innerWidth * 0.30,
  margin: {top: 30, left: 30, bottom: 30, right: 30}
}

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

wrapper = d3.select("#wrapper").append("svg");
wrapper.attr("width", dimensions.width);
wrapper.attr("height", dimensions.height);
container = wrapper.append("g");
container.attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

function scatterPlot(){
  //clean display
  wrapper.remove()
  container.remove()

  // add svg
  wrapper = d3.select("#wrapper").append("svg");
  wrapper.attr("width", dimensions.width);
  wrapper.attr("height", dimensions.height);
  container = wrapper.append("g");
  container.attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);


  //create random position
  var pointX = d3.range(100).map(() => ({"x": Math.random() * 10, "y": Math.random() * 10}));
  var pointY = d3.range(100).map(() => ({"x": Math.random() * 10, "y": Math.random() * 10}));

  const xAcc = d => d.x;
  const yAcc = d => d.y;

   point = d3.merge([pointX, pointY])

   // add lines
   xScale = d3.scaleLinear().domain(d3.extent(point, xAcc)).range([dimensions.margin.left, dimensions.boundedWidth]);
   yScale = d3.scaleLinear().domain(d3.extent(point, yAcc)).range([ dimensions.boundedHeight,dimensions.margin.top]);

   // draw figure #1
    circle = container.selectAll("circle")
      .data(pointX)
      .enter()
      .append("path")
      .attr("class", "circle")
      .attr("cx", d => xScale(xAcc(d)))
      .attr("cy", d => yScale(yAcc(d)))
      .attr("fill", "#FFFFFF")
      .attr("stroke", "#000000")
      .attr("d", d3.symbol().type(d3.symbolCircle))
      .attr("transform", function (d) {
        return "translate(" + xScale(xAcc(d)) + "," + yScale(yAcc(d)) + ")";
      });

   // draw figure #2
    rhombus = container.selectAll("rhombus")
      .data(pointY)
      .enter()
      .append("path")
      .attr("class", "rhombus")
      .attr("cx", d => xScale(xAcc(d)))
      .attr("cy", d => yScale(yAcc(d)))
      .attr("fill", "#FFFFFF")
      .attr("stroke", "#000000")
      .attr("d", d3.symbol().type(d3.symbolDiamond))
      .attr("transform", function (d) {
        return "translate(" + xScale(xAcc(d)) + "," + yScale(yAcc(d)) + ")";
      });

  x_axis_gen = d3.axisBottom().scale(xScale);
  y_axis_gen = d3.axisLeft().scale(yScale);

  const axisX = container.append("g").call(x_axis_gen).style("transform", `translateY(${dimensions.boundedHeight}px)`)
  const axisy = container.append("g").call(y_axis_gen).style("transform", `translateX(${dimensions.margin.left}px)`)

  // Scatter Plot text
  container.append('text')
      .attr('x', dimensions.boundedWidth / 2)
      .attr('y', 0)
      .style('font-size', 20)
      .text('Scatter Plot');
  // X text
  container.append('text').attr('x', dimensions.boundedWidth + 10).attr('y', dimensions.boundedHeight).text('X');
  // Y text
  container.append('text').attr('transform', 'translate(0, 20)').text('Y');
}
 function clearButton(){
   //clean display
   wrapper.remove()
   container.remove()

   // add svg
   wrapper = d3.select("#wrapper").append("svg");
   wrapper.attr("width", dimensions.width);
   wrapper.attr("height", dimensions.height);
   container = wrapper.append("g");
   container.attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

   // add lines
   xScale = d3.scaleLinear().domain([0, 10]).range([dimensions.margin.left, dimensions.boundedWidth]);
   yScale = d3.scaleLinear().domain([0, 10]).range([dimensions.boundedHeight, dimensions.margin.top ]);

   x_axis_gen = d3.axisBottom().scale(xScale);
   y_axis_gen = d3.axisLeft().scale(yScale);

   const axisX = container.append("g").call(x_axis_gen).style("transform", `translateY(${dimensions.boundedHeight}px)`)
   const axisy = container.append("g").call(y_axis_gen).style("transform", `translateX(${dimensions.margin.left}px)`)

   // Scatter Plot text
   container.append('text')
       .attr('x', dimensions.boundedWidth / 2)
       .attr('y', 0)
       .style('font-size', 20)
       .text('Scatter Plot');
   // X text
   container.append('text')
       .attr('x', dimensions.boundedWidth + 10)
       .attr('y', dimensions.boundedHeight)
       .text('X');
   // Y text
   container.append('text')
       .attr('transform', 'translate(0, 20)')
       .text('Y');
 }
clearButton()