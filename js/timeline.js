let svg = d3.select("#artist_dot_plot");

var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 550 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

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
        
        max = dateList.max();
        min = dateList.min();

        var x_scale = d3.scaleLinear()
            .range([0, width])
            .domain([min, max]); 




        
    });
});
