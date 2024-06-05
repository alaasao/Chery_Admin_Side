import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";



import { RdvType } from "../Rdv";
import { RdvEtat,Rdv_Type } from "../Rdv";

import axios from "axios";

import DelButt from "../../../utils/DelButt";
import EditButt from "../../../utils/EditButt";
import Loading from "../../../utils/Loading";

const RdvDetails = () => {
  const [loading,setLoading]=useState(true)
    const { id } = useParams();

  const [rdv, setRdv] = useState<RdvType>({
    _id: "",
    Name: "",
    Adresse: "",
    Phone: "",
    Email: "",
    Rdv_Type:Rdv_Type.RDV_VENTE_PIECE,
    Date_Choisie: new Date(),
    Model: "",
    Etat: RdvEtat.EN_ATTENTE,
    Reponse: "",
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_Main_ENDPOINT + "rdv/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     }
    }).then((response) => { 
      
      setRdv(response.data)
      setLoading(false)
    })
  }, []);
  if (loading) {
    return <Loading/>
  }
  return (
    <div>
      <div className="my-[50px] text-3xl ml-[20px]">
        Les informations de la demande
      </div>
      <form className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-x-[9vw] gap-y-[20px] px-[40px] ">
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Nom et prénom</div>
          <input
            type={"text"}
            placeholder={`Entre le  Nom et le Prénom`}
            value={rdv.Name}
          
            className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
      
                      readOnly
                  />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl">Adresse du client </div>
          <input
            type={"text"}
            placeholder={`Entre l'dresse de Client `}
            value={rdv.Adresse}
         
                className=" flex outline-none text-2xl max-sm:text-[16px] bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black"
   readOnly       />
        </div>

        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Numero de téléphone</div>
          <input
            type={"text"}
            placeholder={`Entre le Numero de téléphone  `}
            value={rdv.Phone}
         
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly    />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Email</div>
          <input
            type={"email"}
            placeholder={`Entre l'email  `}
            value={rdv.Email}
          
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly   />
        </div>
        <div className="flex flex-col w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> la Date</div>
          <input
            type={"date"}
            placeholder={`  `}
            value={new Date( rdv.Date_Choisie).toISOString().slice(0, 10)}
         
            className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly  />
        </div>

        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Model</div>
        <input  type={"text"}
            placeholder={`Entre l'email  `}
            value={rdv.Model}
         className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly   />
        </div>
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Etat</div>
          <input  type={"text"}
            placeholder={`Entre l'email  `}
            value={rdv.Etat}
         className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly   />
        </div>
        <div className="flex flex-col relative w-full max-md:w-[80%] mx-auto max-md:col-span-2 ">
          <div className="text-3xl font-bold max-sm:text-xl"> Type</div>
          <input  type={"text"}
            placeholder={`Entre l'email  `}
            value={rdv.Rdv_Type}
         className=" flex outline-none bg-[#F6F7F9] h-[56px] pl-[30px]  max-md:pl-[8px] mt-[16px] w-full cursor-pointer rounded-xl border border-black text-2xl max-sm:text-[16px]"
            readOnly   />
        </div>
        <div className="flex justify-center w-full mt-[50px] gap-[20px]  col-span-2 my-[50px]">
        <DelButt id={rdv._id} deleteRoute="rdv" back="/rdv" name="rdv" icon={false} />
        <EditButt id={rdv._id} editRoute="/rdv/editrdv" />
    </div>
      </form>
      <div ></div>
     
    </div>
  );
};

export default RdvDetails;

