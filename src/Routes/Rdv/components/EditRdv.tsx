import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Listbox } from "@headlessui/react";
import data from "./data";
import { RdvType } from "../Rdv";
import { RdvEtat} from "./data";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
const models = [
  { id: 1, name: "arrizo 8", unavailable: false },
  { id: 2, name: "tiggo 8 pro", unavailable: false },
  { id: 3, name: "tiggo 6 pro", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const EditRdv = () => {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [etat, setEtat] = useState(RdvEtat.EN_ATTENTE);
    const { id } = useParams();
    const [etatOpen, setEtatOpen] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)
  const [rdv, setRdv] = useState<RdvType>({
    id: "",
    Name: "",
    Adresse: "",
    Phone: "",
    Email: "",
    Date_Choisie: new Date(),
    Model: "",
    Etat: RdvEtat.EN_ATTENTE,
    Reponse: "",
  });
  useEffect(() => {
    setRdv({ ...rdv, Etat: etat });
  }, [etat]);
  useEffect(() => {
    setRdv({ ...rdv, Model: selectedModel.name });
  }, [selectedModel]);
  useEffect(() => {
    setRdv(data.filter((e) => e.id === id)[0]);
  }, []);
  return (
    <div>
      <div className="my-[50px] text-3xl ml-[20px]">
        Les informations de la demande
      </div>
      <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl"> Nom et prénom</div>
          <input
            type={"text"}
            placeholder={`Entre le  Nom et le Prénom`}
            value={rdv.Name}
            onChange={(e) =>
              setRdv((prev) => ({ ...prev, Name: e.target.value }))
            }
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
      
                       
                  />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl">Adresse du client </div>
          <input
            type={"text"}
            placeholder={`Entre l'dresse de Client `}
            value={rdv.Adresse}
            onChange={(e) => {
              setRdv((prev) => ({ ...prev, Adresse: e.target.value }));
            }}
                className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
           />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl"> Numero de téléphone</div>
          <input
            type={"text"}
            placeholder={`Entre le Numero de téléphone  `}
            value={rdv.Phone}
            onChange={(e) => {
              setRdv((prev) => ({ ...prev, Phone: e.target.value }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
                 />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl"> Email</div>
          <input
            type={"email"}
            placeholder={`Entre l'email  `}
            value={rdv.Email}
            onChange={(e) => {
              setRdv((prev) => ({ ...prev, Email: e.target.value }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
                />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl"> la Date</div>
          <input
            type={"date"}
            placeholder={`  `}
            value={rdv.Date_Choisie.toISOString().slice(0, 10)}
            onChange={(e) => {
              setRdv((prev) => ({
                ...prev,
                Date_Choisie: new Date(e.target.value),
              }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
               />
        </div>

        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl"> Model</div>
          <Listbox value={selectedModel} onChange={setSelectedModel}>
                      <Listbox.Button onClick={() => setModelOpen(prev=>!prev)} className=" flex outline-none justify-between bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border items-center border-black text-2xl max-sm:text-[16px]">
              {selectedModel.name} {modelOpen?<FaAngleDown className="text-2xl"/>:<FaAngleUp  className="text-2xl"/>}
            </Listbox.Button>
            <Listbox.Options
              className={"absolute max-md:w-[80%] w-full   mt-[120px]"}
            >
              {models.map((person) => (
                <Listbox.Option
                  key={person.id}
                  value={person}
                  disabled={person.unavailable}
                  className="cursor-pointer h-[56px] flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {person.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl"> Etat</div>
          <Listbox value={etat} onChange={setEtat}>
            <Listbox.Button onClick={() => setEtatOpen(prev=>!prev)} className=" flex justify-between outline-none bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border items-center border-black text-2xl max-sm:text-[16px]">
              {etat} {etatOpen?<FaAngleDown className="text-2xl"/>:<FaAngleUp  className="text-2xl"/>}
            </Listbox.Button>
            <Listbox.Options
              className={"absolute max-md:w-[80%] w-full   mt-[120px]"}
            >
              {RdvEtatList.map((etat) => (
                <Listbox.Option
                  value={etat}
                  className="cursor-pointer h-[56px] flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {etat}{" "}
                  <div className="flex gap-[5px] md:gap-[15px] ">
                    {etat=== "EN_ATTENTE" ? (
                      <img src="../../assets/rdv/onHold.png" />
                    ) :etat=== "CONFIRMER" ? (
                      <img src="../../assets/rdv/done.png" alt="" />
                    ) : (
                      <img src="../../assets/rdv/canceled.png" alt="" />
                    )}
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default EditRdv;

const RdvEtatList = ["EN_ATTENTE", "CONFIRMER", "ANNULE"];
