var request = require('request');

function listerClients(callback) {
    request('https://leo-hotel-web-api.herokuapp.com/clients?start=0&size=10', { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
        // body contient les données récupérées
        callback(body);
    });
}

function ajouterClient(client) {
    request.post('https://leo-hotel-web-api.herokuapp.com/clients', { json: client }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
    });
}

function chercherClient(nom, callback) {
    request('https://leo-hotel-web-api.herokuapp.com/clients?start=0&size=10', { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
        // body contient les données récupérées
        callback(body.filter(c => c.nom == nom));
    });

}
function chercherChambre(numero, callback) {
    request('https://leo-hotel-web-api.herokuapp.com/reservations', { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
        // body contient les données récupérées
        callback(
            // aplatit la liste de listes de chambres en une liste 1D de chambres
            !Array.prototype.concat.apply([], body.map(r => r.chambres))
                .map(c => c.numero)
                .some(n => n == numero)
                );
    });

}
exports.listerClients = listerClients;
exports.ajouterClient = ajouterClient;
exports.chercherClient = chercherClient;
exports.chercherChambre = chercherChambre;
