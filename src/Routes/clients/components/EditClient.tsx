import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DelButt from "../../../utils/DelButt";

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({
    Name: "",
    Phone: "0696472849",
    Email: "a@jj.com",
    Address: "msila",
    Date_Achat: "",
    Prix_Vente: 0,
    Contrat_De_Vente: "",
    Garantie: "",
    Facture: "",
    Car: "66403d73c85c109887d93db3",
    Piece: "",
    _id: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_Main_ENDPOINT + "client/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => setClient(data));
  }, []);
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log(client);
    axios
      .put(import.meta.env.VITE_Main_ENDPOINT + "client/" + id, client, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Client updated");
        // setTimeout(() => {
        //   window.location.href = "/clients";
        // }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
  }

  return (
    <div>
      <div className="w-full my-[60px] text-[#49454] text-2xl pl-[40px]">
        Veuillez remplir ces champs concernant le client que vous souhaitez
        ajouter :{" "}
      </div>
      <form
        onSubmit={submit}
        className="w-full grid grid-cols-2  max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px]"
      >
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2"  >
          <div className="text-xl font-bold pl-[16px]">Nom et prénom</div>
          <input
            type="text"
            value={client.Name}
            onChange={(e) => {
              setClient({ ...client, Name: e.target.value });
            }}
            className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black "
            placeholder="Entrez le nom et prénom du client"
          />
        </div>
        <div className=" flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 " >
          <div className="text-xl font-bold pl-[16px] w-full">Num de téléphone</div>
          <input
            type="text"
            value={client.Phone}
            onChange={(e) => {
              setClient({ ...client, Phone: e.target.value });
            }}
            className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
            placeholder="Entrez le numéro du client"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto  max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Address </div>
          <input
            type="text"
            value={client.Address}
            onChange={(e) => {
              setClient({ ...client, Address: e.target.value });
            }}
            className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black "
            placeholder="Entrez l’adresse mail du client"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Id</div>
          <input
            type="text"
            value={client._id}
            readOnly
            className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black "
            placeholder="Entrez l'email de client"
          />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2">
          <div className="text-xl font-bold pl-[16px]">Email</div>
          <input
            type="email"
            value={client.Email}
            onChange={(e) => {
              setClient({ ...client, Email: e.target.value });
            }}
            className="flex outline-none text-2xl bg-[#F6F7F9] h-[56px] pl-[30px] max-md:text[16px] mt-[16px] w-full cursor-pointer rounded-xl border border-black "
            placeholder="Entrez l'email de client"
          />
        </div>
        <div className="flex items-end justify-center gap-[20px] col-span-2  ">
          <DelButt
            id={client._id}
            deleteRoute="client"
            back="/clients"
            name={client.Name}
            icon={false}
          />
          <button
            onClick={submit}
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

export default EditClient;
