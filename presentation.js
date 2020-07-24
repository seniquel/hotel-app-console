var readline = require('readline');
var service = require("./service.js");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function start() {
    menu = `
1. Lister les clients
2. Ajouter un client
3. Rechercher un client par nom
4. Vérifier la disponibilité d'une chambre
99. Sortir
`;
    rl.question(menu, saisie => {
        switch (saisie) {
            case "1":
                console.log("\n>> Liste des clients\n");
                service.listerClients(clients => {
                    afficherClients(clients);
                    start();
                });
                break;
            case "2":
                var nom, prenoms;
                rl.question("\nVeuillez renseigner un nom\n", saisie_nom => {
                    nom = saisie_nom;
                    rl.question("\nVeuillez renseigner un prenom\n", saisie_prenoms => {
                        prenoms = saisie_prenoms
                        var client = { nom: nom, prenoms: prenoms };
                        service.ajouterClient(client);
                        start();
                    }
                    );
                });
                break;
            case "3":
                rl.question("\nVeuiller entrer un nom de client\n", saisie_client => {
                    service.chercherClient(saisie_client, clients => {
                        afficherClients(clients);
                        start();
                    })
                });
                break;
            case "4":
                rl.question("\nVeuiller entrer le numéro de la chambre\n", saisie_chambre => {
                    service.chercherChambre(saisie_chambre, chambreDispo => {
                        messageChambreDispo(saisie_chambre, chambreDispo)
                        start();
                    })
                });
                break;
            case "99":
                console.log("\nAu revoir\n");
                rl.close();
                break;
            default:
                start();
        }
    });
}
exports.start = start;

function afficherClients(clients) {
    clients.forEach(c => console.log(c.nom, c.prenoms));
}

function messageChambreDispo(numero, disponibilité) {
    if (disponibilité) {
        console.log("La chambre numéro", numero, "est disponible")
    }
    else {
        console.log("La chambre numéro", numero, "n'est pas disponible")
    }
}