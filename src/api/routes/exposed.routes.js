'use strict';


// Export des Routes

module.exports = () => {

    //Add the route to Start record
    server.route({
        method: 'GET',
        path: '/start',
        config: {
            description: '/startRec',
            notes: ['api'],
            tags: ['api'],
            handler: handlers.Wowza.start,
        }
    }),

        //Add the route to Stop record
        server.route({
            method: 'GET',
            path: '/stop',
            config: {
                description: '/stopRec',
                notes: ['api'],
                tags: ['api'],
                handler: handlers.Wowza.stop,
            }
        })



}


