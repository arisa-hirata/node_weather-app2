const request = require('postman-request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a82f4d258896b5439e67cdbd68b4c0e4&query=${lat},${lon}&units=f`;

    request({ url, json: true }, (error, {body} ) => {
        const temperature = body.current.temperature;
        const feelslike = body.current.feelslike;
        const desc = body.current.weather_descriptions[0];

        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, `${desc}. It is currently ${temperature} degrees out. It feels like ${feelslike}% degrees out.`);
        };
    });
}

module.exports = forecast;
