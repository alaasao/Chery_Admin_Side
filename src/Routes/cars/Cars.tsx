import { useEffect, useState } from "react";
import { userType } from "../../utils/Main";
import React from "react";

import axios from "axios";
import Main from "../../utils/Main";
import { EventType } from "../events/Events";
import { Link, useLocation } from "react-router-dom";

const Cars = () => {
  const [data, setData] = useState<(userType | CarsProps | EventType)[]>([]);
  const path = useLocation().pathname;
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
      <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] grid grid-cols-2 ">
        <Link
          to="/produits/cars"
          className={`${
            path === "/produits/cars" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px]`}
        >
          Véhicules
        </Link>
        <Link
          to="/produits/pieces"
          className={`${
            path === "/produits/pieces" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px] `}
        >
          Pièces
        </Link>
      </div>
      <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] ">
        Liste des {path === "/produits/cars" ? "Véhicules" : "Pièces"}
      </div>
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
export interface PromoObj {
  IsPromo: boolean;
  Start: string;
  End: string;
  Value: number;
}
export interface CarsProps {
  _id: string;

  Images: { Images: string[]; Color: string }[];
  Modele: string;
  Garentie: string;
  Disponabilite: string;
  Prix_TTC: number;
  Moteur: string;
  PromoObj: PromoObj;
  MoteurObj: MoteurObj;
  ConfortObj: ConfortObj;
  SecurityObj: SecurityObj;
  LookObj: LookObj;
  VehiculeObj: VehiculeObj;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
