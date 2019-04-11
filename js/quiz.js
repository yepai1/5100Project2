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
// all paintings
var artgenre = [
  {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Juan_Gris_-_Portrait_of_Pablo_Picasso_-_Google_Art_Project.jpg/420px-Juan_Gris_-_Portrait_of_Pablo_Picasso_-_Google_Art_Project.jpg",
    "genre": "Cubism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/thumb/5/55/Gino_Severini%2C_1919%2C_Boh%C3%A9mien_Jouant_de_L%27Accord%C3%A9on_%28The_Accordion_Player%29.jpg/284px-Gino_Severini%2C_1919%2C_Boh%C3%A9mien_Jouant_de_L%27Accord%C3%A9on_%28The_Accordion_Player%29.jpg",
    "genre": "Cubism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Juan_Gris%2C_1915%2C_Nature_morte_%C3%A0_la_nappe_%C3%A0_carreaux_%28Still_Life_with_Checked_Tablecloth%29%2C_oil_on_canvas%2C_116.5_x_89.3_cm.jpg/275px-Juan_Gris%2C_1915%2C_Nature_morte_%C3%A0_la_nappe_%C3%A0_carreaux_%28Still_Life_with_Checked_Tablecloth%29%2C_oil_on_canvas%2C_116.5_x_89.3_cm.jpg",
    "genre": "Cubism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/440px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    "genre": "Expressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Egon_Schiele_061.jpg/440px-Egon_Schiele_061.jpg",
    "genre": "Expressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/0/02/El_Greco_View_of_Toledo.jpg/440px-El_Greco_View_of_Toledo.jpg",
    "genre": "Expressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/1/14/1914_Redon_Zyklop_anagoria.JPG/256px-1914_Redon_Zyklop_anagoria.JPG",
    "genre": "Post-Impressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg/320px-Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg",
    "genre": "Post-Impressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Maximilien_Luce_-_%27Montmartre%2C_de_la_rue_Cortot%2C_vue_vers_saint-denis%27%2C_oil_on_canvas_painting%2C_c._1900.jpg/320px-Maximilien_Luce_-_%27Montmartre%2C_de_la_rue_Cortot%2C_vue_vers_saint-denis%27%2C_oil_on_canvas_painting%2C_c._1900.jpg",
    "genre": "Post-Impressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/a/a4/Jean-Paul_Riopelle%2C_Untitled%2C_1953%2C_oil_on_canvas%2C_114_x_145_cm%2C_Mus%C3%A9e_des_Beaux-Arts%2C_Rennes.jpg",
    "genre": "Abstract impressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/4/4a/No._5%2C_1948.jpg",
    "genre": "Abstract impressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/f/f2/Number_17A.jpg",
    "genre": "Abstract impressionism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/thumb/2/2b/The_Elephant_Celebes.jpg/440px-The_Elephant_Celebes.jpg",
    "genre": "Surrealism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/a/ae/Indefinite_Divisibility.jpg",
    "genre": "Surrealism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    "genre": "Surrealism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Orozco_Mural_Omniciencia_1925_Azulejos.jpg/280px-Orozco_Mural_Omniciencia_1925_Azulejos.jpg",
    "genre": "Social Realism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/5/55/People-of-Chilmark-Benton-1920-lrg.jpg/280px-People-of-Chilmark-Benton-1920-lrg.jpg",
    "genre": "Social Realism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Palacio_de_Bellas_Artes_-_Mural_El_Hombre_in_cruce_de_caminos_Rivera_3.jpg/280px-Palacio_de_Bellas_Artes_-_Mural_El_Hombre_in_cruce_de_caminos_Rivera_3.jpg",
    "genre": "Social Realism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Jacopo_Pontormo_004.jpg/460px-Jacopo_Pontormo_004.jpg",
    "genre": "Mannerism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Henry_Howard_Earl_of_Surrey_1546.jpg/460px-Henry_Howard_Earl_of_Surrey_1546.jpg",
    "genre": "Mannerism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/en/d/df/Roy_Lichtenstein_Drowning_Girl.jpg",
    "genre": "Pop Art"
  }, {
    "statement": "PICTUREhttps://uploads3.wikiart.org/images/keith-haring/lucky-strike-1987(1).jpg!PinterestSmall.jpg",
    "genre": "Pop Art"
  }, {
    "statement": "PICTUREhttps://uploads7.wikiart.org/images/andy-warhol/elvis-presley(1).jpg!PinterestSmall.jpg",
    "genre": "Pop Art"
  }, {
    "statement": "PICTUREhttps://uploads2.wikiart.org/images/piet-mondrian/composition-in-color-a-1917.jpg!PinterestSmall.jpg",
    "genre": "Neoplasticism"
  }, {
    "statement": "PICTUREhttps://uploads7.wikiart.org/images/piet-mondrian/tableau-i-1921.jpg!PinterestSmall.jpg",
    "genre": "Neoplasticism"
  }, {
    "statement": "PICTUREhttps://uploads2.wikiart.org/images/theo-van-doesburg/composition-ix-opus-18-1917-1917.jpg!PinterestSmall.jpg",
    "genre": "Neoplasticism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/f/f9/Dividing_water_from_Heaven.jpg",
    "genre": "Mannerism"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Giorgione%2C_The_tempest.jpg/800px-Giorgione%2C_The_tempest.jpg",
    "genre": "High Renaissance"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1024px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    "genre": "High Renaissance"
  }, {
    "statement": "PICTUREhttps://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    "genre": "High Renaissance"
  }
  ];
//all artists
var genreArtist = {
  "Cubism": {
    artist: "Picasso",
    name: "Pablo Picasso",
    country: "Spanish",
    photo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Portrait_de_Picasso%2C_1908.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/EU-Spain_%28orthographic_projection%29.svg/480px-EU-Spain_%28orthographic_projection%29.svg.png",
    bio: "Pablo Ruiz Picasso (25 October 1881 – 8 April 1973) was a Spanish painter, sculptor, printmaker, ceramicist, stage designer, poet and playwright who spent most of his adult life in France. Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture, the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d'Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing of Guernica by the German and Italian airforces during the Spanish Civil War."
  },
  "Expressionism": {
    artist: "Kandinsky",
    name: "Wassily Kandinsky",
    country: "Russian",
    photo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Vassily-Kandinsky.jpeg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Russian_Federation_2014_%28orthographic_projection%29_with_Crimea.svg/480px-Russian_Federation_2014_%28orthographic_projection%29_with_Crimea.svg.png",
    bio: "Wassily Wassilyevich Kandinsky (16 December [O.S. 4 December] 1866 – 13 December 1944) was a Russian painter and art theorist. Kandinsky is generally credited as the pioneer of abstract art. Born in Moscow, Kandinsky spent his childhood in Odessa, where he graduated at Grekov Odessa Art school. He enrolled at the University of Moscow, studying law and economics. Successful in his profession—he was offered a professorship (chair of Roman Law) at the University of Dorpat—Kandinsky began painting studies (life-drawing, sketching and anatomy) at the age of 30."
  },
  "Post-Impressionism": {
    artist: "van Gogh",
    name: "Vincent van Gogh",
    country: "Dutch",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/EU-Netherlands.svg/1024px-EU-Netherlands.svg.png",
    bio: "Vincent Willem van Gogh (30 March 1853 – 29 July 1890) was a Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art. In just over a decade he created about 2,100 artworks, including around 860 oil paintings, most of them in the last two years of his life. They include landscapes, still lifes, portraits and self-portraits, and are characterised by bold colours and dramatic, impulsive and expressive brushwork that contributed to the foundations of modern art. However, he was not commercially successful, and his suicide at 37 followed years of mental illness and poverty."
  },
  "Abstract impressionism": {
    artist: "Pollack",
    name: "Jackson Pollock",
    country: "American",
    photo: "https://upload.wikimedia.org/wikipedia/en/4/42/Namuth_-_Pollock.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/USA_orthographic.svg/480px-USA_orthographic.svg.png",
    bio: "Paul Jackson Pollock (January 28, 1912 – August 11, 1956) was an American painter and a major figure in the abstract expressionist movement. He was widely noticed for his technique of pouring or splashing liquid household paint on to a horizontal surface (‘drip technique’), enabling him to view and paint his canvases from all angles. It was also called ‘action painting’, since he used the force of his whole body to paint, often in a frenetic dancing style. This extreme form of abstraction divided the critics: some praised the immediacy and fluency of the creation, while others derided the random effects. In 2016, Pollock's painting titled Number 17A was reported to have fetched US$200 million in a private purchase."
  },
  "Surrealism": {
    artist: "Dali",
    name: "Salvador Dalí",
    country: "Spanish",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/800px-Salvador_Dal%C3%AD_1939.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/EU-Spain_%28orthographic_projection%29.svg/480px-EU-Spain_%28orthographic_projection%29.svg.png",
    bio: "Salvador Domingo Felipe Jacinto Dalí i Domènech, 1st Marquis of Dalí de Púbol (11 May 1904 – 23 January 1989), known professionally as Salvador Dalí, was a prominent Spanish surrealist born in Figueres, Catalonia, Spain. Dalí was a skilled draftsman, best known for the striking and bizarre images in his surrealist work. His painterly skills are often attributed to the influence of Renaissance masters. His best-known work, The Persistence of Memory, was completed in August 1931. Dalí's expansive artistic repertoire included film, sculpture, and photography, at times in collaboration with a range of artists in a variety of media."
  },
  "Social Realism": {
    artist: "Rivera",
    name: "Diego Rivera",
    country: "Mexican",
    photo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Diego_Rivera%2C_1910.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/MEX_orthographic.svg/480px-MEX_orthographic.svg.png",
    bio: "Diego María de la Concepción Juan Nepomuceno Estanislao de la Rivera y Barrientos Acosta y Rodríguez, known as Diego Rivera (December 8, 1886 – November 24, 1957) was a prominent Mexican painter. His large frescoes helped establish the Mexican mural movement in Mexican art. Between 1922 and 1953, Rivera painted murals in, among other places, Mexico City, Chapingo, Cuernavaca, San Francisco, Detroit, and New York City. In 1931, a retrospective exhibition of his works was held at the Museum of Modern Art in New York. Rivera had a volatile marriage with fellow Mexican artist Frida Kahlo."
  },
  "Mannerism": {
    artist: "El Greco",
    name: "Doménikos Theotokópoulos",
    country: "Kingdom of Candia (today part of Greece)",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/El_Greco_-_Portrait_of_a_Man_-_WGA10554.jpg/800px-El_Greco_-_Portrait_of_a_Man_-_WGA10554.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/EU-Greece.svg/571px-EU-Greece.svg.png",
    bio: "Doménikos Theotokópoulos (October 1541 – 7 April 1614), most widely known as El Greco (\"The Greek\"), was a painter, sculptor and architect of the Spanish Renaissance. \"El Greco\" was a nickname,[a][b] a reference to his Greek origin, and the artist normally signed his paintings with his full birth name in Greek letters, Δομήνικος Θεοτοκόπουλος, Doménikos Theotokópoulos, often adding the word Κρής Krēs, Cretan."
  },
  "High Renaissance": {
    artist: "da Vinci",
    name: "Leonardo da Vinci",
    country: "Italian",
    photo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/EU-Italy_%28orthographic_projection%29.svg/480px-EU-Italy_%28orthographic_projection%29.svg.png",
    bio: "Leonardo di ser Piero da Vinci (15 April 1452 – 2 May 1519), more commonly Leonardo da Vinci or simply Leonardo, was an Italian polymath of the Renaissance whose areas of interest included invention, drawing, painting, sculpting, architecture, science, music, mathematics, engineering, literature, anatomy, geology, astronomy, botany, writing, history, and cartography. He has been variously called the father of palaeontology, ichnology, and architecture, and he is widely considered one of the greatest painters of all time. Sometimes credited with the inventions of the parachute, helicopter, and tank,he epitomised the Renaissance humanist ideal."
  },
  "Pop Art": {
    artist: "Warhol",
    name: "Andy Warhol",
    country: "American",
    photo: "https://upload.wikimedia.org/wikipedia/commons/4/42/Andy_Warhol_1975.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/USA_orthographic.svg/480px-USA_orthographic.svg.png",
    bio: "Andy Warhol (August 6, 1928 – February 22, 1987) was an American artist, director and producer who was a leading figure in the visual art movement known as pop art. His works explore the relationship between artistic expression, celebrity culture, and advertising that flourished by the 1960s, and span a variety of media, including painting, silkscreening, photography, film, and sculpture. Some of his best known works include the silkscreen paintings Campbell's Soup Cans (1962) and Marilyn Diptych (1962), the experimental film Chelsea Girls (1966), and the multimedia events known as the Exploding Plastic Inevitable (1966–67)."
  },
  "Neoplasticism": {
    artist: "Mondrian",
    name: "Piet Mondrian",
    country: "American",
    photo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Piet_Mondriaan.jpg",
    map: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/USA_orthographic.svg/480px-USA_orthographic.svg.png",
    bio: "Pieter Cornelis Mondriaan, after 1906 Piet Mondrian (7 March 1872 – 1 February 1944), was a Dutch painter and theoretician who is regarded as one of the greatest artists of the 20th century. He is known for being one of the pioneers of 20th century abstract art, as he changed his artistic direction from figurative painting to an increasingly abstract style, until he reached a point where his artistic vocabulary was reduced to simple geometric elements."
  }
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
    document.getElementById(item + "Index").style.color = "#ffffff";
    document.getElementById(item + "Index").style.backgroundColor = "#5d4037";
    document.getElementById(item + "Content").style.color = "#ffffff";
    document.getElementById(item + "Content").style.backgroundColor = "#5d4037";
  });

  //update the clicked option's visuals
  document.getElementById(optionIndex + "Index").style.color = "#000000";
  document.getElementById(optionIndex + "Index").style.backgroundColor = "#a0af22";
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

function scrollDown()
{
  window.scrollBy(0, 100);
}

// adding image questions to the question list
artgenre = shuffle(artgenre);
for(var i = 0; i < totalQuestions; i++)
{
  var question = {title:"If I Were An Artist, I Would Be...", subtitle:"Choose your favorite artwork. " + "(Step " + (i + 1).toString() + "/5)", options:[]};

  for(var j = 0; j < paintingPerPage; j++)
  {
    question.options.push(artgenre[i*5 + j]);
  }
  questionList.push(question);
}

//load data with JSON
d3.json("/datasets/paintinggenre.json").then(function(data) {
    // initiate the first question
    showQuestion(questionList[0]);
  });
