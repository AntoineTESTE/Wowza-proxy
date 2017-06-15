'use strict';

onStop(request, reply) {
    reply.proxy({
        uri: '',
        passThrough: true,
        onResponse(err, res, request, reply, settings, ttl) {
            VimeoService.upload();
            reply(res);
        }
    });
}

onStart(request, reply) {
    reply.proxy({
        uri: '',
        passThrough: true
    });
}