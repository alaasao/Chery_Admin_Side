import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

import axios from "axios";

import { CarsProps } from "../Cars";
import { FaArrowRight } from "react-icons/fa";
import FormSec from "./FormSec.jsx";
import Title from "../../clients/components/Title.js";
import ImageForm from "./ImageForm.jsx";
const Car = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarsProps>();
  const [data, setData] = useState<CarsProps[]>([]);
  const [modele, setModele] = useState(car?.Modele || "");
  const [moteur, setMoteur] = useState(car?.Moteur || "");
  const [Garentie, setGarentie] = useState(car?.Garentie || "");
  const [Prix_TTC, setPrix_TTC] = useState(car?.Prix_TTC || 0);
  const [Disponabilite, setDisponabilite] = useState(
    car?.Disponabilite || "Non Disponible",
  );
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
  const [Images, setImages] = useState<string[]>([]);

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
    setModele(data[0]?.Modele);
    setMoteur(data[0]?.Moteur);
    setGarentie(data[0]?.Garentie);
    setPrix_TTC(data[0]?.Prix_TTC);
    setDisponabilite(data[0]?.Disponabilite);
  }, [data, id, moteurObj]);
  function submit() {
    const form = new FormData();
    form.append("MoteurObj", JSON.stringify(moteurObj));
    form.append("ConfortObj", JSON.stringify(ConfortObj));
    form.append("SecurityObj", JSON.stringify(SecurityObj));
    form.append("LookObj", JSON.stringify(LookObj));
    form.append("PromoObj", JSON.stringify(promoObj));
    form.append("VehiculeObj", JSON.stringify(vehiculeObj));
    form.append("Images", JSON.stringify([{ Images: Images, Color: "red" }]));
    form.append("Modele", JSON.stringify(modele));
    form.append("Moteur", JSON.stringify(moteur));
    form.append("Garentie", JSON.stringify(Garentie));
    form.append("Prix_TTC", JSON.stringify(Prix_TTC));
    form.append("Disponabilite", JSON.stringify(Disponabilite));
    form.append("createdAt", JSON.stringify("kk"));
    form.append("updatedAt", JSON.stringify("kk"));
    form.append("__v", JSON.stringify(0));

    axios
      .post(`https://axeiny.tech:4004/car`, form)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Title title="information de Vehicule" />
      <form action="">
        <div className=" py-[50px] rounded-2xl flex flex-col">
          <div className=" py-[50px] rounded-2xl flex flex-col">
            <div className="  text-4xl pl-[20px] mb-[20px] text-[#494545] mb-[40px]">
              Veuillez remplir ces champs concernant le véhicule que vous
              souhaitez ajouter :{" "}
            </div>
            <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold">Modele</div>
                <input
                  type="string"
                  placeholder="Nom de modele"
                  value={modele}
                  onChange={(e) => setModele(e.target.value)}
                  className=" flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold">Moteur</div>
                <input
                  type="string"
                  placeholder="Nom de modele"
                  value={moteur}
                  onChange={(e) => setModele(e.target.value)}
                  className=" flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold">Garentie</div>
                <input
                  type="string"
                  placeholder="Nom de modele"
                  value={Garentie}
                  onChange={(e) => setGarentie(e.target.value)}
                  className=" flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold">Prix_TTC</div>
                <input
                  type="number"
                  placeholder="Prix_TTC"
                  value={Prix_TTC}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    if (inputValue < 0) return;

                    setPrix_TTC(inputValue);
                  }}
                  className=" flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold"> Disponabilite</div>
                <div className="flex h-[56px]  gap-[10] items-center pl-[30px] mt-[16px] text-2xl ">
                  <input
                    type="checkbox"
                    placeholder="Votre nom "
                    defaultChecked={
                      Disponabilite === "Disponible" ? true : false
                    }
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setDisponabilite(() => {
                        return e.target.checked
                          ? "Disponible"
                          : "Non Disponible";
                      });
                    }}
                    className="  flex outline-none bg-[#F6F7F9] h-[30px] w-[40px] cursor-pointer rounded-xl border border-black"
                  />
                  Disponible
                </div>
              </div>
            </div>
          </div>
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
          <ImageForm Images={Images} setImages={setImages} />
        </div>
        <div
          onClick={submit}
          className="w-[180px] cursor-pointer bg-[#DB2719] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
        >
          {" "}
          envoyer
          <FaArrowRight />
        </div>
      </form>
    </div>
  );
};

export default Car;
