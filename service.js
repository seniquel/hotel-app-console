var request = require('request');

function listerClients() {
    request('https://leo-hotel-web-api.herokuapp.com/clients?start=0&size=10', { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
        // body contient les données récupérées
        body.forEach(c =>console.log(c.nom, c.prenoms));
    });
}

exports.listerClients = listerClients;