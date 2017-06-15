// reception de la requete Start de chez EU
startRecording(req, res) {
    reply.proxy({
        uri: '',
        passThrough: true,
        onResponse(err, req, res) {

            reply(res);
        }
    });

}


// reception de la requete Stop de chez EU
stopRecording(req, res) {
    reply.proxy({
        uri: '',
        passThrough: true,
        onResponse(err, req, res) {

            reply(res);
        }
    });
}


// connexion au service Wowza
connectWowza(req, res) {


}


// reception de la requete Start de chez Wowza
onStart(req, res) {


}


// reception de la requete Stop de chez Wowza
onStop(req, res) {

}