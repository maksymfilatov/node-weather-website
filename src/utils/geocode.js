const request = require('postman-request')

//  Geocoding

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + `.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`

    request({ url, json: true }, (e, { body } = {}) => {
        if (e) {
            callback('Unable to connect to geocoding service!')
        } else if (body.features.length === 0) {
            callback('Unable to find geolocation. Try another search term.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode