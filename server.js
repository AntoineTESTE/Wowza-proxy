'use strict';
require('./bootstrap');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Hapi = require('hapi');
const server = new Hapi.Server();
const Nes = require('nes');

server.connection({
  host: 'localhost',
  port: config.api.port,
  routes: {
    cors: {
      origin: ['*'],
      credentials: true
    }
  }
});

// proxy server
server.register([
  { register: require('h2o2') },
  Nes,
  Inert,
  Vision, {
    'register': HapiSwagger,
    'options': {
      info: {
        'title': 'Test API Documentation',
        'version': '1',
      }
    }
  }
], function (err) {
  if (err) {
    console.log('Failed to load h2o2');
  }
  server.start(function (err) {
    if (err) {
      throw err;
    }
    require('./src')(server); // Jointure des sources / serveur
    console.log('Server started at: ' + server.info.uri);
  });
});
