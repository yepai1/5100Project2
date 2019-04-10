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
// all paintings
var artgenre = [{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Juan_Gris_-_Portrait_of_Pablo_Picasso_-_Google_Art_Project.jpg/420px-Juan_Gris_-_Portrait_of_Pablo_Picasso_-_Google_Art_Project.jpg","genre":"Cubism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/thumb/5/55/Gino_Severini%2C_1919%2C_Boh%C3%A9mien_Jouant_de_L%27Accord%C3%A9on_%28The_Accordion_Player%29.jpg/284px-Gino_Severini%2C_1919%2C_Boh%C3%A9mien_Jouant_de_L%27Accord%C3%A9on_%28The_Accordion_Player%29.jpg","genre":"Cubism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Juan_Gris%2C_1915%2C_Nature_morte_%C3%A0_la_nappe_%C3%A0_carreaux_%28Still_Life_with_Checked_Tablecloth%29%2C_oil_on_canvas%2C_116.5_x_89.3_cm.jpg/275px-Juan_Gris%2C_1915%2C_Nature_morte_%C3%A0_la_nappe_%C3%A0_carreaux_%28Still_Life_with_Checked_Tablecloth%29%2C_oil_on_canvas%2C_116.5_x_89.3_cm.jpg","genre":"Cubism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/440px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg","genre":"Expressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Egon_Schiele_061.jpg/440px-Egon_Schiele_061.jpg","genre":"Expressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/0/02/El_Greco_View_of_Toledo.jpg/440px-El_Greco_View_of_Toledo.jpg","genre":"Expressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/1/14/1914_Redon_Zyklop_anagoria.JPG/256px-1914_Redon_Zyklop_anagoria.JPG","genre":"Post-Impressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg/320px-Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg","genre":"Post-Impressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Maximilien_Luce_-_%27Montmartre%2C_de_la_rue_Cortot%2C_vue_vers_saint-denis%27%2C_oil_on_canvas_painting%2C_c._1900.jpg/320px-Maximilien_Luce_-_%27Montmartre%2C_de_la_rue_Cortot%2C_vue_vers_saint-denis%27%2C_oil_on_canvas_painting%2C_c._1900.jpg","genre":"Post-Impressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/a/a4/Jean-Paul_Riopelle%2C_Untitled%2C_1953%2C_oil_on_canvas%2C_114_x_145_cm%2C_Mus%C3%A9e_des_Beaux-Arts%2C_Rennes.jpg","genre":"Abstract impressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/4/4a/No._5%2C_1948.jpg","genre":"Abstract impressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/f/f2/Number_17A.jpg","genre":"Abstract impressionism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/thumb/2/2b/The_Elephant_Celebes.jpg/440px-The_Elephant_Celebes.jpg","genre":"Surrealism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/a/ae/Indefinite_Divisibility.jpg","genre":"Surrealism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg","genre":"Surrealism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Orozco_Mural_Omniciencia_1925_Azulejos.jpg/280px-Orozco_Mural_Omniciencia_1925_Azulejos.jpg","genre":"Social Realism "},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/5/55/People-of-Chilmark-Benton-1920-lrg.jpg/280px-People-of-Chilmark-Benton-1920-lrg.jpg","genre":"Social Realism "},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Palacio_de_Bellas_Artes_-_Mural_El_Hombre_in_cruce_de_caminos_Rivera_3.jpg/280px-Palacio_de_Bellas_Artes_-_Mural_El_Hombre_in_cruce_de_caminos_Rivera_3.jpg","genre":"Social Realism "},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Jacopo_Pontormo_004.jpg/460px-Jacopo_Pontormo_004.jpg","genre":"Mannerism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Henry_Howard_Earl_of_Surrey_1546.jpg/460px-Henry_Howard_Earl_of_Surrey_1546.jpg","genre":"Mannerism"},{"statement":"PICTUREhttps://upload.wikimedia.org/wikipedia/en/d/df/Roy_Lichtenstein_Drowning_Girl.jpg","genre":"Pop Art"},{"statement":"PICTUREhttps://uploads3.wikiart.org/images/keith-haring/lucky-strike-1987(1).jpg!PinterestSmall.jpg","genre":"Pop Art"},{"statement":"PICTUREhttps://uploads7.wikiart.org/images/andy-warhol/elvis-presley(1).jpg!PinterestSmall.jpg","genre":"Pop Art"},{"statement":"PICTUREhttps://uploads2.wikiart.org/images/piet-mondrian/composition-in-color-a-1917.jpg!PinterestSmall.jpg","genre":"Neoplasticism"},{"statement":"PICTUREhttps://uploads7.wikiart.org/images/piet-mondrian/tableau-i-1921.jpg!PinterestSmall.jpg","genre":"Neoplasticism"},{"statement":"PICTUREhttps://uploads2.wikiart.org/images/theo-van-doesburg/composition-ix-opus-18-1917-1917.jpg!PinterestSmall.jpg","genre":"Neoplasticism"}];
//all artists
var genreArtist = {
    "Cubism":"Picasso",
    "Expressionism":"Kandinsky",
    "Post-Impressionism":"van Gogh",
    "Abstract impressionism":"Pollack",
    "Surrealism":"Dali",
    "Social Realism":"Rivera",
    "Mannerism":"El Greco",
    "High Renaissance":"da Vinci",
    "Pop Art": "Warhol"
    };


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
    document.getElementById(item + "Index").style.color = "#000000";
    document.getElementById(item + "Index").style.backgroundColor = "#ffffff";
    document.getElementById(item + "Content").style.color = "#000000";
    document.getElementById(item + "Content").style.backgroundColor = "#ffffff";
  });

  //update the clicked option's visuals
  document.getElementById(optionIndex + "Index").style.color = "#1f3a1d";
  document.getElementById(optionIndex + "Index").style.backgroundColor = "#8cff82";
  document.getElementById(optionIndex + "Content").style.color = "#1f3a1d";
  document.getElementById(optionIndex + "Content").style.backgroundColor = "#8cff82";

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
    if(compare === 3)
    {
      resultArtist = genreArtist[mostFrequent];
      console.log(mostFrequent);
      console.log(resultArtist);
    }
    else
    {
      resultArtist = genreArtist[mostFrequent];
      console.log(mostFrequent);
      console.log(resultArtist);
    }
  }
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

// adding image questions to the question list
for(var i = 0; i < 5; i++)
{
  var question = {title:"If I Were An Artist, I Would Be...", subtitle:"Choose your favorite artwork. " + "(" + (i + 1).toString() + "/5)", options:[]};
  question.options.push(artgenre[i*5]);
  question.options.push(artgenre[i*5 + 1]);
  question.options.push(artgenre[i*5 + 2]);
  question.options.push(artgenre[i*5 + 3]);
  question.options.push(artgenre[i*5 + 4]);
  questionList.push(question);
}

//load data with JSON
d3.json("/datasets/paintinggenre.json").then(function(data) {
    artgenre = data;
    artgenre = shuffle(artgenre);
    // initiate the first question
    showQuestion(questionList[0]);
  });
