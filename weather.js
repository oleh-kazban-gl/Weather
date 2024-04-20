const utils = require('./utils');

const apiEndpoint = 'http://api.weatherstack.com';
const apiKey = 'd6725307ad1a3c089eca014e60a94fab';
const weatherRequestTypes = {
  current: 'current',
  forecast: 'forecast',
  historical: 'historical',
};

const getWeatherApiUrl = (type = 'current', location) => `${apiEndpoint}/${type}?access_key=${apiKey}&query=${!!location ? location : 'Ukraine'}`;
const getWeather = (type, location, callback) => {
  utils.request(getWeatherApiUrl(type, location), false, (response, error) => {
    if (response) {
      if (response.success === false) {
        callback(undefined, response.error.info);
      } else {
        callback(response);
      }
    } else {
      callback(undefined, error);
    }
  })
}

module.exports = {
  weatherRequestTypes,
  getWeather
}
