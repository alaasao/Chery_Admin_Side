import React, { useEffect, useState } from "react";

import Main from "../../utils/Main.tsx";
import axios from "axios";
import Loading from "../../utils/Loading.tsx";

const Rdv = () => {
  const [data, setData] = useState([])
  const [allData,setAllData]=useState([])
  const [objType,setObjType] = useState<Rdv_Type>(Rdv_Type.RDV_VENTE_VOITURE)
const [loading,setLoading]=useState(true)
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "rdv", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     }
    })
    res.then((response) => {
    setLoading(false)
      setAllData(response.data)
     
    })

  }, [])
  useEffect(() => {
    setData(allData.filter((el: RdvType) => el.Rdv_Type === objType))
    
  },[allData,objType])
  if (loading)
{return <Loading/>
}  return (
    <div>
       <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] grid grid-cols-3 ">
        <div
           onClick={()=>{setObjType(Rdv_Type["RDV_VENTE_VOITURE"])}}
          className={`${
            objType==="RDV_VENTE_VOITURE" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px] cursor-pointer`}
        >
          Véhicules
        </div>
        <div    onClick={()=>{setObjType(Rdv_Type["RDV_VENTE_PIECE"])}}
   
 
          className={`${
            objType==="RDV_VENTE_PIECE" ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px] cursor-pointer `}
        >
          Pièces
        </div>
        <div
      onClick={()=>{setObjType(Rdv_Type["RDV_AUTRE"])}}
          className={`${
            objType==="RDV_REPARATION"  ? "shadow-xl" : ""
          } flex justify-center items-center h-[53px] cursor-pointer `}
        >
          Videnge
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
  RDV_VENTE_VOITURE = "RDV_VENTE_VOITURE",
  RDV_VENTE_PIECE = "RDV_VENTE_PIECE",
  RDV_REPARATION = "RDV_REPARATION",
  RDV_AUTRE = "RDV_AUTRE",
}