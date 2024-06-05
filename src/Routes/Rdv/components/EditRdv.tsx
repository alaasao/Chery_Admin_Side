/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Listbox } from "@headlessui/react";
import { RdvType } from "../Rdv";
import { Rdv_Type, RdvEtat } from "../Rdv";

import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa";
import axios from "axios";

import { CarsProps } from "../../cars/Cars";
import toast from "react-hot-toast";
import { PieceType } from "../../piece/Piece";
import Loading from "../../../utils/Loading";
import DelButt from "../../../utils/DelButt";

const EditRdv = () => {
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
    Rdv_Type: Rdv_Type.RDV_VENTE_VOITURE,
    Date_Choisie: new Date(),
    Model: "",
    Etat: RdvEtat.EN_ATTENTE,
    Reponse: "",
  });
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "car");
    res.then((res) => {
      setModels([
        ...res.data.map((e: CarsProps) => {
          return {
            _id: e._id,
            Name: e.Modele,
            Garentie: e.Garentie,
            unavailable: e.Disponabilite === "Disponible",
          };
        }),
        {
          _id: "",
          Name: "le rdv n'est pas pour acheter une voiture",
          unavailable: true,
          Garentie: "",
        },
      ]);
    });
  }, []);
  const [models, setModels] = useState([
    {
      _id: "",
      Name: "Veuillez choisir un model",
      unavailable: false,
      Garentie: "",
    },
  ]);
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const [pieces, setPieces] = useState([
    { _id: "", Name: "Veuillez choisir une pièce", unavailable: false },
  ]);
  const [pieceOpen, setPieceOpen] = useState(false);
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "piece");
    res.then((res) => {
      setPieces([
        ...res.data.map((e: PieceType) => {
          return {
            _id: e._id,
            Name: e.Name,
            unavailable: e.Quantity > 0,
          };
        }),
        { _id: "", Name: "le rdv n'est pas pour acheter une piece", unavailable: true },
      ]);
    });
  }, []);
  const [selectedPiece, setSelectedPiece] = useState(pieces[0]);
  useEffect(() => {
    setRdv({ ...rdv, Etat: etat });
  }, [etat]);
  useEffect(() => {
    setRdv({ ...rdv, Model: selectedModel.Name });
  }, [selectedModel]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_Main_ENDPOINT + "rdv/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRdv(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const model = models.filter((e) => e.Name === rdv.Model)[0];
    if (model) {
      setSelectedModel(model);
    }
  }, [models, rdv]);
  useEffect(() => {
    setEtat(rdv.Etat);
  }, [rdv]);
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (selectedModel._id !== "" && selectedPiece._id !== "") {
      toast.error("Veuillez choisir entre une voiture et une piece");
      return;
    }
    if (rdv.Name === "") {
      toast.error("Veuillez entre le nom");
      return;
    }
    if (rdv.Adresse === "") {
      toast.error("Veuillez entre l'adresse du rdv");
      return;
    }
    if (rdv.Phone === "") {
      toast.error("Veuillez entrer le numéro de téléphone");
      return;
    } else {
      const phoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
      if (!phoneRegex.test(rdv.Phone)) {
        toast.error("Veuillez entrer un numéro de téléphone algérien valide");
        return;
      }
    }
    if (rdv.Email === "") {
      toast.error("Veuillez entrer l'email");
      return;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(rdv.Email)) {
        toast.error("Veuillez entrer un email valide");
        return;
      }
    }

    setLoading(true);

    const finaltype=selectedModel._id !== ""
    ? Rdv_Type.RDV_VENTE_VOITURE
    : selectedPiece._id !== ""
    ? Rdv_Type.RDV_VENTE_PIECE
        : Rdv_Type.RDV_AUTRE
        const finalModel = selectedModel._id !== "" ? selectedModel.Name : selectedPiece._id !== ""?selectedPiece.Name:"rdv de videnge"
    
    await axios
      .put(
        import.meta.env.VITE_Main_ENDPOINT + "rdv/" + id,
     {
      
        
       ...rdv,Rdv_Type:finaltype,Model:finalModel
    },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("rdv mit a jour");
        setTimeout(() => {
          window.location.href = "/rdv";
        }, 1000);
        setLoading(false)
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
        setLoading(false);
      });
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <div>
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
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
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
            className=" flex outline-none justify-between text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
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
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
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
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> la Date</div>

          <input
            type={"date"}
           
            placeholder={`  `}
            value={new Date(rdv.Date_Choisie).toISOString().slice(0, 10)}
            onChange={(e) => {
              setRdv((prev) => ({
                ...prev,
                Date_Choisie: new Date(e.target.value),
              }));
            }}
            className=" flex  justify-between outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
          />
        </div>
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold mb-[16px] "> Model</div>
          <Listbox value={selectedModel} onChange={setSelectedModel}>
            <Listbox.Button
              onClick={() =>
                setModelOpen((prev) =>
                  selectedPiece._id === "" ? !prev : false
                )
              }
              className={`flex outline-none  bg-[#F6F7F9] h-[56px] px-[30px]  w-full cursor-pointer rounded-lg border items-center border-black text-xl max-sm:text-[16px] ${
                selectedModel.Name === "" ? "justify-end" : "justify-between"
              }`}
            >
              {selectedModel.Name}{" "}
              {modelOpen ? (
                <FaAngleDown className="text-2xl " />
              ) : (
                <FaAngleUp className="text-2xl " />
              )}
            </Listbox.Button>
            <Listbox.Options className={" "}>
              {models.map((model) => (
                <Listbox.Option
                  key={model._id}
                  value={model}
                  disabled={!model.unavailable}
                  className="cursor-pointer h-[56px]  bg-white flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {model.Name}
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
            <Listbox.Options>
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
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold mb-[16px] "> Piece</div>
          <Listbox value={selectedPiece} onChange={setSelectedPiece}>
            <Listbox.Button
              onClick={() =>
                setPieceOpen((prev) =>
                  selectedModel._id === "" ? !prev : false
                )
              }
              className={`flex outline-none  bg-[#F6F7F9] h-[56px] px-[30px]  w-full cursor-pointer rounded-lg border items-center border-black text-xl max-sm:text-[16px] ${
                selectedPiece.Name === "" ? "justify-end" : "justify-between"
              }`}
            >
              {selectedPiece.Name}{" "}
              {pieceOpen ? (
                <FaAngleDown className="text-2xl " />
              ) : (
                <FaAngleUp className="text-2xl " />
              )}
            </Listbox.Button>
            <Listbox.Options className={" "}>
              {pieces.map((piece) => (
                <Listbox.Option
                  key={piece._id}
                  value={piece}
                  disabled={!piece.unavailable}
                  className="cursor-pointer h-[56px]  bg-white flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                >
                  {piece.Name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        {/* <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
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
        
        </div> */}
        <div className="flex items-end justify-center gap-[20px] col-span-2  mb-[50px]">
          <DelButt
            id={rdv._id}
            deleteRoute="rdv"
            back="/rdv"
            name={rdv.Model}
            icon={false}
          />
          <button
            type="submit"
            className="w-[140px] cursor-pointer bg-green-600 flex justify-center  items-center h-[50px] text-white  gap-[10px] rounded-xl"
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
// const RdvTypeList = [
//   "RDV_VENTE_VOITURE",
//   "RDV_VENTE_PIECE",
//   "RDV_REPARATION",
//   "RDV_AUTRE",
// ];
