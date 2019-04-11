// CODE FOR BINNING AND GENERATING CIRCLES WAS ADAPTED FROM https://bl.ocks.org/gcalmettes/95e3553da26ec90fd0a2890a678f3f69


let svg = d3.select("#artist_dot_plot");

const margin = {top: 10, right: 30, bottom: 30, left: 30},
      width = 900
      height = 600 - margin.top - margin.bottom;

var allYears = [];
var dateOrderedList = [];
var dateList = [];
var display_name = "Picasso";
var csv = "../datasets/cleandata.csv";


d3.csv(csv).then( function(data) {
    data.forEach(function(d) {
        d.Title = d.Title
        d.Year = parseInt(d.Year)
        d.Artist = d.Artist
        d.Museum = d.Museum;
        // allYears.push(parseInt(d.Year));
    });

    // const yearMin = d3.min(data, d => d.Year);
    const yearMin = 1000;
    const yearMax = 2019;

    // brushed chart
    const svg = d3.select(".dot-chart").append("svg")
        .attr("class", "brushed-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("class", "dotElts")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const miniSvg = d3.select(".dot-chart").append("svg")
        .attr("class", "mini-chart")
        .attr("width", 900)
        .attr("height", 75)
        .append("g")
        .attr("transform", `translate(${margin.left}, -500)`);


    var x_scale1 = d3.scaleLinear()
        .range([0, width])
        .domain([yearMin, yearMax]); 

    // reverse scale for brushing 
    var brushScale = d3.scaleLinear()
        .domain([0, width])
        .range([yearMin, yearMax]); 

    // draw mini chart
    drawChart(x_scale1, miniSvg, 3000, "", .2);
    // drawChart(x_scale2, svg, 500, d3.format("d"), 3);
    // to start
    updateDotChart(1500, 1600);

    d3.selectAll(".mini-chart").append("g")
        .attr("class", "brush")
        .call(d3.brushX().handleSize(50).on("brush", brushed));

    function brushed(){
        start_domain = brushScale(d3.brushSelection(this)[0]);
        end_domain = start_domain + 100;
        console.log(start_domain);
        updateDotChart(start_domain, end_domain);
    };

    function updateDotChart(start, end) {
        d3.select(".dotElts").selectAll("*").remove();
        var x_scale2 = d3.scaleLinear()
            .range([0, width])
            .domain([start, end]); 

        drawChart(x_scale2, svg, 500, d3.format("d"), 3);
    }

    
    // draw chart based on scale values & svg elt
    function drawChart (x, svg, nbins, format, radius_val){

    // histogram use and adding circles adapted from: https://bl.ocks.org/gcalmettes/95e3553da26ec90fd0a2890a678f3f69

        const histogram = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(nbins))
            .value(function(d) { return d.Year;} )

        const bins = histogram(data);

        let binContainer = svg.selectAll(".gBin")
            .data(bins);

        let binContainerEnter = binContainer.enter()
            .append("g")
                .attr("class", "gBin")
                .attr("transform", d => `translate(${x(d.x0)}, ${height})`)

        binContainerEnter.selectAll("circle")
            .data(d => d.map((p, i) => {
                return {idx: i,
                    name: p.Title,
                    artist: p.Artist,
                    value: p.Value,
                    radius: radius_val
                    }
                }))
            .enter()
            .append("circle")
                .attr("class", "enter")
                .attr("cx", 0) 
                .attr("cy", function(d) {
                    return - d.idx * 2 * d.radius - d.radius; })
                .attr("r", 0)
                // .on("mouseover", tooltipOn)
                // .on("mouseout", tooltipOff)
                .attr("r", function(d) {
                return (d.length==0) ? 0 : d.radius; })
            binContainerEnter.merge(binContainer)
                .attr("transform", d => `translate(${x(d.x0)}, ${height})`)
        
            svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickSize(0).tickFormat(format));
        }

});















// d3.json("../datasets/sample_data_moma.json").then( function(moma) {
//     d3.json("../datasets/sample_data_met.json").then( function(met) {
//         moma.forEach(element => {
//             if (element.Name.includes(display_name)){
//                 dateList.push(parseInt(element.Date))
//                 dateOrderedList.push({key: element.Title, value: element.Date})
//             };
//         });
//         met.forEach(element => {
//             if (element.Artist.includes(display_name)){
//                 dateList.push(parseInt(element.Date))
//                 dateOrderedList.push({key: element.Title, value: element.Date})
//             };
//         });

//         dateList = [1992, 1992, 1992, 1993, 1994, 1994, 1994, 1995];


//         var difference = d3.max(dateList) - d3.min(dateList);
//         console.log(dateList);

//         var x= d3.scaleLinear()
//             .range([0, width])
//             .domain([d3.min(dateList) - 1, d3.max(dateList) + 1]); 

//         var y = d3.scaleLinear()
//             .range([0, width])
//             .domain([0, 10]); 

//         var x_axis = d3
//             .axisBottom(x)
//             .ticks(difference+1);

//         svg.append("g").attr("class", "x_axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(x_axis);

//         var data = d3.histogram()
//             .domain(x.domain())
//             .thresholds(difference)
//             (dateList);
//         console.log(data)
        
//         var bar = svg.selectAll(".bar")
//             .data(data)
//             .enter()
//             .append("g")
//             .attr("class", "bar")
//             .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });
        
//         bar.append("rect")
//             .attr("x", 1)
//             .attr("width", x(data[0].x1) - x(data[0].x0) - 1) 
//             .attr("height", function(d) {return height - y(d.length);})
//             .attr("fill", "blue")
        
//     });
// });
