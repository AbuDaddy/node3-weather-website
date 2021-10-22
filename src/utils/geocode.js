const request = require('request')

const geocode = (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGlydXplbiIsImEiOiJja3E5N2NuNjMwOWd5MnVsYmxudmdpeWR5In0.OeNo0RBQVYbMACd2ra-FMQ`
    return new Promise((resolve, reject) => {
        request.get({ url, json: true }, (error, { body } = {} )=> {
            if (error) {
                reject('Unable to reach the geocode services.')
            } else {
                const { place_name, center } = body.features[0]
                const data = {
                    latitude: center[1],
                    longitude: center[0],
                    location: place_name
                }
                resolve(data)
            }
        })
    })
}

module.exports = geocode