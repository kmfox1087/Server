// Global variables
var apiKey = eedf2a8246eeeb25f8bfcceff39ff8c5;
var btn = document.querySelector("#btn-search");
var containerHistoricCities = document.querySelector("#historic-Cities");
var containerCurrent = document.querySelector("#targetCity");
var containerForecast = document.querySelector("#infoCity");

// Array for local storage data
var dataStore = JSON.parse(localStorage.getItem('cities')) || [];

//Object for Weather Conditions in a city 
var weatherCondition = [];

//For first loading the page
function start() {
    //This loads the localstorage
    loadCity();
}

//Function for actually retrieving the info from LS
var loadCity = function() {

    cleaningElement(containerHistoricCities);
console.log("This is working!");
    if(dataStore){
        var ulElement = document.createElement("ul");
        ulElement.classList.add("list-unstyled");
        ulElement.classList.add("w-100");

        //For loop to iterate throughout the LS
        for(var i = 0; i <dataStore.length; 1++){
            var liElement = document.createElement("li");
            //Item must be appended into container
            ulElement.appendChild(liElement);
        }
        containerHistoricCities.appendChild(ulElement);
    }
};

// 
$(document).on("cick", ".list-group-item", function(event) {

event.preventDefault();

//Getting attribute that contains the name of the city
var city = $(this).attr("attr");
callApiFetch(city);

//Functin to clear everything inside container
var cleaningElement = function(element) {
    element.innerHTML = "";
}
});

// ~~~~Weather section~~~~

//Converting °F to °C
var convertTemp = function(temp) {
    return (Math.floor((parseFloat(temp) -32) * (5/9))).toString();
}

//Converting Wind Speed from MPH to KHP
var convertSpeed = function(speed) {
    return (Math.floor(parseFloat(speed) * 1.609)).toString();
};

//This determines the intensity of UV index
//Go to https://www.epa.gov/sites/production/files/documents/uviguide.pdf for classifications
//
var findUV = function(uv) {

    var indexUV = parseFloat(uv);
    var bgColor;

    if(indexUV < 3){
        bgColor = "bg-success";
    }
        else if( indexUV < 6) {
        bgColor = "bg-danger";
    }
        else if (indexUV < 8) {
            bgColor = "bg-danger";
        }
         else {
        bgColor = "bg-dark";
    }
    return bgColor;
};

//Showing info about weather

var weatherHTML = function (city, uv) {
    //Cleaning containers
    cleaningElement(containerCurrent);
    cleaningElement(containerForecast);

//Current city
var ctn1 = document.createElement("div");
ctn1.classList.add("col-6");
var ctn2 = document.createElement("div");
ctn2.classList.add("col-6");
}

//Function to start everything - commented out for now
// start();

//Event listener for search button

btn.addEventListener("click", search);