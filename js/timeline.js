let svg = d3.select("#artist_dot_plot");

var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var moma_data;
var met_data;
var dateOrderedList = [];
var dateList = [];
var display_name = "Picasso";

// insert method for retreiving name of input person

d3.json("../datasets/sample_data_moma.json").then( function(moma) {
    d3.json("../datasets/sample_data_met.json").then( function(met) {
        moma.forEach(element => {
            if (element.Name.includes(display_name)){
                dateList.push(parseInt(element.Date))
                dateOrderedList.push({key: element.Title, value: element.Date})
            };
        });
        met.forEach(element => {
            if (element.Artist.includes(display_name)){
                dateList.push(parseInt(element.Date))
                dateOrderedList.push({key: element.Title, value: element.Date})
            };
        });

        dateList = [1992, 1992, 1992, 1993, 1994, 1994, 1994, 1995];


        var difference = d3.max(dateList) - d3.min(dateList);
        console.log(dateList);

        var x= d3.scaleLinear()
            .range([0, width])
            .domain([d3.min(dateList) - 1, d3.max(dateList) + 1]); 

        var y = d3.scaleLinear()
            .range([0, width])
            .domain([0, 10]); 

        var x_axis = d3
            .axisBottom(x)
            .ticks(difference+1);

        svg.append("g").attr("class", "x_axis")
            .attr("transform", "translate(0," + height + ")")
            .call(x_axis);

        var data = d3.histogram()
            .domain(x.domain())
            .thresholds(difference)
            (dateList);
        console.log(data)
        
        var bar = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });
        
        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(data[0].x1) - x(data[0].x0) - 1) 
            .attr("height", function(d) {return height - y(d.length);})
            .attr("fill", "blue")
        
    });
});
