const urllib= require('urllib')
const request = require('request')
//api.openweathermap.org/data/2.5/weather?lat=35&lon=139
const api_id='439d4b804bc8187953eb36d2a8c26a02'
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weather.gov/points/' + latitude + ',' + longitude
    //const url = 'api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+api_id
    urllib.request(url, function(error, data) {
        
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        //} else if (response.body.error) {
        //    callback('Unable to find location', undefined)
        } else {
            const dataJSON = data.toString()
            const response = JSON.parse(dataJSON)
            console.log(response)
            callback(undefined, response)
        }
    })
} 

// using request for fetching weather data from weather bit

/* const forecast = (latitude, longitude, callback) =>{
    var options = {
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        qs: {lang: 'en', lon: longitude, lat: latitude},
        headers: {
          'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
          'x-rapidapi-key': '4186c27860msh95e83284d2b8b90p17aee1jsn35ec00ffff6b',
          useQueryString: true
        }
      };
      
      request(options, function (error, body) {
          if (error) {
              callback('Unable to connect to weather service!', undefined)
            }    
            else {
                console.log(body)
                const dataJSON = body.toString()
                const response = JSON.parse(dataJSON)
                callback(undefined, response)
            }
      });
}
 */


exports.forecast = forecast;