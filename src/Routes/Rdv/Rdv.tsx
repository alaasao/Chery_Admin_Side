import React, { useEffect, useState } from "react";

import Main from "../../utils/Main.tsx";
import axios from "axios";
import { div } from "react-router-dom";

const Rdv = () => {
  const [data, setData] = useState([])
  const [objType,setObjType] = useState<Rdv_Type>(Rdv_Type.RDV_VENTE)
  const path = window.location.pathname;
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "rdv", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFsYWFAZ21haWwuY29tIiwiaWQiOiI2NjMyNzM5ZGMyOGEwODViMmUzZTE1NjgiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQ3ODE1MTUsImV4cCI6MTcxNzM3MzUxNX0.oRfHgjt6CNRIakX_ysrd20tvoZYf4RWvCTAbR_uh4bM`,
      }
    })
    res.then((response) => {
    
      setData(response.data.filter((obj: RdvType) => obj.Rdv_Type === objType))
     
    })

  }, [])
  
  return (
    <div>
       <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] grid grid-cols-3 ">
        <div
          
          className={`${
            objType ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px]`}
        >
          Véhicules
        </div>
        <div
 
          className={`${
            path === "/produits/pieces" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px] `}
        >
          Pièces
        </div>
        <div
      
          className={`${
            path === "/produits/pieces" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px] `}
        >
          Pièces
        </div>
      </div>
      <div className="w-full pl-[4%] text-3xl font-medium mb-[40px] mt-[36px] ">
      Liste des demandes
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
    _id: string;
    Name: string;
    Adresse: string;
    Phone: string;
    Email: string;
    Date_Choisie: Date;
    Model: string;
    Etat: RdvEtat;
  Reponse: string;
  Rdv_Type: Rdv_Type;
}
export enum Rdv_Type {
  RDV_VENTE = "RDV_VENTE",
  RDV_REPARATION = "RDV_REPARATION",
  RDV_ENTRETIEN = "RDV_ENTRETIEN",
  RDV_DIAGNOSTIC = "RDV_DIAGNOSTIC",
  RDV_REMORQUAGE = "RDV_REMORQUAGE",
  RDV_AUTRE = "RDV_AUTRE",
}