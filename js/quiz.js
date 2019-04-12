// for passing data to the timeline
name = "none"
d3.select(".dot-chart")
    .attr("id", name + "")
    .style("visibility", "hidden");



// This is a list for keeping track of how many options are added for current question
var optionIndexList = [];
// This is a list keeping track of how many questions are added
var questionList = [];
// Current question #
var currentQuestion = 0;
// current option chosen
var currentOption = "";
// list of answers
var answers = [];
// final result
var resultArtist = "";
// total question count
var totalQuestions = 5;
// Image displayed per question
var paintingPerPage = 5;
// all artworks
var artgenre;
// all artists
var genreArtist;
// all genres
var genres=["Cubism", "Expressionism", "Post-Impressionism", "Abstract impressionism", "Surrealism", "Social Realism", "Mannerism", "High Renaissance", "Pop Art", "Neoplasticism"];
// scroll flag
var scrolledFlag = false;
// genre Queue
var genreQueue = new Set();
var genreQueueDict = {};

// THE OLD SCALES BELOW are repalced by d3 scales, but are keeped for debugging
var fontSizeList = ["10px", "18px", "25px", "30px", "35px", "40px", "43px", "45px", "47px", "49px", "50px", "51px", "52px", "53px", "54px"];
var fontColorList = ["#321911",  "#59530D",  "#7F8C09", "#7F8C09", "#A6C604", "#A6C604", "#CCFF00", "#CCFF00", "#CCFF00", "#DDFF33", "#DDFF33", "#DDFF33", "#EDFF55", "#EDFF55", "#EDFF55", "#EDFF55"];
//NEW SCALES
var fontSizeScale = d3.scaleLinear()
                      .range(7, 37)
                      .domain(0, 10);
var fontColorScale = d3.scaleLinear()
                      .range(d3.color("#321911"), d3.color("#EDFF55"))
                      .domain(0, 10);

//add a option for a question
function addOptionButton(index, text, answer)
{
  //add a index button to index div (circle with letter)
  var indexBtn = document.createElement("button");
  indexBtn.innerHTML = index;
  indexBtn.dataset.index = index;
  indexBtn.dataset.answer = answer;
  indexBtn.className = "optionButtonIndex";
  indexBtn.setAttribute("id", index + "Index");
  indexBtn.setAttribute("onclick", "optionClicked(this.dataset.index, this.dataset.answer)");
  document.getElementById("content").appendChild(indexBtn);

  //add a content button to content div (the text)
  var contentBtn = document.createElement("button");
  contentBtn.innerHTML = text;
  contentBtn.dataset.index = index;
  contentBtn.dataset.answer = answer;
  contentBtn.className = "optionButtonContent";
  contentBtn.setAttribute("id", index + "Content");
  contentBtn.setAttribute("onclick", "optionClicked(this.dataset.index, this.dataset.answer)");
  document.getElementById("content").appendChild(contentBtn);

  //add a line break
  document.getElementById("content").appendChild(document.createElement("br"));
  //add this option index to the list
  optionIndexList.push(index);
}

//add a option for the question (picture instead of text)
function addPictureButton(index, picturePath, genre)
{
  //add a index button to index div (circle with letter)
  var indexBtn = document.createElement("button");
  indexBtn.innerHTML = index;
  indexBtn.dataset.index = index;
  indexBtn.dataset.genre = genre;
  indexBtn.className = "optionButtonIndex";
  indexBtn.setAttribute("id", index + "Index");
  indexBtn.setAttribute("onclick", "optionClicked(this.dataset.index, this.dataset.genre)");
  document.getElementById("index").appendChild(indexBtn);

  //add a content button to content div(the image)
  var contentBtn = document.createElement("input");
  contentBtn.dataset.index = index;
  contentBtn.dataset.genre = genre;
  contentBtn.className = "optionButtonPicture";
  contentBtn.setAttribute("type", "image");
  contentBtn.setAttribute("src", picturePath);
  contentBtn.setAttribute("id", index + "Content");
  contentBtn.setAttribute("onclick", "optionClicked(this.dataset.index, this.dataset.genre)");
  contentBtn.setAttribute("align", "center");
  document.getElementById("content").appendChild(contentBtn);

  //add this option index to the list
  optionIndexList.push(index);
}

//present a question (with options)
function showQuestion(question)
{
  // default way of presenting index
  var defaultIndex = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

  //update the titles
  document.getElementById("title").innerHTML = question.title;
  document.getElementById("subtitle").innerHTML = question.subtitle;

  //add each option
  question.options.forEach(function(item, index)
  {
    if(item.statement.substring(0, 7) === "PICTURE")
    {
      addPictureButton(defaultIndex[index], item.statement.replace("PICTURE",""), item.genre);
    }
    else
    {
      addOptionButton(defaultIndex[index], item.statement, item.answer);
    }
  });
  // first question, reset te page
  if(currentQuestion == 0)
  {
    window.scrollBy(0, -100);
  }
}

// an option is clicked
function optionClicked(optionIndex, optionAnswer)
{
  currentOption = optionAnswer;
  //auto scroll
  if(!scrolledFlag)
  {
    window.scrollBy(0, 70);
    scrolledFlag = true;
  }
  //reset all options' visuals
  optionIndexList.forEach(function (item, index) {
    document.getElementById(item + "Index").style.color = "#ffffff";
    document.getElementById(item + "Index").style.backgroundColor = "#5d4037";
    document.getElementById(item + "Content").style.color = "#ffffff";
    document.getElementById(item + "Content").style.backgroundColor = "#5d4037";
    document.getElementById(item + "Index").style.backgroundImage = "";
  });

  //update the clicked option's visuals
  document.getElementById(optionIndex + "Index").style.color = "#000000";
  document.getElementById(optionIndex + "Index").style.backgroundColor = "#a0af22";
  document.getElementById(optionIndex + "Index").style.backgroundImage = "linear-gradient(#a0af22, #d3d831)";
  document.getElementById(optionIndex + "Content").style.color = "#000000";
  document.getElementById(optionIndex + "Content").style.backgroundColor = "#a0af22";

  //enable and highlight next button
  document.getElementById("nextButton").setAttribute("class", "nextButton");
  document.getElementById("nextButton").disabled = false;

}

function nextQuestion()
{
  //add to current list
  window.scrollBy(0, -150);
  answers.push(currentOption);
  scrolledFlag = false;
  //add to genre Queue or change display font size
  if(currentQuestion == 0)
  {
    document.getElementById("genreQueue").style.display = "flex";
    document.getElementById("hint").innerHTML = "It seems that you like:";
  }
  if(genreQueue.has(currentOption))
  {
      genreQueueDict[currentOption] += (Math.floor(Math.random()*2) + 2);
  }
  else
  {
    // new block
      genreQueue.add(currentOption);
      genreQueueDict[currentOption] = 1;
      genreBlock = document.createElement("p");
      genreBlock.className = "genreBlock";
      genreBlock.innerHTML = currentOption;
      genreBlock.setAttribute("id", currentOption + "Block");
      document.getElementById("genreQueue").appendChild(genreBlock);
  }
  document.getElementById(currentOption + "Block").style.color = fontColorList[genreQueueDict[currentOption]];
  document.getElementById(currentOption + "Block").style.fontSize = fontSizeList[genreQueueDict[currentOption]];

  for(var rep = 1; rep <2; rep++)
  {
    var temp = genres[Math.floor(Math.random()*10)];
    //temp use for aesthics
    if(genreQueue.has(temp))
    {
        genreQueueDict[temp] += 1;
    }
    else
    {
        genreQueue.add(temp);
        genreQueueDict[temp] = 0;
        genreBlock = document.createElement("p");
        genreBlock.className = "genreBlock";
        genreBlock.innerHTML = temp;
        genreBlock.setAttribute("id", temp + "Block");
        document.getElementById("genreQueue").appendChild(genreBlock);
    }
    document.getElementById(temp + "Block").style.color = fontColorList[genreQueueDict[temp]];
    document.getElementById(temp + "Block").style.fontSize = fontSizeList[genreQueueDict[temp]];
  }

  //clear current options
  document.getElementById("index").innerHTML = "";
  document.getElementById("content").innerHTML = "";
  document.getElementById("nextButton").setAttribute("class", "nextButton disabled");
  document.getElementById("nextButton").disabled = true;
  // present the next question
  currentQuestion += 1;
  if (currentQuestion<questionList.length)
  {
    showQuestion(questionList[currentQuestion]);
  }
  // all questions finished
  else
  {
    // get results
    var counts = {};
    var compare = 0;
    var mostFrequent = "";
    for(var i = 0, len = answers.length; i < len; i++){
         var genre = answers[i];

         if(counts[genre] === undefined){
             counts[genre] = 1;
         }
         else{
             counts[genre] = counts[genre] + 1;
         }
         if(counts[genre] > compare){
             compare = counts[genre];
             mostFrequent = answers[i];
         }
      }
    if(compare === 3)
    // a major choice
    {
      resultArtist = genreArtist[mostFrequent].artist;
    }
    else
    {
      resultArtist = genreArtist[mostFrequent].artist;
    }
    displayArtistInfo(mostFrequent);
  }
}

function displayArtistInfo(genre)
{
  // clean up
  document.getElementById("subtitle").innerHTML = "";
  document.getElementById("nextButton").style.display = "none";

  //displaying and updating genre info
  document.getElementById("genreQueue")

  //add a scolling button
  var scrollButton = document.createElement("button");
  scrollButton.innerHTML = "\u25BC Scroll to see your artist in the museums \u25BC";
  scrollButton.className = "scrollButton";
  scrollButton.setAttribute("id", "scrollButton");
  scrollButton.setAttribute("onclick", "scrollDown()");
  document.getElementById("nextButtonDiv").appendChild(scrollButton);

  // display the titles
  genreDisplay = document.createElement("p");
  genreDisplay.className = "smallwords";
  genreDisplay.innerHTML = "Based on your genre , your artist is..."
  document.getElementById("resultTitle").appendChild(genreDisplay);

  artistDisplay = document.createElement("p");
  artistDisplay.className = "bigwords";
  artistDisplay.id = "artist_name";
  artistDisplay.innerHTML = genreArtist[genre].name
  document.getElementById("resultTitle").appendChild(artistDisplay);

  countryDisplay = document.createElement("p");
  countryDisplay.className = "smallwords";
  countryDisplay.innerHTML = "A(An) " + genreArtist[genre].country + " artist.";
  document.getElementById("resultTitle").appendChild(countryDisplay);

  var photo = document.createElement("img");
  photo.className = "artistPhoto";
  photo.setAttribute("src", genreArtist[genre].photo);
  photo.setAttribute("align", "middle");
  document.getElementById("result").appendChild(photo);

  var map = document.createElement("img");
  map.className = "map";
  map.setAttribute("src", genreArtist[genre].map);
  map.setAttribute("align", "middle");
  document.getElementById("result").appendChild(map);

  var bio = document.createElement("p");
  bio.className = "bio";
  bio.innerHTML = genreArtist[genre].bio;
  bio.setAttribute("align", "middle");
  document.getElementById("result").appendChild(bio);

  var museumInfo = document.createElement("p");
  museumInfo.className = "bigwords";
  museumInfo.setAttribute("align", "center");
  museumInfo.innerHTML = "The Painting collections of the Met and the MoMa";
  document.getElementById("infodiv").appendChild(museumInfo);

  var smallinfo = document.createElement("p")
  smallinfo.className = "smallwords";
  smallinfo.setAttribute("align", "center");
  smallinfo.innerHTML="Each dot below represents a painting from one of the collections. Dark dots represent works by your artist!" 
  + "<br>" + "Check out when they were most active by brushing on the timeline below.";
  document.getElementById("infodiv").appendChild(smallinfo);


  var met = document.createElement("div");
  met.className = "addpadding";
  var moma = document.createElement("div");
  moma.className = "addpadding";
  var artistpick = document.createElement("div");
  artistpick.className = "addpadding";
  document.getElementById("infodiv").appendChild(met);
  document.getElementById("infodiv").appendChild(moma);
  document.getElementById("infodiv").appendChild(artistpick);
  
  var metData = document.createElement("p")
  metData.className = "smallwords";
  metData.innerHTML = "The Met Collection";
  var metColor = document.createElement("div")
  metColor.className = "Met";
  metColor.id = "smallboxes";
  met.appendChild(metData);
  met.appendChild(metColor);

  var momaData = document.createElement("p")
  momaData.className = "smallwords";
  momaData.innerHTML = "MoMa Collection";
  var momaColor = document.createElement("div")
  momaColor.className = "Moma";
  momaColor.id = "smallboxes";
  moma.appendChild(momaData);
  moma.appendChild(momaColor);

  var artistData = document.createElement("p")
  artistData.className = "smallwords";
  artistData.innerHTML = "Your painter";
  var artistColor = document.createElement("div")
  artistColor.className = "artistcolorbox";
  artistColor.id = "smallboxes";
  artistpick.appendChild(artistData);
  artistpick.appendChild(artistColor);


  var name = genreArtist[genre].name;
  // toggle visibility of chart and make id of chart the artist name 
  d3.select(".dot-chart")
    .attr("id", name + "")
    .style("visibility", "visible");
}

// helper function to shuffle the list, so users see new things each time
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// scrolling page function
function scrollDown()
{
  window.scrollBy(0, 300);
}


//load data with JSON
const requestData = async () => {
  artgenre = await d3.json("datasets/paintinggenre.json");
  genreArtist = await d3.json("datasets/genre_artist.json");
  artgenre = shuffle(artgenre);
// adding image questions to the question list
  for(var i = 0; i < totalQuestions; i++)
  {
    var question = {title:"If I Were An Artist, I Would Be...", subtitle:"Choose your favorite artwork. " + "(Step " + (i + 1).toString() + "/5)", options:[]};
    for(var j = 0; j < paintingPerPage; j++)
    {
      question.options.push(artgenre[i*5 + j]);
    }
    questionList.push(question);
   }


      // initiate the first question
      showQuestion(questionList[0]);
    };
  requestData();
