import React, { useEffect, useState } from "react";

import { Listbox } from "@headlessui/react";
import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { CarsProps } from "../../cars/Cars";
import { PieceType } from "../../piece/Piece";
import { userType } from "../../clients/components/AddClient";
import toast from "react-hot-toast";
import { uploadImages } from "../../../config/firebase/Upload_Images";
import {  useParams } from "react-router-dom";
import DelButt from "../../../utils/DelButt";
import Loading from "../../../utils/Loading";


const EditBon = () => {
  const [bon, setbon] = useState({
    _id:"",
    Date_Achat: "",
    Prix_Vente: 0,
    Garentie: "",
    Facture: "",
    Contrat_De_Vente: "",
    Car: { __id: "", Modele: "", Garentie: "" },
    Piece: { __id: "", Name: "" },
    Client: { __id: "", Name: "", Phone: "" },
  });
  const [models, setModels] = useState([
    {
      _id: "",
      Name: "Veuillez choisir un model",
      unavailable: false,
      Garentie: "",
    },
  ]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        import.meta.env.VITE_Main_ENDPOINT + "bon/" + id
      );
      setbon(response.data);
      console.log({Name: response.data.Client.Name, Phone: response.data.Client.Phone, _id: response.data.Client._id}) 
      setSelectedClient(response.data.Client);
      if (response.data.Car) {
        setSelectedModel(response.data.Car);
      } else {
        setSelectedPiece(response.data.Piece);
      }
     
      setLoading(false);
      }

    fetchData();
  }, [id]);


  const [modelOpen, setModelOpen] = useState(false);
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "car");
    res.then((res) => {
      setModels(
        [ ...      res.data.map((e: CarsProps) => {
          return {
            _id: e._id,
            Name: e.Modele,
            Garentie: e.Garentie,
            unavailable: e.Disponabilite === "Disponible",
          };
        }),{_id:"",Name:"le bon n'est pas pour une voiture",unavailable:true,Garentie:""}]
       
      );
    });
  }, []);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [pieces, setPieces] = useState([
    { _id: "", Name: "Veuillez choisir une pièce", unavailable: false },
  ]);
  const [pieceOpen, setPieceOpen] = useState(false);
  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "piece");
    res.then((res) => {
      setPieces(
        [...     res.data.map((e: PieceType) => {
          return {
            _id: e._id,
            Name: e.Name,
            unavailable: e.Quantity > 0,
          };
        }),{_id:"",Name:"le bon n'est pas pour une piece",unavailable:true}]
      );
    });
  }, []);
  const [selectedPiece, setSelectedPiece] = useState(pieces[0]);
  const [clients, setClients] = useState([
    { _id: "", Name: "Veuillez choisir un client", Phone: "" },
  ]);
  const [clientOpen, setClientOpen] = useState(false);
  useEffect(() => {
      const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "client",
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          }
    );
    res.then((res) => {
   
      setClients(
        res.data.map((e: userType) => {
          return {
            _id: e._id,
            Name: e.Name,
            Phone: e.Phone,
          };
        })
      );
    });
  
  }, []);  const [contrat, setContrat] = useState<File|null>(null);
  const [facture, setFacture] = useState<File | null>(null);

  function selectfac(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFacture(filesArray[0]);
    }
  }
  function selectCon(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setContrat(filesArray[0]);
    }
  }
    const [selectedClient, setSelectedClient] = useState(clients[0]);
    async function submit(e: { preventDefault: () => void }) { 
        e.preventDefault();
        if (selectedClient._id === "") {
            toast.error("Veuillez choisir un client");
            return;
        }
        if (selectedModel._id === "" && selectedPiece._id === "") {
            toast.error("Veuillez choisir un model de voiture ou une pièce");
            return;
        }
        if (selectedModel._id !== "" && selectedPiece._id !== "") {
            toast.error("you need to choose between a car and a piece")
            return
        }
    
     
  
        if (bon.Prix_Vente === 0) {
            toast.error("Veuillez remplir le prix");
            return;
        }
      setLoading(true)
      axios
            .put(import.meta.env.VITE_Main_ENDPOINT + "bon/"+ bon._id, {
                ...bon,
                Contrat_De_Vente: [
                    ...(contrat? [...await uploadImages([contrat])]:[bon.Contrat_De_Vente]),
                ][0],
                Facture: [
                    ...(facture?[...await uploadImages([facture])]:[bon.Facture]),
                ][0],
                Car: selectedModel._id === "" ? null : {Name:selectedModel.Name,"_id":selectedModel._id,Garentie:selectedModel.Garentie},
                Piece: selectedPiece._id === "" ? null : {Name:selectedPiece.Name,"_id":selectedPiece._id },
                Client: selectedClient,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                toast.success("Bon ajouté");
                setTimeout(() => {
                    window.location.href = "/bon";
                }, 1000);
            })
            .catch((err) => {
                toast.error(err.response.data.message[0]);
            });

  }
  if (loading) {
    return <Loading/>
  }


  return (
    <form onSubmit={submit} className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] pt-[50px] ">
      <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
        <div className="text-xl font-bold mb-[16px] "> Client</div>
        <Listbox value={selectedClient} onChange={setSelectedClient}>
          <Listbox.Button
            onClick={() => setClientOpen((prev) => !prev)}
            className={`flex outline-none  bg-[#F6F7F9] h-[56px] px-[30px]  w-full cursor-pointer rounded-lg border items-center border-black text-xl max-sm:text-[16px] ${
              selectedClient.Name === "" ? "justify-end" : "justify-between"
            }`}
          >
            {selectedClient.Name}{" "}
            {clientOpen ? (
              <FaAngleDown className="text-2xl " />
            ) : (
              <FaAngleUp className="text-2xl " />
            )}
          </Listbox.Button>
          <Listbox.Options className={" "}>
            {clients.map((client) => (
              <Listbox.Option
                key={client._id}
                value={client}
                className="cursor-pointer h-[56px]  bg-white flex items-center justify-between px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
              >
                {client.Name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
        <div className="text-xl font-bold mb-[16px] "> Model</div>
        <Listbox value={selectedModel} onChange={setSelectedModel}>
          <Listbox.Button
            onClick={() => setModelOpen((prev) => !prev)}
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
        <div className="text-xl font-bold mb-[16px] "> Piece</div>
        <Listbox value={selectedPiece} onChange={setSelectedPiece}>
          <Listbox.Button
            onClick={() => setPieceOpen((prev) => !prev)}
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
          <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold max-sm:text-xl"> la Date</div>
          <input
            type={"date"}
            min={new Date().toISOString().split('T')[0]}
            placeholder={`  `}
            value={bon.Date_Achat.split('T')[0]}
            onChange={(e) => {
              setbon((prev) => ({
                ...prev,
                Date_Achat: e.target.value,
              }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-lg border border-black text-2xl max-sm:text-[16px]"
          />
        </div>
          <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold max-sm:text-xl"> Prix</div>
          <input
            type={"number"}
            min={0}
            placeholder={`Prix final`}
         value={bon.Prix_Vente}
            onChange={(e) => {
              setbon((prev) => ({
                ...prev,
                Prix_Vente: Number( e.target.value),
              }));
            }}
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px] mt-[16px] w-full cursor-pointer rounded-lg border border-black text-2xl max-sm:text-[16px]"
          />
          </div>
          <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
        <div className="text-xl font-bold pl-[16px] ">Contrat De Vente</div>
        <div className="flex items-center justify-center w-full gap-[20px]">
                <a href={bon.Contrat_De_Vente} download={true} className="flex items-center justify-center font-bold rounded-lg"> previous version</a>
                
         </div>
          <input
            type="file"
      onChange={selectCon}
       className="ml-[16px] mt-[30px] "
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2">
        <div className="text-xl font-bold pl-[16px]">Facture</div>
      
        <div className="flex items-center justify-center gap-[20px]">
          <a  href={bon.Facture} download={bon.Facture} target="_blank" className="flex items-center justify-center font-bold underline rounded-lg"> previous version</a>
      </div>
     
          <input
            type="file"
            className="ml-[16px] mt-[30px]"
            onChange={selectfac}
        />
      
          </div>
          <div className="flex items-end justify-center gap-[20px] col-span-2  mb-[50px]" >
          <DelButt id={bon._id} deleteRoute="bon" back="/bon" name={"bon"} icon={false} />
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
  );
};

export default EditBon;
