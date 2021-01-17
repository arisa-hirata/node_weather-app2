const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJpc2FoaXJhdGEiLCJhIjoiY2tqeTA3eGNrMDh3aTJ3cDQzdW11aGd6dCJ9.gF1dj5V2ZFfvXeGBKmylAw&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        const geo = body.features[0];

        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: geo.center[0],
                longitude: geo.center[1],
                location: geo.place_name
            });
        };
    });
};

module.exports = geocode;
