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
//Div for city, date and weather cond.
var ctn1 = document.createElement("div");
//Class from bootstrap
ctn1.classList.add("col-6");
var ctn2 = document.createElement("div");
ctn2.classList.add("col-6");

var cityEl = document.createElement("h2");
var imageCurrent = document.createElement("img");

cityEl.textContent = city + " (" + weatherCondition[0],dateT +")";
imageCurrent.setAttribute("src", weatherCondition[0].icon);

//Class from bootstrap
imageCurrent.classList.add("bg-info");
ctn1.appendChild(cityEl);
ctn2.appendChild(imageCurrent);

//Div for humidty, wind speed, UV index & temp
var ctn3 = document.createElement("div");
ctn3.classList.add("col-12");
ctn3.innerHTML = "<p>Temperature: " + weatherCondition[0].temp + " °F / " + converTemp(weatherCondition[0].temp) + " °C</p>" + 
        "<p>Humidity: " + weatherCondition[0].humidity + "% </p>" +
        "<p>Wind Speed: " + weatherCondition[0].speed + " MPH / " + convertWSpeed(weatherCondition[0].speed) + " KPH </p>" +
        "<p>UV index: <span class='text-white "+ findUV(uv) + "'>" + uv + "</span></p>";

containerCurrent.appendChild(ctn1);
containerCurrent.appendChild(ctn2);
containerCurrent.appendChild(ctn3);

//5 Day Forecast

//Container to store the header for h2
var ctn6 = document.createElement("div");
ctn6.classList.add("row");
var ctn7 = document.createElement("div");
ctn7.classList.add("col-12");
ctn6.appendChild(ctn7);
containerForecast.appendChild(ctn6);

//Container to store the card weather
var ctn8 = document.createElement("div");
ctn8.classList.add("d-flex");

//For loop to get the info about the weather stored in the array weatherCond
for(var i=1; i < weatherCondition.length; i++) {
    
}
}

//Function to start everything - commented out for now
// start();

//Event listener for search button

btn.addEventListener("click", search);