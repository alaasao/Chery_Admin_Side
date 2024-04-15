import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

import axios from "axios";

import { CarsProps } from "../Cars";
import { FaArrowRight } from "react-icons/fa";
import FormSec from "./FormSec.jsx";
import Title from "../../clients/components/Title.js";
const Car = () => {
  const { id } = useParams();
  const [data, setData] = useState<CarsProps[]>([]);
  const [moteurObj, setMoteurObj] = useState({
    Energie: "",
    Motricite: "",
    Type_Moteur: "",
    Cylidree: 0,
    Boite: "",
    Consomation: "",
    Puissance: 0,
    Nombre_Cylindres: "",
    Soupapes: 0,
    Accelaration: 0,
    Puissance_Tr: 0,
    Turbo: false,
    Nombre_Rapport_Boite: 0,
    Vitesse_Max: 0,
    Couple: 0,
  });
  const [vehiculeObj, setVehiculeObj] = useState({
    Volume_Coffre: 0,
    Longueur: 0,
    Largeur: 0,
    Hauteur: 0,
    Empattement: 0,
    Suspension_Avant: "",
    Suspension_Arriere: "",
    Nombre_Places: 0,
    Nombre_Portes: 0,
    Reservoir: 0,
  });
  const [LookObj, setLookObj] = useState({
    Feux_Anti_Arouillard: ["", ""],
    Feux_Avant: "",
    Peinture_Metalisee: false,
    Toit: false,
    Vitres_Teintees: false,
    Feux_Jour: "",
    Feux_Arriere: "",
    Jantes: 0,
    Couleur_Poignees: "",
    Dimension_Pneumatique: "",
  });
  const [ConfortObj, setConfortObj] = useState({
    Climatisation: "",
    Direction: "",
    Ecran: "",
    Accoudoir: "",
    Sieges_Chauffants: false,
    Boire_A_Gants_Refrigerante: false,
    Ordinateur_De__Bord: false,
    Radar_De_Recul: false,
    Autoradio: "",
    bluetooth: false,
  });
  const [SecurityObj, setSecurityObj] = useState({
    Airbag: 0,
    Regulateur_Limiteur_de_Vitesse: "",
    Abs: false,
    Keyless: "",
    Esp: false,
    Détecteur_Angle_Mort: false,
    Aide_Demarrage_Cote: false,
    Anti_Demarrage: false,
    Verrouillage_Centralise: "",
    Alarme: "",
  });
  const [promoObj, setPromoObj] = useState({
    IsPromo: false,
    Start: "",
    End: "",
    Value: 0,
  });

  const [car, setCar] = useState<CarsProps>();
  console.log(car)
  const form = new FormData();
  const j = { jj: "dd" };
  form.append("motorObj", JSON.stringify(j));

  useEffect(() => {
    async function fetchData() {
      
      const response = await axios.get("https://axeiny.tech:4004/car/");
      setData(response.data);
      // ...
    }
    fetchData();
 
  }, []);
  useEffect(() => {
    setCar(data.filter((e) => e._id == id)[0]);

    setMoteurObj(data[0]?.MoteurObj);
    setConfortObj(data[0]?.ConfortObj);
    setSecurityObj(data[0]?.SecurityObj);
    setLookObj(data[0]?.LookObj);
    setPromoObj(data[0]?.PromoObj);
    setVehiculeObj(data[0]?.VehiculeObj);
   
  }, [data, id, moteurObj]);



  
  return (
    <div>
      <Title title="information de Vehicule" />
      <form action="">
        <div className=" py-[50px] rounded-2xl flex flex-col">
          {moteurObj && (
            <FormSec
              data={moteurObj}
              setData={setMoteurObj}
              readonly={false}
              title="Moteur"
            />
          )}
          {ConfortObj && (
            <FormSec
              data={ConfortObj}
              setData={setConfortObj}
              readonly={false}
              title="Confort"
            />
          )}
          {SecurityObj && (
            <FormSec
              data={SecurityObj}
              setData={setSecurityObj}
              readonly={true}
              title="Security"
            />
          )}
          {LookObj && (
            <FormSec
              data={LookObj}
              setData={setLookObj}
              readonly={true}
              title="Look"
            />
          )}
          {vehiculeObj && (
            <FormSec
              data={vehiculeObj}
              setData={setVehiculeObj}
              readonly={true}
              title="vehicule"
            />
          )}
          {promoObj && (
            <FormSec
              data={promoObj}
              setData={setPromoObj}
              readonly={true}
              title="Promo"
            />
          )}
        </div>

        <div>
          <div>Images</div>

        </div>
        <div className="w-[180px] bg-[#DB2719] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl">
          {" "}
          envoyer
          <FaArrowRight />
        
        </div>
      </form>
    </div>
  );
};

export default Car;
