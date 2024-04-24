import { FC, useEffect, useState } from "react";

import React from "react";

import axios from "axios";

import { CarsProps } from "../Cars";
import { FaArrowRight } from "react-icons/fa";
import FormSec from "./FormSec.jsx";
// import Title from "../../clients/components/Title.js";
import ImageForm from "./ImageForm.jsx";
interface CarProps {
  carDefault: CarsProps;
  readOnly: boolean;
}
const Car: FC<CarProps> = ({ carDefault, readOnly }: CarProps) => {
  console.log("########");
  console.log(carDefault);
  console.log("########");
  const [car] = useState<CarsProps>(carDefault);

  const [modele, setModele] = useState(car?.Modele || "");
  const [moteur, setMoteur] = useState(car?.Moteur || "");
  const [Garentie, setGarentie] = useState(car?.Garentie || "");
  const [Prix_TTC, setPrix_TTC] = useState(car?.Prix_TTC || 0);
  const [Disponabilite, setDisponabilite] = useState(
    car?.Disponabilite || "Non Disponible"
  );

  const [moteurObj, setMoteurObj] = useState(car?.MoteurObj);
  const [vehiculeObj, setVehiculeObj] = useState(car?.VehiculeObj);
  const [LookObj, setLookObj] = useState(car?.LookObj);
  const [ConfortObj, setConfortObj] = useState(car?.ConfortObj);
  const [SecurityObj, setSecurityObj] = useState(car?.SecurityObj);
  const [promoObj, setPromoObj] = useState(car?.PromoObj);
  const [Images, setImages] = useState<{ Images: string[]; Color: string }[]>(
    []
  );
  const [redImages, setRedImages] = useState<string[]>([]);
  const [blackImages, setBlackImages] = useState<string[]>([]);
  const [blueImages, setBlueImages] = useState<string[]>([]);
  const [grisImages, setGrisImages] = useState<string[]>([]);
  const [whiteImages, setWhiteImages] = useState<string[]>([]);

  useEffect(() => {
    setModele(car?.Modele || "");
    setMoteur(car?.Moteur || "");
    setGarentie(car?.Garentie || "");
    setPrix_TTC(car?.Prix_TTC || 0);
    setDisponabilite(car?.Disponabilite || "Non Disponible");
    setMoteurObj(car?.MoteurObj);
    setVehiculeObj(car?.VehiculeObj);
    setLookObj(car?.LookObj);
  }, [car]);
  // useEffect(() => {
  //   console.log(id, real_id);
  //   setCar( data.filter((e) => e._id == real_id)[0]||CarModel);
  // }, [data, real_id, id]);
 
  function submit() {
    const form = new FormData();
    form.append("MoteurObj", JSON.stringify(moteurObj));
    form.append("ConfortObj", JSON.stringify(ConfortObj));
    form.append("SecurityObj", JSON.stringify(SecurityObj));
    form.append("LookObj", JSON.stringify(LookObj));
    form.append("PromoObj", JSON.stringify(promoObj));
    form.append("VehiculeObj", JSON.stringify(vehiculeObj));
    if (blackImages.length > 0) {
      setImages([...Images, { Images: blackImages, Color: "Noir" }]);
    }
    if (whiteImages.length > 0) {
      setImages([...Images, { Images: whiteImages, Color: "blanc" }]);
    }
    if (redImages.length > 0) {
      setImages([...Images, { Images: redImages, Color: "rouge" }]);
    }
    if (grisImages.length > 0) {
      setImages([...Images, { Images: grisImages, Color: "gris" }]);
    }
    if (blueImages.length > 0) {
      setImages([...Images, { Images: blueImages, Color: "blue" }]);
    }

    form.append("Images", JSON.stringify(Images));
    form.append("Modele", JSON.stringify(modele));
    form.append("Moteur", JSON.stringify(moteur));
    form.append("Garentie", JSON.stringify(Garentie));
    form.append("Prix_TTC", JSON.stringify(Prix_TTC));
    form.append("Disponabilite", JSON.stringify(Disponabilite));
    // form.append("createdAt", JSON.stringify("kk"));
    // form.append("updatedAt", JSON.stringify("kk"));
    // form.append("__v", JSON.stringify(0));

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
    
      <form action="" className="flex flex-col w-full">
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
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
                      if (readOnly) {
                        return;
                      } else {
                        setDisponabilite(() => {
                          return e.target.checked
                            ? "Disponible"
                            : "Non Disponible";
                        });
                      }
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
              readonly={readOnly}
              title="Moteur"
            />
          )}
          {ConfortObj && (
            <FormSec
              data={ConfortObj}
              setData={setConfortObj}
              readonly={readOnly}
              title="Confort"
            />
          )}
          {SecurityObj && (
            <FormSec
              data={SecurityObj}
              setData={setSecurityObj}
              readonly={readOnly}
              title="Security"
            />
          )}
          {LookObj && (
            <FormSec
              data={LookObj}
              setData={setLookObj}
              readonly={readOnly}
              title="Look"
            />
          )}
          {vehiculeObj && (
            <FormSec
              data={vehiculeObj}
              setData={setVehiculeObj}
              readonly={readOnly}
              title="vehicule"
            />
          )}
          {promoObj && (
            <FormSec
              data={promoObj}
              setData={setPromoObj}
              readonly={readOnly}
              title="Promo"
            />
          )}
        </div>

        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold">Black Images</div>
          <ImageForm Images={blackImages} setImages={setBlackImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold">white Images</div>
          <ImageForm Images={whiteImages} setImages={setWhiteImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold">red Images</div>
          <ImageForm Images={redImages} setImages={setRedImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold">gray Images</div>
          <ImageForm Images={grisImages} setImages={setGrisImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold">blure Images</div>
          <ImageForm Images={blueImages} setImages={setBlueImages} />
        </div>
        <div
          onClick={submit}
          className="w-[180px] cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
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
