const urllib = require('urllib')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWJoaWplZXQxOTkwIiwiYSI6ImNrYTB6eXQyYzB0aWYzaW52NHo3ejRmNzkifQ.pesGk9oBbsC_TBO79JeytA&limit=1'
    urllib.request(url, (error, data)=> {
        const dataJSON = data.toString()
        const response = JSON.parse(dataJSON)
        console.log(response)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {       
            callback(undefined, {
                latitude: response.features[0].center[1],
                longitude: response.features[0].center[0],
                location: response.features[0].place_name
            })
        }
    })
}

exports.geocode =  geocode