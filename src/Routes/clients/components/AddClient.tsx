import axios from "axios";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
export interface userType {
  Name: string;
  Phone: string;
  Email: string;
  Model: string;
  Vin: string;
  Prix_Vente: number;
  Adresse: string;
  Data_Achat: string;
  Documents: string[];
  img: string;
  id: string;
}
const AddClient = () => {
  const [client, setClient] = useState({ Name: "", Phone: "", Email: "", Adresse: "" })
  async function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    axios.post(
      "https://axeiny.tech:4004/client",
   client,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
      }
    )
  }

  return (
    <div>
      <div className="w-full my-[60px] text-[#49454] text-2xl pl-[40px]">
        Veuillez remplir ces champs concernant le client que vous souhaitez
        ajouter :{" "}
      </div>
      <form onSubmit={submit} className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px]">
     
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Nom et prénom*</div>
            <input
              type="text"
             
            value={client.Name}
            onChange={(e) => {
              setClient({...client,Name:e.target.value})
            }}
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez le nom et prénom du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Num de téléphone*</div>
            <input
              type="text"
             
            value={client.Phone}
            onChange={(e) => {
              setClient({...client,Phone:e.target.value})
            }}
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez le numéro du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Adresse </div>
            <input
              type="text"
             
            value={client.Adresse}
            onChange={(e) => {
              setClient({...client,Adresse:e.target.value})
            }}
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez l’adresse mail du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Email</div>
            <input
            type="email"
            value={client.Email}
            onChange={(e) => {
              setClient({...client,Email:e.target.value})
            }}
               
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez l'email de client"
            />
          </div>
       
          <button
              type="submit"
              className="w-[180px] cursor-pointer bg-[#DB2719] mb-[100px] flex justify-center items-center h-[50px] text-white mt-[60px] gap-[10px] self-end mr-[40px] rounded-xl"
            >
              {" "}
              envoyer
              <FaArrowRight />
            </button>
      </form>
    </div>
  );
};

export default AddClient;
