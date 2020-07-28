export interface Client{
     nom:string;
     prenoms:string;
}
export interface Hotel{
    nom:string;
    nombreEtoiles:number;
}

export interface Chambre{
    numero:string;
    surface:number;
    hotel:Hotel;
}
export interface Reservation{
    dateDebut:Date;
    dateFin:Date;
    client:Client;
    chambres:Chambre[];
}