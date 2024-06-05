import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa";
import { uploadImages } from "../../../config/firebase/Upload_Images";
import { Listbox } from "@headlessui/react";
import { CarsProps } from "../../cars/Cars";
import Loading from "../../../utils/Loading";
export interface userType {
  Name: string;
  Phone: string;
  Email: string;
  Address: string;
  createdAt: string;
  updatedAt: string;
  Contrat_De_Vente: string;
  Garantie: string;
  Facture: string;
  Car: string;
  Piece: string;
  __v: number;
  _id: string;
}
const AddClient = () => {
  const [client, setClient] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    Date_Achat: "",
    Prix_Vente: 0,
    Contrat_De_Vente: "",
    Garantie: "",
    Facture: "",
    Car: "66403d73c85c109887d93db3",
    Piece: "",
  });
  const [contrat, setContrat] = useState<File|null>(null);
  const [facture, setFacture] = useState<File | null>(null);
const [loading,setLoading]=useState(false)
  const [modelOpen, setModelOpen] = useState(false);
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
 
  
    if ( client.Prix_Vente === 0) {
      toast.error("Veuillez remplir le prix");
      return;
    }
    if (client.Name === "") {
      toast.error("Veuillez entrer le nom");
      return;
    }
    if (client.Phone === "") {
      toast.error("Veuillez entrer le numéro de téléphone");
      return;
    } else {
      const phoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
      if (!phoneRegex.test(client.Phone)) {
        toast.error("Veuillez entrer un numéro de téléphone algérien valide");
        return;
      }
    }
    if (client.Email === "") {
      toast.error("Veuillez entrer l'email"); return
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(client.Email)) {
        toast.error("Veuillez entrer un email valide");return
      }
    }
    if (client.Address === "") {
      toast.error("Veuillez entrer l'addresse");
      return;
    }
    if (selectedModel.id === "") { 
      toast.error("Veuillez choisir un model de voiture");
      return;
    }   if (contrat === null || facture === null) {
      toast.error("Veuillez ajouter un contrat de vente et une facture");
      return;
    }
    setLoading(true)
    axios
      .post(import.meta.env.VITE_Main_ENDPOINT + "client", {...client,Contrat_De_Vente:[... await uploadImages([contrat])][0],Facture:[... await uploadImages([facture])][0]}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Client ajouté");
        setTimeout(() => {
          window.location.href = "/clients";
        }, 1000);
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message[0]);
      });
  }
 
  const [models, setModels] = useState([
    { id: "", name: "Veuillez choisir un model", unavailable: false },
  ]);

  useEffect(() => {
    const res = axios.get(import.meta.env.VITE_Main_ENDPOINT + "car");
    res.then((res) => {
      setModels(
        res.data.map((e: CarsProps) => {
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
  const [selectedModel, setSelectedModel] = useState(models[0]);
  if (loading) {
  return <Loading/>
}
  return (
    <div>
      <div className="w-full my-[60px] text-[#49454] text-2xl pl-[40px] max-md:text-center">
        Veuillez remplir ces champs concernant le client que vous souhaitez
        ajouter :{" "}
      </div>
      <form
        onSubmit={submit}
        className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px]"
      >
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Nom et prénom </div>
          <input
            type="text"
            value={client.Name}
            onChange={(e) => {
              setClient({ ...client, Name: e.target.value });
            }}
                              className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"

           placeholder="Entrez le nom et prénom du client"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">
            Numéro de téléphone{" "}
          </div>
          <input
            type="text"
            value={client.Phone}
            onChange={(e) => {
              setClient({ ...client, Phone: e.target.value });
            }}
                              className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"

           placeholder="Entrez le numéro du client"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Address </div>
          <input
            type="text"
            value={client.Address}
            onChange={(e) => {
              setClient({ ...client, Address: e.target.value });
            }}
                              className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"

           placeholder="Entrez l’adresse mail du client"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Prix</div>
          <input
            type="number"
            value={client.Prix_Vente}
            onChange={(e) => {
              setClient({ ...client, Prix_Vente: parseInt(e.target.value) });
            }}
                              className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"

           placeholder="Entrez le prix de vente"
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Email</div>
          <input
            type="email"
            value={client.Email}
            onChange={(e) => {
              setClient({ ...client, Email: e.target.value });
            }}
                              className=" flex outline-none text-2xl max-md:text-xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:pl-[8px]  mt-[16px] w-full cursor-pointer rounded-xl border border-black"

           placeholder="Entrez l'email de client"
          />
        </div>
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold mb-[16px] "> Model</div>
          <Listbox value={selectedModel} onChange={setSelectedModel}>
            <Listbox.Button
              onClick={() => setModelOpen((prev) => !prev)}
              className={`flex outline-none  bg-[#F6F7F9] h-[56px] px-[30px]  w-full cursor-pointer rounded-lg border items-center border-black text-xl max-sm:text-[16px] ${selectedModel.name===""?"justify-end":"justify-between"}`}
            >
              {selectedModel.name}{" "}
              {modelOpen ? (
                <FaAngleDown className="text-2xl " />
              ) : (
                <FaAngleUp className="text-2xl " />
              )}
            </Listbox.Button>
            <Listbox.Options className={" "}>
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
        <div className="flex flex-col w-full mx-auto max-md:col-span-2 ">
          <div className="text-xl font-bold pl-[16px]">Contrat De Vente</div>
          <input
            type="file"
      onChange={selectCon}
       
          />
        </div>
        <div className="flex flex-col w-full mx-auto max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Facture</div>
          <input
            type="file"
       
            onChange={selectfac}
          />
        </div>
     
        <div className="flex justify-end col-span-2">
          <button
            type="submit"
            className="w-[180px] cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
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

export default AddClient;
