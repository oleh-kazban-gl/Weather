const https = require('https');
const http = require('http');

const request = (api, secure = true, callback, options) => {
  const package = secure ? https : http;

  let data = '';

  package.get(api, options, (response) => {
    response.on('data', chunk => {
      data += chunk;
    })

    response.on('error', error => {
      callback(undefined, error);
    })

    response.on('close', () => {
      callback(JSON.parse(data));
    })
  })
}

const getArgs = (args = []) => {
  const provided = args.slice(2);
  const result = {};

  if (provided.length) {
    provided.forEach(p => {
      if (!p.includes('=')) {
        throw new Error(`Error: Invalid configuration pair, every value should be separated by "=" from key`)
      }

      const [key, value] = p.split('=');

      if (!key.startsWith('--')) {
        throw new Error(`Error: Invalid configuration pair, every key should starts with "--"`)
      }

      result[key.replace('--', '')] = value;
    })
  }

  return result;
}

module.exports = {
  request,
  getArgs
}
