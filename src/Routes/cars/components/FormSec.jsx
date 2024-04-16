import { useEffect, useState } from "react";


import React from "react";

const FormSec = ({ data, setData, readonly, title }) => {
  const [list, setList] = useState(data);
  useEffect(() => {
    setData(list);
  }, [list, setData]);

  return (
    <div className=" py-[50px] rounded-2xl flex flex-col">
      <div className="font-bold   text-4xl pl-[20px] mb-[20px]">{title}</div>
      <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
        {Object.entries(list).map(([key, value], index) => {
          return typeof value == "boolean" ? (
            <div
              className="flex flex-col w-full max-md:w-[80%] mx-auto "
              key={index + key}
            >
              <div className="text-3xl font-bold"> {titles[key]}</div>
              <div className="flex h-[56px]  gap-[10] items-center pl-[30px] mt-[16px] text-2xl ">
                <input
                  type="checkbox"
                  placeholder="Votre nom "
                  defaultChecked={value ? true : false}
                  readOnly={readonly}
                  onChange={() =>
                    setData((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className="  flex outline-none bg-[#F6F7F9] h-[30px] w-[40px] cursor-pointer rounded-xl border border-black"
                />
                Disponible
              </div>
            </div>
          ) : typeof value == "number" ? (
            <div
              className="flex flex-col w-full max-md:w-[80%] mx-auto "
              key={index + key}
            >
              <div className="text-3xl font-bold">{titles[key]}</div>
              <input
                type={"number"}
                placeholder={`Entre le ${key}`}
                value={value}
                readOnly={readonly}
                onChange={(e) => {
                  const inputValue = Number(e.target.value);
                  if (inputValue < 0) {
                    return;
                  }
                  setList((prev) => ({ ...prev, [key]: inputValue }));
                }}
                className=" flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
              />
            </div>
          ) : typeof value == "string" ? (
            <div
              className="flex flex-col w-full max-md:w-[80%] mx-auto "
              key={index + key}
            >
              <div className="text-3xl font-bold">{titles[key]}</div>
              <input
                type={"text"}
                placeholder={`Entre le ${key}`}
                value={value}
                readOnly={readonly}
                onChange={(e) =>
                  setList((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className=" flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
              />
            </div>
          ) : (
            <div
              className="flex flex-col w-full max-md:w-[80%] mx-auto "
              key={index + key}
            >
              <div className="text-3xl font-bold">{titles[key]}</div>
              <input
                type={"text"}
                placeholder={`Entre le ${key}`}
                value={value.join("-")}
                readOnly={readonly}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormSec;
const titles = {
  Energie: "Energie",
  Motricite: "Motricite",
  Type_Moteur: "Type De Moteur",
  Cylidree: "Cylidree",
  Boite: "Boite",
  Consomation: "Consomation",
  Puissance: "Puissance",
  Nombre_Cylindres: "Nombre Cylindres",
  Soupapes: "Soupapes",
  Accelaration: "Accelaration de 0 à 100",
  Puissance_Tr: "Puissance Tr",
  Turbo: "Turbo",
  Nombre_Rapport_Boite: "Nombre De Rapport Boite",
  Vitesse_Max: "Vitesse Max",
  Couple: "Couple",
  Climatisation: "Climatisation",
  Direction: "Direction",
  Ecran: "Ecran",
  Accoudoir: "Accoudoir",
  Sieges_Chauffants: "Sieges Chauffants",
  Boire_A_Gants_Refrigerante: "Boite a gants refrigerante",
  Ordinateur_De__Bord: "Ordinateur De Bord",
  Radar_De_Recul: "Radar De Recul",
  Autoradio: "Autoradio",
  bluetooth: "bluetooth",
  Airbag: "Airbag",
  Regulateur_Limiteur_de_Vitesse: "Regulateur Limiteur de Vitesse",
  Abs: "Abs",
  Keyless: "Keyless",
  Esp: "Esp",
  Détecteur_Angle_Mort: "Détecteur Angle Mort",
  Aide_Demarrage_Cote: "Aide Demarrage Cote",
  Anti_Demarrage: "AntiDemarrage",
  Verrouillage_Centralise: "VerrouillageCentralise",
  Alarme: "Alarme",
  Feux_Anti_Arouillard: "Feux Anti Arouillard",
  Feux_Avant: "Feux Avant",
  Peinture_Metalisee: "Peinture Metalisee",
  Toit: "Toit",
  Vitres_Teintees: "Vitres Teintees",
  Feux_Jour: "Feux Jour",
  Feux_Arriere: "Feux Arriere",
  Jantes: "Jantes",
  Couleur_Poignees: "Couleur Poignees",
  Dimension_Pneumatique: "Dimension Pneumatiqueing",
  Volume_Coffre: "Volume Coffre",
  Longueur: "Longueur",
  Largeur: "Largeur",
  Hauteur: "Hauteur",
  Empattement: "Empattement",
  Suspension_Avant: "string",
  Suspension_Arriere: "Suspension Arriere",
  Nombre_Places: "Nombre Places",
  Nombre_Portes: "Nombre Portes",
  Reservoir: "Reservoir",
};