//const readline = require('readline');
//const {Service} = require("./service.js");
import readline from 'readline';
import {Service} from './service';
import {Client} from './domain';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const service = new Service();

export function start() {
    let menu = `
1. Lister les clients
2. Ajouter un client
3. Rechercher un client par nom
4. Vérifier la disponibilité d'une chambre
99. Sortir
`;
    rl.question(menu, saisie => {
        switch (saisie) {
            // Lister les clients
            case "1":
                console.log(">> Liste des clients\n");
                service.listerClients().then(clients => {
                    afficherClients(clients);
                    start();
                })
                    .catch(err => console.log('Erreur', err));
                break;
            // Ajouter un client
            case "2":
                let nom:string, prenoms:string;
                rl.question("Veuillez renseigner un nom\n", saisie_nom => {
                    nom = saisie_nom;
                    rl.question("Veuillez renseigner un prenom\n", saisie_prenoms => {
                        prenoms = saisie_prenoms
                        const client = { nom: nom, prenoms: prenoms };
                        service.ajouterClient(client).catch(err => console.log('Erreur', err));
                        start();
                    }
                    );
                });
                break;
            // Rechercher un client par nom
            case "3":
                rl.question("Veuiller entrer un nom de client\n", saisie_client => {
                    service.chercherClient(saisie_client).then(clients => {
                        afficherClients(clients);
                        start();
                    })
                        .catch(err => console.log('Erreur', err));
                });
                break;
            // Vérifier la disponibilité d'une chambre
            case "4":
                rl.question("Veuiller entrer le numéro de la chambre\n", saisie_chambre => {
                    service.chercherChambre(saisie_chambre).then(chambreDispo => {
                        messageChambreDispo(saisie_chambre, chambreDispo)
                        start();
                    })
                        .catch(err => console.log('Erreur', err));
                });
                break;
            // Sortir
            case "99":
                console.log("Au revoir\n");
                rl.close();
                break;
            default:
                start();
        }
    });
}
//exports.start = start;

function afficherClients(clients:Client[]) {
    clients.forEach( (c:Client) => console.log(c.nom, c.prenoms));
}

function messageChambreDispo(numero:string, disponibilite:boolean) {
    if (disponibilite) {
        console.log(`La chambre numéro ${numero} est disponible`)
    }
    else {
        console.log(`La chambre numéro ${numero} n'est pas disponible`)
    }
}