import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import data from "./data";
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
const ClientDetails = () => {
    const {id}=useParams()
    const [client, setClient] = useState({ Name: "", Phone: "", Email: "", Adresse: "" ,id:""})
    useEffect(() => {
        setClient(data.filter((e) => e.id === id)[0])
    })


  return (
    <div>
      <div className="w-full my-[60px] text-[#49454] text-2xl pl-[40px]">
        Veuillez remplir ces champs concernant le client que vous souhaitez
        ajouter :{" "}
      </div>
      <form className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px]">
     
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Nom et prénom*</div>
            <input
              type="text"
             
            value={client.Name}
            onChange={(e) => {
              setClient({...client,Name:e.target.value})
            }} readOnly
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
            }} readOnly
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
            }} readOnly
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez l’adresse mail du client"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="text-xl font-bold pl-[16px]">Id</div>
            <input
            type="email"
            value={client.id}
            onChange={(e) => {
              setClient({...client,Email:e.target.value})
            }} readOnly
              className="w-full border-[1px] border-black rounded-lg outline-none h-[56px] placeholder:text-[#878181] pl-[16px] "
              placeholder="Entrez l'email de client"
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
       
       
      </form>
    </div>
  );
};

export default ClientDetails;
