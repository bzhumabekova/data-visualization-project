async function getHistogram(tempAccessor) {
    //clean Histogram
    const parent = d3.select("#wrapper")
    parent.selectAll('*').remove()
    // get dataset
    const dataset = await d3.json("./my_weather_data.json")
    const yAccessor = d => d.length;
    const width = 1000
    //add dimensions with height and width
    let dimensions = {
        width: width,
        height: width * 0.5,
        margin: {
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
        },
    }
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
    const wrapper = parent.append("svg").attr("width", dimensions.width).attr("height", dimensions.height);
    //add bounds
    const bounds = wrapper.append("g")
    bounds.style("translate", `translate(${dimensions.margin.left}+px,${dimensions.margin.top}px)`);
    // get x from dataset
    const xScaler = d3.scaleLinear()
        .domain(d3.extent(dataset, tempAccessor))
        .range([75, dimensions.boundedWidth])
    const d3_bins_gen = d3.bin().domain(xScaler.domain()).value(tempAccessor).thresholds(10);
    const d3_bins = d3_bins_gen(dataset);
    // get y from dataset
    const yScaler = d3.scaleLinear()
        .domain([0, d3.max(d3_bins, yAccessor)])
        .range([dimensions.boundedHeight, 20])
    const binGroup = bounds.append("g");
    const binGroups = binGroup.selectAll("g").data(d3_bins).enter().append("g");
    //add blocks of histogram
    const hist = binGroups.append("rect")
        .attr("x", d => xScaler(d.x0) + 1 / 2)
        .attr("y", d => yScaler(yAccessor(d)))
        .attr("fill", "#ADD8E6")
        .attr("width", d => d3.max([0, xScaler(d.x1) - xScaler(d.x0) - 1]))
        .attr("height", d => dimensions.boundedHeight - yScaler(yAccessor(d)))
        ;
    const x_axis_gen = d3.axisBottom().scale(xScaler);
    // add x
    const x_axis = bounds.append("g").style("transform", `translateY(${dimensions.boundedHeight}px)`).call(x_axis_gen);
    const count = binGroups.filter(yAccessor)
        .append("text")
        .attr("x", d => xScaler(d.x0) + (xScaler(d.x1) - xScaler(d.x0)) / 2)
        .attr("y", d => yScaler(yAccessor(d)) - 5)
        .text(yAccessor);
    var y = d3.scaleLinear().domain([0, d3.max(d3_bins, function (d) {return d.length;})]).range([dimensions.boundedHeight, 20])
    // add y
    bounds.append("g")
        .attr("transform", "translate(" + 75 + "," + 0 + ")")
        .call(d3.axisLeft(y));
    //add text Count
    bounds.append('text')
        .attr("y", 30)
        .attr("x", -250)
        .attr("transform", "rotate(-90)")
        .text("Count")
    //add text Temperature
    bounds.append('text')
        .attr("x", 500)
        .attr("y", 500)
        .text("Temperature")
}
const getMax = d => d.temperatureMax;
const getMin = d => d.temperatureMin;
const getLow = d => d.temperatureLow;
const getHigh = d => d.temperatureHigh;
getHistogram(getMax)
