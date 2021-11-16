const getForecCast = (lat, lon, apiKey) => {
    // fetch is getting you the data from the weather api and returning it to you
   return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`).then(response => {
       console.log(response);
       // reponse is what gets recieved but its in a box and then the response.Json is what opens it for us and makes it readable
       // the json method parses the data to convert to readable javascript format
    return response.json();
})
};

// the purpose of this promise is to invoke the getForecCast method to retrieve the data that we need
// you need to have a variable to capture the promise like getDataFromApi because it makes it scalable and reusable for other parts of the app
let getDataFromApi = new Promise((resolve, reject) => {
    getForecCast("36.1627","-86.7816","c8cd4713211735b2e1cb8bf0e64df4a0").then(data => {
        resolve(data)
    });
});


let createElement = (tag, attribute1, value1, attribute2, value2, text, parentElement) => {
    let newElement = document.createElement(tag);
    newElement.setAttribute(attribute1, value1);
    newElement.setAttribute(attribute2, value2);
    newElement.innerText = `${text}`;
    parentElement.append(newElement);
    return newElement;
}


// this is  a method that creates that builds the forecast display of each temp and image, this method is what invokes the createElement, this
// where Im building, and the parameters are being passed corresspondingly
let createForecastDisplay = (img, min, max) => {
  let divElement = createElement("div", "id", "forecastContainer", "", "", "", weather);
  createElement("img", "src", img, "", "", "", divElement);
  //createElement("p", "id", "pId", min, max, divElement);
  createElement("p", "min", min, "max", max, "", divElement);
};




getDataFromApi.then(data => {


// this gurantees that this will render before anything else

console.log('data inside', data)

// createForecastDisplay("images/cloudy.png", data.daily.temp.min, data.daily.temp.min);
// createForecastDisplay("images/cloudy.png", data.daily.forEach(day => {
//     return day.temp.min
//     }), 
//     data.daily.forEach(day => {
//         return day.temp.max})
// );

createForecastDisplay("images/cloudy.png", data.daily.temp.min, data.daily.temp.max);


// map, filter and find returns you something, map = select, filter = where, find = FirstOrDefault 
data.daily.forEach(day => {
    // note: in order to get the day we will have to multiply the dt times 1000, because dt is in utc format. so do new Date(dt * 1000) to get the
    // proper day.


    let cloudImage;
    if (day.clouds === 0) {
        cloudImage = "images/sunny.png"
    } else if (day.clouds > 0 && day.clouds < 51) {
        cloudImage = "images/sunny_s_cloudy.png"
    } else if (day.clouds > 51 && day.clouds < 81) {
        cloudImage = "images/partly_cloudy.png"
    } else {
        cloudImage = "images/cloudy.png"
    }
    //createForecastDisplay(cloudImage, day.temp.max)
    createForecastDisplay(cloudImage, day.temp.min, day.temp.max)
});


















});