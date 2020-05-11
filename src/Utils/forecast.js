const urllib= require('urllib')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weather.gov/points/' + latitude + ',' + longitude

    urllib.request(url, function(error, data) {
        
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        //} else if (response.body.error) {
        //    callback('Unable to find location', undefined)
        } else {
            const dataJSON = data.toString()
            const response = JSON.parse(dataJSON)
            callback(undefined, response)
        }
    })
}

exports.forecast = forecast;