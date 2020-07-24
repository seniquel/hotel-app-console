var readline = require('readline');
var service = require("./service.js");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });


function start(){
    menu = "\n1. Lister les clients\n99. Sortir\n";
    rl.question(menu,saisie => {
        if(saisie == 1){
            console.log("\n>> Liste des clients\n");
            service.listerClients();
            start();
        }
        if(saisie == 99){
            console.log("\nAu revoir\n");
            rl.close();
        }
        else{
            start();
        }
    })
}
exports.start = start;