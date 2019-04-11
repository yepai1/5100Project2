// CODE FOR BINNING AND GENERATING CIRCLES WAS ADAPTED FROM https://bl.ocks.org/gcalmettes/95e3553da26ec90fd0a2890a678f3f69
let svg = d3.select("#artist_dot_plot");

const margin = {top: 10, right: 30, bottom: 30, left: 30},
      width = 5000
      height = 700 - margin.top - margin.bottom;

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

    const yearMin = d3.min(data, d => d.Year);
    const yearMax = 2019;
    var nbins = 500;

    const svg = d3.select(".dot-chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

    var x=d3.scaleLinear()
        .range([0, width])
        .domain([yearMin, yearMax]); 

    let shuffledata = d3.shuffle(data)
        .slice(0, 15000);

    const histogram = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(nbins))
        .value(function(d) { return d.Year;} )

    const bins = histogram(shuffledata);

    console.log(bins);

    let binContainer = svg.selectAll(".gBin")
        .data(bins);

    let binContainerEnter = binContainer.enter()
        .append("g")
            .attr("class", "gBin")
            .attr("transform", d => `translate(${x(d.x0)}, ${height})`)

    //need to populate the bin containers with data the first time
    binContainerEnter.selectAll("circle")
        .data(d => d.map((p, i) => {
          return {idx: i,
                  name: p.Title,
                  artist: p.Artist,
                  value: p.Value,
                  radius: (x(d.x1)-x(d.x0))/2
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
    
        //enter/update/exit for circles, inside each container
        // let dots = binContainer.selectAll("circle")
        //     .data(d => d.map((p, i) => {
        //     return {idx: i,
        //             name: p.Name,
        //             value: p.Value,
        //             radius: (x(d.x1)-x(d.x0))/2
        //             }
        //     }))
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

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
