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