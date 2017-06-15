'use strict';

require('./bootstrap'); e

const Hapi = require('hapi');
const server = new Hapi.Server();



server.connection({
    host: 'http://video1.livee.com',
    port: 8086,
    routes: {
        cors: {
            origin: ['*'],
            credentials: true
        }
    }
});


// Jointure des sources / serveur
require('./src')(server);



// Enregistrement du serveur auprès de Swagger
server.register({
    register: require('h2o2')
}, function (err) {

    if (err) {
        console.log('Failed to load h2o2');
    }

    server.start(function (err) {

        console.log('Server started at: ' + server.info.uri);
    });
});
