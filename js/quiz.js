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
}

// an option is clicked
function optionClicked(optionIndex, optionAnswer)
{
  currentOption = optionAnswer;

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
  answers.push(currentOption);
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
    console.log(mostFrequent);
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
  genreDisplay.innerHTML = "You like <b>" + genre + "</b>, your artist is..."
  document.getElementById("subtitle").appendChild(genreDisplay);

  artistDisplay = document.createElement("p");
  artistDisplay.className = "bigwords";
  artistDisplay.innerHTML = genreArtist[genre].name
  document.getElementById("subtitle").appendChild(artistDisplay);

  countryDisplay = document.createElement("p");
  countryDisplay.className = "smallwords";
  countryDisplay.innerHTML = "A(An) " + genreArtist[genre].country + " artist.";
  document.getElementById("subtitle").appendChild(countryDisplay);

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
  window.scrollBy(0, 100);
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
