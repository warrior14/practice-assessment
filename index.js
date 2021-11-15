const getForecCast = (lat, lon, apiKey) => {
    // fetch is getting you the data from the weather api and returning it to you
   return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`).then(response => {
       console.log(response);
       // reponse is what gets recieved but its in a box and then the response.Json is what opens it for us and makes it readable
    return response.json();
})
};


getForecCast("36.1627","-86.7816","c8cd4713211735b2e1cb8bf0e64df4a0").then(data => {
    console.log("data", data)
});


