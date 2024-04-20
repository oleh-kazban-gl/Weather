const Weather = require('./weather');
const Utils = require('./utils');

const args = Utils.getArgs(process.argv);

if (!args.location || !args.type) {
  console.log('Please provide with right arguments');
} else {
  Weather.getWeather(args.type, args.location, (response, error) => {
    if (error) {
      return console.log(`ERROR: ${error}`);
    }

    console.log(`${args.type} weather for ${args.location}: ${JSON.stringify(response)}`);
  });
}
