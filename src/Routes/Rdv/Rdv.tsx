import React from "react";

import Main from "../../utils/Main.tsx";
import data from "./components/data.ts";
const Rdv = () => {
  return (
    <div>
      <div className="w-full pl-[4%] text-3xl font-medium mb-[40px] mt-[36px] ">
        Liste des quetions
      </div>
      <Main data={data} />
    </div>
  );
};

export default Rdv;
export enum RdvEtat {
    EN_ATTENTE = "EN_ATTENTE",
    CONFIRMER = "CONFIRMER",
    ANNULE = "ANNULE",
  }
  
export interface RdvType {
    id: string;
    Name: string;
    Adresse: string;
    Phone: string;
    Email: string;
    Date_Choisie: Date;
    Model: string;
    Etat: RdvEtat;
    Reponse: string;
}
