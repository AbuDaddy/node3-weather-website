const request = require('request')

const forecast = (latitude, longitude) => {
    const url = `http://api.weatherstack.com/current?access_key=eb2d8bd06b8177443a281be8b9eae569&query=${latitude},${longitude}`
    return new Promise((resolve, reject) => {
        request.get({ url, json: true }, (error, { body } = {}) => {
            if (error) {
                reject('Unable to reach the weather services.')
            } else if (body.error) {
                reject(body.error.info)
            } else {
                const { temperature, feelslike } = body.current
                const data = {
                    temperature,
                    feelslike
                }
                resolve(data)
            }
        })
    })
}

module.exports = forecast