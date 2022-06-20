const request = require("postman-request");

const forecast = ({ lat, long }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=28d7af76299f5c9aa0a8214b2b29095c&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(long)}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    const data = body;
    if (error) {
      callback("Could not connect", null);
    } else if (data.error) {
      callback(data.error.info, null);
    } else {
      const { temperature, weather_descriptions, humidity, observation_time } =
        data.current;
      const { name, country, region } = data.location;
      callback(null, {
        forecast: `${temperature} degrees and ${weather_descriptions[0]} with a humidity of ${humidity}%`,
        location: `${name}, ${region}, ${country}. Local time is ${observation_time}`,
      });
    }
  });
};

module.exports = {
  forecast,
};
