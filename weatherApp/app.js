(function() { //IIFE - immediately invoked function expression
  //variables 
  var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = '5569899de6bc3c670e5334c59678b336';
  var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  
  var GOOGLE_MAPS_API_KEY = 'AIzaSyCxjoOb9iDK0AcSLqGocYGAF24LbKKnVYg';
  var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  
  // This function returns a promise that will resolve with an object of lat/lng coordinates
  function getCoordinatesForCity(cityName) {
    // This is an ES6 template string, much better than verbose string concatenation...
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
  
    return (
      $.getJSON(url) // here do two things at once - do a "fetch" and also make sure the response comes back in JSON format
      .then(data => data.results[0].geometry.location) // only want location part of the results back: lat and lon
    );
  }
  
  function getCurrentWeather(coords) {
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
  
    return (
      $.getJSON(url)
      .then(data => data.currently)
    );
  }
  
  var app = $('#app') //JQuery makesit a lot easier to select HTML elements
  var cityForm = app.find('.city-form');//find class city form within the app div
  var cityInput = cityForm.find('.city-input');
  var cityWeather = app.find('.city-weather');
  
  cityForm.on('submit', function(event) { 
    event.preventDefault(); 
    var city = cityInput.val();
  
    getCoordinatesForCity(city)
    .then(getCurrentWeather)
    .then(function(weather) {
      cityWeather.innerText = 'Woof! ' + weather.icon +  ' today. Grr.' + "\n"
      + 'The temperature is ' + weather.temperature + ',' + "\n"
      + 'but it feels like ' + weather.apparentTemperature + '.' + "\n" + "\n"
      + 'Are you still gonna walk me?' + "\uD83D\uDC36";
    })
  })
}) ();