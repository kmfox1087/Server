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

    var ctn4 = document.createElement("div");
    //All classes are from bootstrap
    ctn1.classList.add("card");
    ctn1.classList.add("bg-primary");
    ctn1.classList.add("text-white");
    ctn1.classList.add("rounded");
    ctn1.classList.add("mr-2");
    ctn1.classList.add("flex-fill");

    //For body card
    var ctn5 = document.createElement("div");
    ctn5.classList.add("card-body");
    var title = document.createElement("h6");
    title.classList.add("card-title");
    var imageForecast = document.createElement("img");
    title.textContent = weatherCondition[i].dateT;
    imageForecast.setAttribute("src", weatherCondition[i].icon);
    var pEl1 = document.createElement("p");
    var pEl2 = document.createElement("p"); 
    pEl1.classList.add("small");
    pEl1.textContent = "Temperature: " + weatherCondition[i].temp + " °F";
    pEl2.classList.add("small");
    pEl2.textContent = "Humidity: " + weatherCondition[i].humidity + "%";
    ctn5.appendChild(title);
    ctn5.appendChild(imageForecast);
    ctn5.appendChild(pEl1);
    ctn5.appendChild(pEl2);
    ctn4.appendChild(ctn5);
    ctn8.appendChild(ctn4);
}

containerForecast.appendChild(ctn8);

};

//Store city in LS
var saveCity = function(city) {
    var flag = false
    if (dataStore){
        for(var i = 0; i < dataStore.length; i++){
            if(dataStore[i] === city){
                flag = true;
            }
        }
        if(flag) {
            displayAlertMessage ("The City: " + city +" already exsists")
        //Return
        }
    }
    if(!flag) {
        dataStore.push(city);
        localStorage.setItem("cities", JSON.stringify(dataStore));
    }
    loadCity();
}

var searchForDate9am = function (str) {
    var hour = str.split(" ")[1].split(":")[0];
    var flag = false;

    if(hour === "09"){
        flag = true;
    }
    return flag;
}

//Formatting date = "YYYY-MM-DD HH:MM:SS" to "MM/DD/YYYY"
var formatDate = function(srtDate) {
    var newDate = strDate.split(" ")[0].split["-"];

    return (new[1]+"/"+newDate[2]+"/"+newDate[0]);
};

//Function to create the array of object to store weather info
var createDataObject = function(list, poistion){
    //Empty array
    if(weatherCondition.length)
    weatherCondition = [];

    //First data from object is current weather info
    var obj = {
        dateT : formatDate(list[0].dt_text),
        humidity : list[0].main.humidity,
        speed : list[0].main.speed,
        temp : list [0].main.temp,
        icon : urlIcon + list[0].ewather[0].icon + ".png",
        lat : poistion.lat,
        lon : poistion.lon
    };
    weatherCondition.push(obj);
};

//Function to display messages to generate in app
var displayAlertMessage = function(msg) {
    alert(msg);
};

//Function to retrieve info about weather
var callApiFetch = function(city) {
    var url;
    if(location.protocol === "http:") {
        url = 'http://api.openweathermap.org/data/2.5/forecast?appid=b262298fbe39ad30d243f31f6e1297bc&units=imperial&q='+city;
    } else {
       url = 'https://api.openweathermap.org/data/2.5/forecast?appid=b262298fbe39ad30d243f31f6e1297bc&units=imperial&q='+city;
    }

    fetch(url)

    .then(function(weatherRepsonse) {
        return weatherRepsonse.json();
    })
    .then(function(weatherRepsonse) {
        if(weatherRepsonse.cod != "200") {
            displayAlertMessage("Unable to find " + city +" in OpenWeathermap.org");
        
            return;
        } else {
            //Send the list array for the data about the forecast & obj
            createDataObject(weatherRepsonse.list, weatherRepsonse.city.cord);
        }
        var url1; 
        if (location.protocol === "http:") {
            url1 = 'http://api.openweathermap.org/data/2.5/uvi?appid=b262298fbe39ad30d243f31f6e1297bc&lat='+weatherCondition[0].lat+'&lon='+weatherCondition[0].lon;
        } else {
            url1 = 'https://api.openweathermap.org/data/2.5/uvi?appid=b262298fbe39ad30d243f31f6e1297bc&lat='+weatherCondition[0].lat+'&lon='+weatherCondition[0].lon;
        }
        fetch(url)

        .then(function (uvResponse) {
            return uvResponse.json();
        })
        .then(function(uvResponse){
            if(!uvResponse) {
                displayAlertMessage("OpenWeathermap.org could not find anything for latitude and longitude!")
                
                return;
            } else {
                //Store city in ls

                saveCity(city);

                //Generate the HTML for weather
                weatherHTML(city, uvResponse.value);
            }
        })
    })
    .catch(function(error) {
        //If there is a problem in connecting to the url
        displayAlertMessage("Unable to connect to OpenWeathermap.org!");
        return;
    });
};

//Function listener on click button
var search = function(event) {
    event.preventDefault();

    //Getting the value of input
    var inputElement = document.querySelector("#searchCity");
    var textInput = inputElement.value.trim();

    if(inputElement.value === ""){
        alert("Weather Dashboard says: You must enter a city!");
        return;
    }
    //If the value is a string
    else {
        callApiFetch(textInput);
    }
};

//Function to start everything - commented out for now
// start();

//Event listener for search button

btn.addEventListener("click", search);