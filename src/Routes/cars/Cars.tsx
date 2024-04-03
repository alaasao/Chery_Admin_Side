import { useEffect, useState } from "react";
import { userType } from "../clients/components/Main";
import Title from "../clients/components/Title";

import axios from "axios";
import Main from "../clients/components/Main";
import { EventType } from "../events/Events";

const Cars = () => {
  const [data, setData] = useState<(userType | CarsProps|EventType)[]>([]);
  useEffect(() => {
    axios.get("https://axeiny.tech:4004/car/").then((response) => {
      response.data;
      setData(response.data);
      // console.log(data, response.data, "mm");
    });

    // console.log(data, "sdfsqffq");
  }, []);
  return (
    <div className="w-full ">
      <Title title="produits" />

      <Main data={data} />
    </div>
  );
};

export default Cars;

export interface MoteurObj {
  Energie: string;
  Motricite: string;
  Type_Moteur: string;
  Cylidree: number;
  Boite: string;
  Consomation: string;
  Puissance: number;
  Nombre_Cylindres: string;
  Soupapes: number;
  Accelaration: number;
  Puissance_Tr: number;
  Turbo: boolean;
  Nombre_Rapport_Boite: number;
  Vitesse_Max: number;
  Couple: number;
}
export interface SecurityObj {
  Airbag: number;
  Regulateur_Limiteur_de_Vitesse: string;
  Abs: boolean;
  Keyless: string;
  Esp: boolean;
  Détecteur_Angle_Mort: boolean;
  Aide_Demarrage_Cote: boolean;
  Anti_Demarrage: boolean;
  Verrouillage_Centralise: string;
  Alarme: string;
}
export interface LookObj {
  Feux_Anti_Arouillard: string[];
  Feux_Avant: string;
  Peinture_Metalisee: boolean;
  Toit: boolean;
  Vitres_Teintees: boolean;
  Feux_Jour: string;
  Feux_Arriere: string;
  Jantes: number;
  Couleur_Poignees: string;
  Dimension_Pneumatique: string;
}
export interface VehiculeObj {
  Volume_Coffre: number;
  Longueur: number;
  Largeur: number;
  Hauteur: number;
  Empattement: number;
  Suspension_Avant: string;
  Suspension_Arriere: string;
  Nombre_Places: number;
  Nombre_Portes: number;
  Reservoir: number;
}
export interface ConfortObj {
  Climatisation: string;
  Direction: string;
  Ecran: string;
  Accoudoir: string;
  Sieges_Chauffants: boolean;
  Boire_A_Gants_Refrigerante: boolean;
  Ordinateur_De__Bord: boolean;
  Radar_De_Recul: boolean;
  Autoradio: string;
  bluetooth: boolean;
}
export interface CarsProps {
  _id: string;

  Images: { Images: string[]; Color: string }[];
  Modele: string;
  Garentie: string;
  Disponabilite: string;
  Prix_TTC: number;
  Moteur: string;
  PromoObj: {
    IsPromo: boolean;
    Start: string;
    End: string;
    Value: number;
  };
  MoteurObj: MoteurObj;
  ConfortObj: ConfortObj;
  SecurityObj: SecurityObj;
  LookObj: LookObj;
  VehiculeObj: VehiculeObj;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
