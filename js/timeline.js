// reference for dot plot: https://bl.ocks.org/gcalmettes/95e3553da26ec90fd0a2890a678f3f69


let svg = d3.select("#artist_dot_plot");
var artist_selection = "";

const margin = {top: 12, right: 30, bottom: 30, left: 30},
      width = 800
      height = 600 - margin.top - margin.bottom;

var metPaintings = [];
var momaPaintings = [];
var csv = "datasets/cleandata.csv";

d3.csv(csv).then(function(data) {
    data.forEach(function(d) {
        d.Title = d.Title
        d.Year = parseInt(d.Year)
        d.Artist = d.Artist
        d.Museum = d.Museum;
        if (d.Museum === "Met"){
            metPaintings.push(d);
        }else if (d.Museum === "Moma"){
            momaPaintings.push(d);
        };
    });

    // const yearMin = d3.min(data, d => d.Year);
    const yearMin = 1200;
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
        .range([yearMin, yearMax - 50]); 

    // draw mini chart @ call update fuction for brushed chart
    drawChart(x_scale1, miniSvg, 3000, "", .2, data);

    d3.selectAll(".mini-chart").append("g")
        .attr("class", "brush")
        .call(d3.brushX().handleSize(50).on("brush", brushed));

    function brushed(){
        start_domain = brushScale(d3.brushSelection(this)[0]);
        end_domain = start_domain + 25;
        updateDotChart(start_domain, end_domain);
    };

    function updateDotChart(start, end) {
        d3.select(".dotElts").selectAll("*").remove();
        var x_scale2 = d3.scaleLinear()
            .range([0, width])
            .domain([start, end]); 
        drawChart(x_scale2, svg, 500, d3.format("d"), 4, data);
    }

    
    // draw chart based on scale values & svg elt
    // scale, svg elt, number of bins, format of ticks, circle radius, data set, class
    function drawChart (x, svg, nbins, format, radius_val, data){


// histogram use and adding circles in this section are adapted from: https://bl.ocks.org/gcalmettes/95e3553da26ec90fd0a2890a678f3f69

        const histogram = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(nbins))
            .value(function(d) { return d.Year;} )

        const bins = histogram(data);

        let binContainer = svg.selectAll(".gBin")
            .data(bins);

        var x_move;
        var move;
        var this_artist;
        var change;

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
                    museum: p.Museum,
                    radius: radius_val
                    }
                }))
            .enter()
            .append("circle")
                .attr("class", function(d){return d.museum})
                .attr("id", function(d){this_artist = "" + d.artist + ""; if(this_artist.includes(artist_selection)){return "personal_artist"}else{return "normal"}})
                .attr("cx", function(d){ if (d.idx % 4 != 0){x_move =d.idx%4; return d.radius * 2 * x_move};}) 
                .attr("cy", function(d) {move = d.idx / 4; if (d.idx%4 === 0){change = d.radius}else if(d.idx%4 === 1){change = d.radius * .5}else if(d.idx%4 === 2){change = 0}else if(d.idx%4 === 3){change = d.radius * -.5}; 
                    return - move * 2 * d.radius- change;})
                .attr("r", 0)
                .attr("r", function(d) {return (d.length==0) ? 0 : d.radius; })
            binContainerEnter.merge(binContainer)
                .attr("transform", d => `translate(${x(d.x0)}, ${height})`)
        
            svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickSize(0).tickFormat(format));
            
        }

    // on final quiz button press wait a few seconds and update 
        document.getElementById("nextButton").addEventListener("click", function(){
            setTimeout(function(){
                try {
                    let name = document.getElementById("artist_name").innerHTML;
                    artist_selection = name;
                    // console.log(name)
                    updateDotChart(1950, 1975); 
                  }
                  catch(error) {
                  }
            }, 500);
        });

});

