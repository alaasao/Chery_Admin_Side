

export enum RdvEtat {
  EN_ATTENTE = "EN_ATTENTE",
  CONFIRMER = "CONFIRMER",
  ANNULE = "ANNULE",
}
export enum Rdv_Type {
  RDV_VENTE_VOITURE = "RDV_VENTE_VOITURE",
  RDV_VENTE_PIECE = "RDV_VENTE_PIECE",
  RDV_REPARATION = "RDV_REPARATION",
  RDV_AUTRE = "RDV_AUTRE",
}
const data = [
    {
        id:"0",
      Name: 'John Doe',
      Adresse: '123 Main St, Anytown, USA',
      Phone: '123-456-7890',
      Email: 'john.doe@example.com',
      Date_Choisie: new Date(),
      Model: 'Model X',
      Etat: RdvEtat.EN_ATTENTE,
    Reponse: 'Pending',
      Rdv_Type:Rdv_Type.RDV_VENTE_VOITURE
    },
    {
        id:"1",
      Name: 'Jane Smith',
      Adresse: '456 Elm St, Anytown, USA',
      Phone: '987-654-3210',
      Email: 'jane.smith@example.com',
      Date_Choisie: new Date(),
      Model: 'Model Y',
      Etat: RdvEtat.CONFIRMER,
      Reponse: 'Confirmed',  Rdv_Type:Rdv_Type.RDV_VENTE_VOITURE
    },
    {
        id:"2",
      Name: 'Bob Johnson',
      Adresse: '789 Pine St, Anytown, USA',
      Phone: '456-789-1230',
      Email: 'bob.johnson@example.com',
      Date_Choisie: new Date(),
      Model: 'Model Z',
      Etat: RdvEtat.ANNULE,
      Reponse: 'Cancelled',  Rdv_Type:Rdv_Type.RDV_VENTE_VOITURE
    },
];
export default data;
