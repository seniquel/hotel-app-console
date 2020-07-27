//const request = require('request');
const request = require('request-promise-native');
class Service {
    listerClients() {
        return request('https://leo-hotel-web-api.herokuapp.com/clients?start=0&size=10', { json: true })
            .then(body => body);
    }

    ajouterClient(client) {
        return request.post('https://leo-hotel-web-api.herokuapp.com/clients', { json: client });
    }

    chercherClient(nom) {
        return request('https://leo-hotel-web-api.herokuapp.com/clients?start=0&size=10', { json: true })
            .then(body => body.filter(c => c.nom == nom));
    }

    chercherChambre(numero) {
        return request('https://leo-hotel-web-api.herokuapp.com/reservations', { json: true })
            .then(body =>
                // aplatit la liste de listes de chambres en une liste 1D de chambres
                !body.map(r => r.chambres).flat()
                    .map(c => c.numero)
                    .some(n => n == numero));
    }
}
module.exports = {Service};
