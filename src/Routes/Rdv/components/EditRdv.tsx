import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Listbox } from "@headlessui/react";
import { RdvType } from "../Rdv";
import { Rdv_Type, RdvEtat } from "../Rdv";

import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import DelButt from "../../../utils/DelButt";

import { CarsProps } from "../../cars/Cars";

const EditRdv = () => {
  const [models, setModels] = useState([
    { id: 1, name: "arrizo 8", unavailable: false },
    { id: 2, name: "tiggo 8 pro", unavailable: false },
    { id: 3, name: "tiggo 6 pro", unavailable: false },
    { id: 4, name: "Benedict Kessler", unavailable: true },
    { id: 5, name: "Katelyn Rohan", unavailable: false },
  ]);

  useEffect(() => {

    const res = axios.get(`https://axeiny.tech:4004/car`);
    res.then((res) => {
      setModels(
        res.data.map((e:CarsProps) => {
          return {
            id: e._id,
            name: e.Modele,
            unavailable: e.Disponabilite === "Disponible",
          };
        })
      );
    });
    console.log(models);
  }, []);
  const [selectedModel, setSelectedModel] = useState({ id: 1, name: "", unavailable: false });
  const [etat, setEtat] = useState(RdvEtat.EN_ATTENTE);
  const { id } = useParams();
  const [etatOpen, setEtatOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const [rdv, setRdv] = useState<RdvType>({
    _id: "",
    Name: "",
    Adresse: "",
    Phone: "",
    Email: "",
    Rdv_Type: Rdv_Type.RDV_VENTE,
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
    axios.get(import.meta.env.VITE_Main_ENDPOINT + "rdv/" + id, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFsYWFAZ21haWwuY29tIiwiaWQiOiI2NjMyNzM5ZGMyOGEwODViMmUzZTE1NjgiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQ3ODE1MTUsImV4cCI6MTcxNzM3MzUxNX0.oRfHgjt6CNRIakX_ysrd20tvoZYf4RWvCTAbR_uh4bM`,
      }
    }).then((response) => { 
      
      setRdv(response.data)
      setLoading(false)
    })
  }, []);
  
  useEffect(() => {
  
    const model = models.filter((e)=>e.name===rdv.Model)[0]
    if (model) {
      setSelectedModel(model)
    }

  }, [models, rdv])
  useEffect(() => {
    setEtat(rdv.Etat)
  },[rdv])
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();

  await axios.put(
      `https://axeiny.tech:4004/rdv/${id}`,
    rdv,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFsYWFAZ21haWwuY29tIiwiaWQiOiI2NjMyNzM5ZGMyOGEwODViMmUzZTE1NjgiLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MTQ3ODE1MTUsImV4cCI6MTcxNzM3MzUxNX0.oRfHgjt6CNRIakX_ysrd20tvoZYf4RWvCTAbR_uh4bM`,
        },
      }
    );
    window.location.href = "/rdv/"+id;


  }

  if (loading) {
    return <div>... loading</div>;
  }

  return (
    <div>
      <div className="my-[50px] text-3xl ml-[20px]">
        Les informations de la demande
      </div>
      <form onSubmit={submit} className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
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
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
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
            className=" flex outline-none justify-between text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
          />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto ">
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
            value={new Date( rdv.Date_Choisie).toISOString().slice(0, 10)}
            onChange={(e) => {
              setRdv((prev) => ({
                ...prev,
                Date_Choisie: new Date(e.target.value),
              }));
            }}
            className=" flex  justify-between outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
               />
        </div>

        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto ">
          <div className="text-3xl font-bold max-sm:text-xl"> Model</div>
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
            <Listbox.Options
             
            >
              {models.map((model) => (
                <Listbox.Option
                  key={model.id}
                  value={model}
                  disabled={!model.unavailable}
                  className="cursor-pointer h-[56px] flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {model.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

      </div>
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto ">
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
            <Listbox.Options
             
            >
              {RdvEtatList.map((etat) => (
                <Listbox.Option
                  value={etat}
                  key={etat}
                  className="cursor-pointer h-[56px] flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
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
        <div className="flex items-end justify-end gap-[20px] " >
        <DelButt id={rdv._id} deleteRoute="rdv"/>
        <button
        type="submit"
        className="w-[140px] cursor-pointer bg-green-600 flex justify-center items-center h-[50px] text-white  gap-[10px] rounded-xl"
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

export default EditRdv;

const RdvEtatList = ["EN_ATTENTE", "CONFIRMER", "ANNULE"];
