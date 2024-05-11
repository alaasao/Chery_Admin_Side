import { FC, useEffect, useState } from "react";

import React from "react";



import { CarsProps } from "../Cars.js";
import { FaArrowRight } from "react-icons/fa";
import FormSec from "./FormSec.jsx";
// import Title from "../../clients/components/Title.js";
import ImageForm from "./ImageForm.jsx";
import { uploadImages } from "../../../config/firebase/Upload_Images.jsx";
import DelButt from "../../../utils/DelButt.js";
import { useLocation } from "react-router-dom";

interface CarProps {
  carDefault: CarsProps;
  setCar: React.Dispatch<React.SetStateAction<CarsProps>>;
  readOnly: boolean;
  submit: boolean;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>
}
const Cared: FC<CarProps> = ({ carDefault, readOnly,setCar,setSubmit }: CarProps) => {
 const {pathname} = useLocation()
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

  async function createData() {
    const redImagesUploaded = redImages.length>0? await uploadImages(redImages):null;
    const blackImagesUploaded = blackImages.length>0? await uploadImages(blackImages):null;
    const blueImagesUploaded = blueImages.length>0?await uploadImages(blueImages):null;
    const grisImagesUploaded = grisImages.length>0?await  uploadImages(grisImages):null;
    const whiteImagesUploaded = whiteImages.length > 0 ? await uploadImages(whiteImages) : null;
    const images = []
    if (redImagesUploaded) {
      images.push({ Images: redImagesUploaded, Color: "rouge" })
    }
    if (blackImagesUploaded) {
      images.push({ Images: blackImagesUploaded, Color: "noir" })
    }
    if (blueImagesUploaded) {
      images.push({ Images: blueImagesUploaded, Color: "noir" })
    }
    if (grisImagesUploaded) {
      images.push({ Images: grisImagesUploaded, Color: "noir" })
    }
    if (whiteImagesUploaded) {
      images.push({ Images: whiteImagesUploaded, Color: "noir" })
    }
    
    const data = {
      Modele: modele,
      Moteur: moteur,
      Garentie: Garentie,
      Prix_TTC: Prix_TTC,
      Disponabilite: Disponabilite,
      MoteurObj: moteurObj,
      VehiculeObj: vehiculeObj,
      LookObj: LookObj,
      ConfortObj: ConfortObj,
      SecurityObj: SecurityObj,
      PromoObj: promoObj,
      Images: images,
      _id: car._id,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
      __v:car.__v
      
    };
  
    setCar(data);
    setSubmit(prev => !prev);
  }
  
  // Call createData when needed
  

  return (
    <div>
    
      <form onSubmit={createData} className="flex flex-col w-full">
        <div className=" py-[50px] rounded-2xl flex flex-col">
          <div className=" py-[50px] rounded-2xl flex flex-col">
            <div className="  text-4xl max-md:text-xl pl-[20px] text-[#494545] mb-[40px]">
              Veuillez remplir ces champs concernant le véhicule que vous
              souhaitez ajouter :{" "}
            </div>
            <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold max-md:text-xl">Modele</div>
                <input
                  type="string"
                  placeholder="Nom de modele"
                  value={modele}
                  readOnly={readOnly}
                  onChange={(e) => setModele(e.target.value)}
                  className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold max-md:text-xl">Moteur</div>
                <input
                  type="string"
                  placeholder="Nom de modele"
                  value={moteur}
                  readOnly={readOnly}
                  onChange={(e) => setMoteur(e.target.value)}
                  className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold max-md:text-xl">Garentie</div>
                <input
                  type="string"
                  placeholder="Nom de modele"
                  value={Garentie}
                  readOnly={readOnly}
                  onChange={(e) => setGarentie(e.target.value)}
                  className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold max-md:text-xl">Prix_TTC</div>
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
                  className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
                />
              </div>
              <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
                <div className="text-3xl font-bold max-md:text-xl"> Disponabilite</div>
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

 {pathname?.toLowerCase().includes("edit") ?(   <div>  <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold max-md:text-xl">Black Images</div>
          <ImageForm Images={blackImages} setImages={setBlackImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold max-md:text-xl">white Images</div>
          <ImageForm Images={whiteImages} setImages={setWhiteImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold max-md:text-xl">red Images</div>
          <ImageForm Images={redImages} setImages={setRedImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold max-md:text-xl">gray Images</div>
          <ImageForm Images={grisImages} setImages={setGrisImages} />
        </div>
        <div className="w-full pl-[20px]">
          <div className="text-3xl font-bold max-md:text-xl">blure Images</div>
          <ImageForm Images={blueImages} setImages={setBlueImages} />
          </div></div>) : (
            <div>
              {car.Images.map(obj => {
                return (
                  <div>
                    <h1 className="text-3xl font-bold capitalize mb-[20px]">{obj.Color} Images</h1>
                   <div className="flex flex-wrap items-center justify-center gap-[20px] mb-[20px]"> {obj.Images.map(image => {
                      return <img src={image} alt=""  className="h-[200px] w-[200px]"/>
                    })}</div>
                  </div>
                )
              })}
          </div>
          
          )}
        <div className="flex items-end justify-center gap-[20px] " >
          <DelButt id={car._id || ""} deleteRoute="car" back="/produits/cars" icon={false} name={modele} />
        <div
     onClick={createData}
        className="w-[140px] cursor-pointer bg-green-600 flex justify-center items-center h-[50px] text-white  gap-[10px] rounded-xl"
      >
        {" "}
        envoyer
        <FaArrowRight />
          </div>
          </div>
      </form>
    </div>
  );
};

export default Cared;
