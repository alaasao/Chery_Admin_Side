import React, { useEffect, useState } from "react";

import { Listbox } from "@headlessui/react";


import { RdvEtat, Rdv_Type } from "../Rdv";

import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { CarsProps } from "../../cars/Cars";


const AddRdv = () => {
  const [models, setModels] = useState([
    { id: "1", name: "arrizo 8", unavailable: false },
    { id: "2", name: "tiggo 8 pro", unavailable: false },
    { id: "3", name: "tiggo 6 pro", unavailable: false },
    { id: "4", name: "Benedict Kessler", unavailable: true },
    { id: "5", name: "Katelyn Rohan", unavailable: false },
  ]);

  useEffect(() => {
    const res = axios.get(`https://axeiny.tech:4004/car`);
    res.then((res) => {
      setModels(
        res.data.map((e:CarsProps) => {
         
          return( {
            id: e._id,
            name: e.Modele,
            unavailable: e.Disponabilite === "Disponible" 
          });
        })
      );
    });
    console.log(models);
  }, []);
  useEffect(() => {
   setSelectedModel(models[0])
   },[models])
  useEffect(() => {
    setSelectedModel(models[0])
  },[])
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [etat, setEtat] = useState(RdvEtat.EN_ATTENTE);
  const [rdvtype,setRdvtype]=useState(Rdv_Type.RDV_VENTE_VOITURE)
  const [etatOpen, setEtatOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [rdvOpen,setRdvOpen]=useState(false)
  const [rdv, setRdv] = useState({
    
    Name: "",
    Adresse: "",
    Phone: "",
    Email: "",
    Rdv_Type: Rdv_Type.RDV_VENTE_VOITURE,
    Date_Choisie: new Date(),
    Model: "",
    Etat: RdvEtat.EN_ATTENTE,
   
  });
  useEffect(() => {
    setRdv({ ...rdv, Etat: etat });
  }, [etat]);
  useEffect(() => {
    setRdv({...rdv,Rdv_Type:rdvtype})
  },[rdvtype])
  useEffect(() => {
    setRdv({ ...rdv, Model: selectedModel.name });
  }, [selectedModel]);
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
console.log(JSON.stringify(rdv))
   await axios.post(`https://axeiny.tech:4004/rdv/`, rdv, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
     
    window.location.href = "/rdv";
  }
  return (
    <div className="">
      <div className="my-[50px] text-3xl ml-[20px]">
        Les informations de la demande
      </div>
      <form
        onSubmit={submit}
        className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] "
      >
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">
            {" "}
            Nom et prénom
          </div>
          <input
            type={"text"}
            placeholder={`Entre le  Nom et le Prénom`}
            value={rdv.Name}
            onChange={(e) =>
              setRdv((prev) => ({ ...prev, Name: e.target.value }))
            }
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">
            Adresse du client{" "}
          </div>
          <input
            type={"text"}
            placeholder={`Entre l'dresse de Client `}
            value={rdv.Adresse}
            onChange={(e) => {
              setRdv((prev) => ({ ...prev, Adresse: e.target.value }));
            }}
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">
            {" "}
            Numero de téléphone
          </div>
          <input
            type={"text"}
            placeholder={`Entre le Numero de téléphone  `}
            value={rdv.Phone}
            onChange={(e) => {
              setRdv((prev) => ({ ...prev, Phone: e.target.value }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Email</div>
          <input
            type={"email"}
            placeholder={`Entre l'email  `}
            value={rdv.Email}
            onChange={(e) => {
              setRdv((prev) => ({ ...prev, Email: e.target.value }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> la Date</div>
          <input
            type={"date"}
            min={new Date().toISOString().split('T')[0]}
            placeholder={`  `}
            value={rdv.Date_Choisie.toISOString().slice(0, 10)}
            onChange={(e) => {
              setRdv((prev) => ({
                ...prev,
                Date_Choisie: new Date(e.target.value),
              }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
          />
        </div>

        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl "> Model</div>
          <Listbox value={selectedModel} onChange={setSelectedModel}>
            <Listbox.Button
              onClick={() => setModelOpen((prev) => !prev)}
              className=" flex outline-none justify-between bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border items-center border-black text-2xl max-sm:text-[16px]"
            >
              {selectedModel.name}{" "}
              {modelOpen ? (
                <FaAngleDown className="text-2xl" />
              ) : (
                <FaAngleUp className="text-2xl" />
              )}
            </Listbox.Button>
            <Listbox.Options className={""}>
              {models.map((model) => (
                <Listbox.Option
                  key={model.id}
                  value={model}
                  disabled={!model.unavailable}
      
                  className="cursor-pointer h-[56px]  bg-white flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {model.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
       
        </div>
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Etat</div>
          <Listbox value={etat} onChange={setEtat}>
            <Listbox.Button
              onClick={() => setEtatOpen((prev) => !prev)}
              className=" flex justify-between outline-none bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border items-center border-black text-2xl max-sm:text-[16px]"
            >
              {etat}{" "}
              {etatOpen ? (
                <FaAngleDown className="text-2xl" />
              ) : (
                <FaAngleUp className="text-2xl" />
              )}
            </Listbox.Button>
            <Listbox.Options className={""}>
              {RdvEtatList.map((etat) => (
                <Listbox.Option
                  value={etat}
                  className="cursor-pointer h-[56px] bg-white flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {etat}{" "}
                  <div className="flex gap-[5px] md:gap-[15px] ">
                    {etat === "EN_ATTENTE" ? (
                      <img src="../../assets/rdv/onHold.png" />
                    ) : etat === "CONFIRMER" ? (
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
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Type</div>
          <Listbox value={rdvtype} onChange={setRdvtype}>
            <Listbox.Button
              onClick={() => setRdvOpen((prev) => !prev)}
              className=" flex justify-between outline-none bg-[#F6F7F9] h-[56px] px-[30px] mt-[16px] w-full cursor-pointer rounded-xl border items-center border-black text-2xl max-sm:text-[16px]"
            >
              {rdvtype}{" "}
              {rdvOpen ? (
                <FaAngleDown className="text-2xl" />
              ) : (
                <FaAngleUp className="text-2xl" />
              )}
            </Listbox.Button>
            <Listbox.Options className={""}>
              {RdvTypeList.map((rdv) => (
                <Listbox.Option
                  value={rdv}
                  className="cursor-pointer h-[56px] bg-white flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {rdv}{" "}
              
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        
        </div>
        <div className="justify-center w-full col-span-2 mb-[50px]">
          <button
            type="submit"
            className="w-[180px] cursor-pointer bg-[#DB2719] mb-[100px] mx-auto flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px]  rounded-xl"
          >
            {" "}
            envoyer
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRdv;
const RdvEtatList = ["EN_ATTENTE", "CONFIRMER", "ANNULE"];
const RdvTypeList=["RDV_VENTE_VOITURE","RDV_VENTE_PIECE","RDV_REPARATION","RDV_AUTRE"]