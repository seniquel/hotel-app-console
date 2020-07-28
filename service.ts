//const request = require('request');
//const request = require('request-promise-native');
import request from 'request-promise-native';
import {Client, Hotel, Chambre, Reservation} from './domain';
export class Service {
    listerClients() {
        return request('https://leo-hotel-web-api.herokuapp.com/clients?start=0&size=10', { json: true })
            .then(body => body);
    }

    ajouterClient(client:any) {
        return request.post('https://leo-hotel-web-api.herokuapp.com/clients', { json: client });
    }

    chercherClient(nom:string) {
        return request('https://leo-hotel-web-api.herokuapp.com/clients?start=0&size=10', { json: true })
            .then(body => body.filter((c:Client) => c.nom == nom));
    }

    chercherChambre(numero:string) {
        return request('https://leo-hotel-web-api.herokuapp.com/reservations', { json: true })
            .then(body =>
                // aplatit la liste de listes de chambres en une liste 1D de chambres
                !body.map( (r:Reservation) => r.chambres).flat()
                    .map( (c:Chambre) => c.numero)
                    .some( (n:string) => n == numero));
    }
}
//module.exports = {Service};